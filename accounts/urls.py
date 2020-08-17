from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings

from django.contrib.auth import views as auth_views
#from django.contrib.auth.views import LoginView, LogoutView, PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView

from accounts.forms import EmailValidationOnForgotPassword


from . import views

urlpatterns = [
    #path('password_reset/', auth_views.PasswordResetView.as_view(form_class=EmailValidationOnForgotPassword), name='password_reset'),
    path('reset_password/', auth_views.PasswordResetView.as_view(form_class=EmailValidationOnForgotPassword), name='reset_password'),

    #path('password_reset/', auth_views.PasswordResetView.as_view(),{'password_reset_form': views.EmailValidationOnForgotPassword}, name='password_reset'),    
    path('reset_password_sent/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),    
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),    
    path('reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),    
    
    path('login/', auth_views.LoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='accounts/logout.html'), name='logout'),


    #path('signup/', views.SignUp.as_view(), name='signup'),    
    
    path('signup/', views.signup, name="signup"),  
    path('activate/<uidb64>/<token>/',views.activate, name='activate'),      
    
    #path('logout/', views.logout_view, name='logout'),    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

'''
from . import views

urlpatterns = [
    path('account/list/', views.AccountList.as_view(), name='account_list'),
    path('account/new/',  views.account_cru, name='account_new'),
    path('account/detail/<str:uuid>/', views.account_detail, name='account_detail'),
    #path('account/edit/',views.account_cru, name='account_update'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

'''
