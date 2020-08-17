from django.conf.urls import url
from thjobstopgun import views

urlpatterns = [
        url(r'^$', views.index, name='thjobs-topgun'),
        url(r'^testajax/$', views.testajax, name='testajax'),
        ]
