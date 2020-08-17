import json 
import os 
import datetime
from shutil import copyfile

from django.urls import reverse_lazy
from django.views import generic
from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.auth import logout
from django.conf import settings
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.utils import timezone


from django.db.models import F, Q
from django.contrib import messages

from django.core.mail import send_mail, EmailMessage
from django.template.loader import render_to_string

from .forms import CustomUserCreationForm
from .models import Apply, Position, CVFile, CustomUser


from django.utils.encoding import force_bytes, force_text  
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode  

from .forms import SignUpForm  
from .tokens import account_activation_token  
#from django.contrib.auth.models import User  
from django.contrib.sites.shortcuts import get_current_site  

from accounts.decorators import check_cvfile, check_position

from .tasks import sleepy, send_email_task


from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .serializers import *

from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.views import TokenObtainPairView



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)
    

@api_view(['GET'])          
def activate(request, uidb64, token):  
   
    errors = {}
    try:  
        uid = force_text(urlsafe_base64_decode(uidb64))  
        user = CustomUser.objects.get(id=uid)  
    except(TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):  
        user = None  
    if user is not None and account_activation_token.check_token(user, token):  
        user.is_active = True  
        user.save()  
        errors['success'] = True   
        errors['message'] = "Thank you for your email confirmation. Now you can login your account."   
        return HttpResponse(json.dumps(errors), content_type='application/json')
         
    else:  
        
        errors['success'] = False   
        errors['message'] = "Activation link is invalid!"   
        return Response(status=status.HTTP_404_NOT_FOUND)
       

@api_view(['POST'])        
def signup(request):  

    if request.method == 'POST':
    
        serializer = UserSerializer(data=request.data) 
        #print(form)
        if serializer.is_valid():
            form = SignUpForm(request.data)
            user = form.save(commit=False) 
            user.is_active = False  
            user.save()  
            current_site = get_current_site(request)  
            mail_subject = 'Activate your account.'  
            #print(force_bytes(user.id))
            #print(str(force_bytes(user.id)))
            
            message = render_to_string('accounts/acc_active_email.html', {  
                'user': user,  
                'url': 'activate',
                'domain': settings.FRONT_END_URL,  
                'uid': urlsafe_base64_encode(force_bytes(user.id)),#.decode("utf-8"),  
                'token': account_activation_token.make_token(user),  
            })  
            to_email = form.cleaned_data.get('email')  
            email = EmailMessage(  
                mail_subject, message, to=[to_email]  
            )  
            email.send()              
            
            return Response({"redirectPage": True, "isError": False})

        return Response({"isError": True, "error": serializer.errors})
        
        
@api_view(['POST'])
def click_me(request):
    errors = {}

    if request.method == "POST":
        link = request.data['link']
        title = request.data['title']
        user_id = request.data['id']
       

        if Apply.objects.filter(title=title, link=link,user_id=user_id).count() >= 1:
            errors['success'] = False            
            return HttpResponse(json.dumps(errors), content_type='application/json')	
        else:        
            apply = Apply(title=title, link=link,user_id=user_id,
                created_at=timezone.now(),
                updated_at=timezone.now()
                )
            apply.save()
            
            errors['success'] = True   
            return HttpResponse(json.dumps(errors), content_type='application/json')
        
        
