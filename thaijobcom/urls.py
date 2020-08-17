from django.urls import path

from thaijobcom import views

urlpatterns = [
    path('', views.index, name='thai-jobcom')

]
