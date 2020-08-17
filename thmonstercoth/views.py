from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import ThMonstercoth
from .serializers import *



@api_view(['GET', 'POST'])
def thmonstercoth_list(request):

    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        items = ThMonstercoth.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(items, 100)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = ThMonstercothSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        context = {'data': serializer.data , 
                    'count': paginator.count,
                    'number': data.number,
                   'numpages' : paginator.num_pages, 
                   'nextlink': '/api/thjobsthai/?page=' + str(nextPage), 
                   'prevlink': '/api/thjobsthai/?page=' + str(previousPage)
                   }
        return Response(context)

    elif request.method == 'POST':
        serializer = ThMonstercothSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
@api_view(['GET', 'PUT', 'DELETE'])
def jobsthai_detail(request, pk):
    try:
        items = ThMonstercoth.objects.get(pk=pk)
    except ThMonstercoth.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ThMonstercothSerializer(items,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ThMonstercothSerializer(items, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        items.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)        