@api_view(['POST'])
def fire_me(request):
    
    errors = {}
    
    if request.method == 'POST':
        
        fire_me_id = request.data['id']
        user_id = request.data['user_id']
        results = Apply.objects.select_related('position').filter(id=fire_me_id, user_id=user_id).get()
        
        context = {
            'news': 'We have good news!',
            'position': results.position.title
        }
        #filenames = Apply.objects.raw('SELECT a.id, b.filename FROM tb_detail a left join tb_cvfile b on a.position_id = b.position_id where a.position_id =%s', [results.position_id])
        filenames_query = Apply.objects.raw('SELECT a.id, b.filename FROM tb_apply a left join tb_cvfile b on a.position_id = b.position_id where a.user_id=%s and a.position_id =%s and a.id=%s', [user_id, results.position_id, fire_me_id])
        print('hello',request.data['id'])
        filenames = [ff.filename for ff in filenames_query]
        
        send_email_task.delay(user_id, [results.email,], 'Applying for a job', 'email.html', context, filenames, "devilcomcom@gmail.com")        
        Apply.objects.filter(pk=fire_me_id, user_id=user_id).update(apply_times=F('apply_times')+1 )
        
        
        data = []        
        items = Apply.objects.filter(user_id=user_id)
        page = request.GET.get('page', 1)
        paginator = Paginator(items, 100)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = SelectedSerializer(data,context={'request': request} ,many=True)

        context = {'data': serializer.data , 
                    'count': paginator.count,
                    'number': data.number,
                   'numpages' : paginator.num_pages, 
                   
                   }
        return Response(context)        
        
        #errors['success'] = True   
        #return HttpResponse(json.dumps(errors), content_type='application/json')

@api_view(['GET', 'POST'])
def cvfile_list(request):

    if request.method == 'GET':
        user_id = request.query_params['user_id']
        data = []
        items = CVFile.objects.filter(user_id=user_id)
        page = request.GET.get('page', 1)
        paginator = Paginator(items, 100)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = CVFileSerializer(data,context={'request': request} ,many=True)
 

        context = {'data': serializer.data , 
                    'count': paginator.count,
                    'number': data.number,
                   'numpages' : paginator.num_pages,                    
                   }
        return Response(context)

    elif request.method == 'POST':
               
        # for update 
        
        if 'pk' in request.data :    
            
            if not request.FILES.get('cvfile', False):
                return Response({'error': "Please choose file to upload"}, status=status.HTTP_400_BAD_REQUEST)
            
            extesion = os.path.splitext(str(request.data['cvfile']))[1]  
            
            filename = str(int(datetime.datetime.now().timestamp()))+extesion
            
            if extesion not in [".jpg", ".jpeg", ".doc", ".docx", ".pdf"]:
                error = "The file name extension '%s' is not allowed to upload" % (extesion) 
                return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)          
            func_edit_cvfile(request, request.data['pk'])
            data = []
            items = CVFile.objects.filter(user_id=request.data['user_id'])
            page = request.GET.get('page', 1)
            paginator = Paginator(items, 100)
            try:
                data = paginator.page(page)
            except PageNotAnInteger:
                data = paginator.page(1)
            except EmptyPage:
                data = paginator.page(paginator.num_pages)

            serializer = CVFileSerializer(data,context={'request': request} ,many=True)
     

            context = {'data': serializer.data , 
                        'count': paginator.count,
                        'number': data.number,
                       'numpages' : paginator.num_pages,                    
                       }
            return Response(context)            
            #return Response({'success': 1}, status=status.HTTP_201_CREATED)
        else:
                        
            # check if file is empty or not
            if not request.FILES.get('cvfile', False):  # check if file is empty or not
                return Response({'error': "Please choose file to upload"}, status=status.HTTP_400_BAD_REQUEST)
            
            extesion = os.path.splitext(str(request.data['cvfile']))[1]  
            print('ext', extesion)
            filename = str(int(datetime.datetime.now().timestamp()))+extesion
            
            if extesion not in [".jpg", ".jpeg", ".doc", ".docx", ".pdf"]:
                error = "The file name extension '%s' is not allowed to upload" % (extesion) 
                return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)                 
            
            context_data = {'filename': filename, 'position_id': request.data['position_id'], 'user_id': request.data['user_id']}
            serializer = CVFileSerializer(data=context_data)        
            if serializer.is_valid():
                serializer.save()            
                handle_uploaded_file(request.data['cvfile'], filename, request.data['user_id'])    

                data = []
                items = CVFile.objects.filter(user_id=request.data['user_id'])
                page = request.GET.get('page', 1)
                paginator = Paginator(items, 100)
                try:
                    data = paginator.page(page)
                except PageNotAnInteger:
                    data = paginator.page(1)
                except EmptyPage:
                    data = paginator.page(paginator.num_pages)

                serializer = CVFileSerializer(data,context={'request': request} ,many=True)
         

                context = {'data': serializer.data , 
                            'count': paginator.count,
                            'number': data.number,
                           'numpages' : paginator.num_pages,                    
                           }
                return Response(context)                
                                
                #return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET', 'PUT', 'DELETE'])
