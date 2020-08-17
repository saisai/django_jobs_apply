"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include


from django.conf.urls import url
from thjobsdb import views
from thjobsthai import views as thjobsthai
from thjobsbkk import views as thjobsbkk
from thjobstopgun import views as thjobstopgun
from thmonstercoth import views as thmonstercoth
from thaijobcom import views as thaijobcom
from thjobyescoth import views as thjobyescoth
from thjobthaiwebcom import views as thjobthaiwebcom


from rest_framework_simplejwt import views as jwt_views


from django.contrib.auth import views as auth_views
from accounts.forms import EmailValidationOnForgotPassword



from accounts import views as accounts

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/thjobsdb/$', views.jobsdb_list),
    url(r'^api/thjobsdb/(?P<pk>[0-9]+)$', views.jobsdb_detail),   
    url(r'^api/thjobsthai/$', thjobsthai.jobsthai_list),
    url(r'^api/thjobsthai/(?P<pk>[0-9]+)$', thjobsthai.jobsthai_detail),   
    url(r'^api/thjobsbkk/$', thjobsbkk.thjobsbkk_list),
    url(r'^api/thjobstopgun/$', thjobstopgun.thjobstopgun_list),
    url(r'^api/thaijobcom/$', thaijobcom.thaijobcom_list),
    url(r'^api/thjobyescoth/$', thjobyescoth.thjobyescoth_list),
    url(r'^api/thjobthaiwebcom/$', thjobthaiwebcom.thjobthaiwebcom_list),
    url(r'^api/thmonstercoth/$', thmonstercoth.thmonstercoth_list),
    path('api/click_me/', accounts.click_me, name='click_me'),
    path('api/selected/', accounts.selected_list, name='selected'),
    path('api/selected/<int:pk>/<int:user_id>', accounts.selected_detail, name='selected'),
    path('api/position/', accounts.position_list, name='position'),
    path('api/position/<int:pk>/<int:user_id>', accounts.position_detail, name='position'),
    path('api/cvfile/', accounts.cvfile_list, name='cvfile'),
    path('api/cvfile/<int:pk>/<int:user_id>', accounts.cvfile_detail, name='cvfile'),
    path('api/fire_me/', accounts.fire_me, name='fire_me'),
    path('api/checkemail/', accounts.check_email, name='check_email'),
    
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    #path('api/reset_password_confirm/',accounts.password_reset_confirm, name="reset_password_confirm"),

    #path('api/reset_password/', auth_views.PasswordResetView.as_view(form_class=EmailValidationOnForgotPassword), name='reset_password'),
    
    
    path('api/signup/', accounts.signup, name="signup"),  
    path('api/activate/<uidb64>/<token>/',accounts.activate, name='activate'),  
    
    #path('api/token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('api/token/obtain/', accounts.MyTokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    #path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    
    path('api/hello/', accounts.HelloView.as_view(), name='hello'),
]
