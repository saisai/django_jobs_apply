from django.urls import path

from thmonstercoth import views

urlpatterns = [
    path('', views.index, name='th-monster'),
]
