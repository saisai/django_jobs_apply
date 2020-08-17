from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import JobsBKK
from .serializers import *



@api_view(['GET', 'POST'])
def thjobsbkk_list(request):

    if request.method == 'GET':
        q = request.GET.get('q', None)
                
        if q != None:
            queryset = JobsBKK.objects.filter(title__icontains=q).order_by('id')
        
            page = request.GET.get('page', 1)
            
            paginator = Paginator(queryset, 100)
            
            data = []           

            try:
                data = paginator.page(page)
            except PageNotAnInteger:
                data = paginator.page(1)
            except EmptyPage:
                data = paginator.page(paginator.num_pages)

            serializer = JobsBKKSerializer(data,context={'request': request} ,many=True)
 
            context = {'data': serializer.data , 
                    'count': paginator.count,
                    'number': data.number,
                   'numpages' : paginator.num_pages, 
                   
                   }
            return Response(context)  
            
        data = []

        items = JobsBKK.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(items, 100)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = JobsBKKSerializer(data,context={'request': request} ,many=True)
 
        context = {'data': serializer.data , 
                    'count': paginator.count,
                    'number': data.number,
                   'numpages' : paginator.num_pages, 
                   
                   }
        return Response(context)

    elif request.method == 'POST':
        serializer = JobsBKKSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
@api_view(['GET', 'PUT', 'DELETE'])
def jobsthai_detail(request, pk):
    try:
        items = JobsBKK.objects.get(pk=pk)
    except JobsBKK.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = JobsBKKSerializer(items,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = JobsBKKSerializer(items, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        items.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)        