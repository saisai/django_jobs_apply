from django.urls import path

from thjobthaiwebcom import views

urlpatterns = [
    path('', views.index, name='thjobthaiweb'),
]
