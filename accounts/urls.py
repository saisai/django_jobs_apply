from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings

from django.contrib.auth import views as auth_views

from accounts.forms import EmailValidationOnForgotPassword


from . import views

urlpatterns = [
    
    path('reset_password/', auth_views.PasswordResetView.as_view(form_class=EmailValidationOnForgotPassword), name='reset_password'),

    
    path('reset_password_sent/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),    
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),    
    path('reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),    
    
    path('login/', auth_views.LoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='accounts/logout.html'), name='logout'),   
    
    path('signup/', views.signup, name="signup"),  
    path('activate/<uidb64>/<token>/',views.activate, name='activate'),      
    
     
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
