from django.conf.urls import url
from thjobsthai import views

urlpatterns = [
        url(r'^$', views.index, name='thjobs-thai'),
        url(r'^testajax/$', views.testajax, name='testajax'),
        ]
