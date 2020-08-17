from django.conf.urls import url
from thjobsbkk import views

urlpatterns = [
        url(r'^$', views.index, name='thjobs-bkk'),
        url(r'^testajax/$', views.testajax, name='testajax'),
        ]