def cvfile_detail(request, pk, user_id):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = CVFile.objects.get(pk=pk, user_id=user_id)
    except CVFile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CVFileSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CVFileSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
    
        filename = snippet.filename
        print(filename)
        snippet.delete()       
            
        STUDENT_IMAGE_PATH = os.path.join(settings.MEDIA_ROOT)
        STUDENT_IMAGE = '{}/{}/{}'.format(STUDENT_IMAGE_PATH, user_id, filename)
        if os.path.isfile(STUDENT_IMAGE):
            os.remove(STUDENT_IMAGE)
            
        data = []
        items = CVFile.objects.filter(user_id=user_id)
        page = request.GET.get('page', 1)
        paginator = Paginator(items, 100)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = CVFileSerializer(data,context={'request': request} ,many=True)
 

        context = {'data': serializer.data , 
                    'count': paginator.count,
                    'number': data.number,
                   'numpages' : paginator.num_pages,                    
                   }
        return Response(context)            
                
        #return Response(status=status.HTTP_204_NO_CONTENT)   
        

def func_edit_cvfile(request, id):

    extesion = os.path.splitext(str(request.data['cvfile']))[1]  
    
    filename = str(int(datetime.datetime.now().timestamp()))+extesion
 
    # delete file before updating
    cvfile_id = request.data['pk']
    user_id = request.data['user_id'] #request.user.id
    STUDENT_IMAGE_PATH = os.path.join(settings.MEDIA_ROOT)
    delete_filename= CVFile.objects.filter(pk=cvfile_id, user_id=user_id).get().filename
    
    STUDENT_IMAGE = '{}/{}/{}'.format(STUDENT_IMAGE_PATH, user_id, delete_filename)
    if os.path.isfile(STUDENT_IMAGE):
        os.remove(STUDENT_IMAGE)
        
   
    CVFile.objects.filter(pk=cvfile_id, user_id=user_id).update(
                position_id=request.data['position_id'],
                filename=filename,
                )
                

    
    handle_uploaded_file(request.FILES['cvfile'], filename, user_id)
    
    #return redirect('%s?next=%s' % ('/list_cvfile/', request.path))        
        
        
        
@api_view(['GET', 'POST'])
def position_list(request):

    if request.method == 'GET':
        user_id = request.query_params['user_id']
        data = []

        items = Position.objects.filter(user_id=user_id)
        page = request.GET.get('page', 1)
        paginator = Paginator(items, 100)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = PositionSerializer(data,context={'request': request} ,many=True)

        context = {'data': serializer.data , 
                    'count': paginator.count,
                    'number': data.number,
                   'numpages' : paginator.num_pages, 
                   
                   }
        return Response(context)

    elif request.method == 'POST':
        serializer = PositionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET', 'PUT', 'DELETE'])
def position_detail(request, pk, user_id):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = Position.objects.get(pk=pk, user_id=user_id)
    except Position.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PositionSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PositionSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        snippet.delete()
        data = []

        items = Position.objects.filter(user_id=user_id)
        page = request.GET.get('page', 1)
        paginator = Paginator(items, 100)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = PositionSerializer(data,context={'request': request} ,many=True)

        context = {'data': serializer.data , 
                    'count': paginator.count,
                    'number': data.number,
                   'numpages' : paginator.num_pages,                    
                   }
        return Response(context)            

