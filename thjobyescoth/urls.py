from django.urls import path

from thjobyescoth import views

urlpatterns = [
    path('', views.index, name='jobyes')
]