@api_view(['GET', 'POST'])
def selected_list(request):
    
    
    if request.method == 'GET':
        user_id = request.query_params['user_id']
        
        q = request.GET.get('q', None)    
        if q != None:
            queryset = Apply.objects.filter(Q(title__icontains=q) | Q(email__icontains=q), user_id=user_id)
        
            page = request.GET.get('page', 1)
            
            paginator = Paginator(queryset, 100)
            
            data = []           

            try:
                data = paginator.page(page)
            except PageNotAnInteger:
                data = paginator.page(1)
            except EmptyPage:
                data = paginator.page(paginator.num_pages)

            serializer = SelectedSerializer(data,context={'request': request} ,many=True)

            context = {'data': serializer.data , 
                    'count': paginator.count,
                    'number': data.number,
                   'numpages' : paginator.num_pages, 
                   
                   }
            return Response(context)  
            
        data = [] 
        items = Apply.objects.filter(user_id=user_id)
        page = request.GET.get('page', 1)
        paginator = Paginator(items, 100)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = SelectedSerializer(data,context={'request': request} ,many=True)
        
        context = {'data': serializer.data , 
                    'count': paginator.count,
                    'number': data.number,
                   'numpages' : paginator.num_pages, 
                  
                   }
        return Response(context)

    elif request.method == 'POST':
        serializer = SelectedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def selected_detail(request, pk, user_id):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = Apply.objects.get(pk=pk, user_id=user_id)
    except Apply.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':

        serializer = SelectedSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT': 
        
        
        serializer = SelectedSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':   
        snippet.delete()
        data = []
        
        items = Apply.objects.filter(user_id=user_id)
        page = request.GET.get('page', 1)
        paginator = Paginator(items, 100)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = SelectedSerializer(data,context={'request': request} ,many=True)       

        context = {'data': serializer.data , 
                    'count': paginator.count,
                    'number': data.number,
                   'numpages' : paginator.num_pages,                   
                   }
        return Response(context)        
    

def handle_uploaded_file(fbyte, filename, user_id):
    
    STUDENT_IMAGE_PATH = os.path.join(settings.MEDIA_ROOT)
    STUDENT_IMAGE = '{}/{}'.format(STUDENT_IMAGE_PATH, user_id)
    os.mkdir(STUDENT_IMAGE_PATH) if not os.path.isdir(STUDENT_IMAGE_PATH) else ''
    os.mkdir(STUDENT_IMAGE) if not os.path.isdir(STUDENT_IMAGE) else ''
    with open('{}/{}'.format(STUDENT_IMAGE, filename), 'wb+') as destination:
        for chunk in fbyte.chunks():
            destination.write(chunk)

class SignUp(generic.CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'accounts/signup.html'


def send_html_email(user_id, to_list, subject, template_name, context, filenames, sender):

    STUDENT_IMAGE_PATH = os.path.join(settings.MEDIA_ROOT)
        
    msg_html = render_to_string(template_name, context)
    #msg = EmailMessage(subject=subject, body=msg_html, from_email=sender, to=to_list,  bcc=to_list)
    #msg = EmailMessage(subject=subject, body=msg_html, from_email=sender, to=to_list,  bcc=from_email)
    msg = EmailMessage(subject, msg_html, sender, to_list)
    for ff in filenames:
        
        STUDENT_IMAGE = '{}/{}/{}'.format(STUDENT_IMAGE_PATH, user_id, ff.filename)
        
        new_filename = STUDENT_IMAGE.split('.')
        new_filename_path = '/'.join(new_filename[0].split('/')[:-1])
        new_filename_result = '%s/%s.%s' % (new_filename_path, 'resume', new_filename[1])
        
        
        copyfile(STUDENT_IMAGE, new_filename_result)  # copy file 
        msg.attach_file(new_filename_result)
        os.remove(new_filename_result)                # remove file
        
        
    msg.content_subtype = "html"  # Main content is now text/html
    return msg.send()
    
@api_view(['POST'])
def check_email(request):
    errors = {}
    if request.method == 'POST':
    
        
        email = request.data['email']
        user_id = request.data['user_id']
        if Apply.objects.filter(email=email, user_id=user_id).count() > 0:                                          
            errors['email'] = email                  
            errors['success'] = True
            return Response(errors, status=status.HTTP_201_CREATED)

        else:
            errors['success'] = False
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
            