from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.db import models
from django.conf import settings




from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone


from .managers import CustomUserManager


from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django.core.mail import send_mail  

from django_rest_passwordreset.signals import reset_password_token_created


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    #email_plaintext_message = "{}{}{}".format(settings.FRONT_END_URL, reverse('password_reset:reset-password-confirm'), reset_password_token.key)
    email_plaintext_message = "{}/password_reset/confirm/{}".format(settings.FRONT_END_URL, reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )
'''    
@receiver(reset_password_token_created)
def password_reset_token_createds(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,        
        'email': reset_password_token.user.email,
        'reset_password_url': "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)
    }

    # render email text
    email_html_message = render_to_string('registration/password_reset_email.html', context)
    #email_html_message = render_to_string('email/user_reset_password.html', context)
    #email_plaintext_message = render_to_string('email/user_reset_password.txt', context)
    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)
    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
    
'''
class CustomUser(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_('email address'), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
        
        
class Position(models.Model):
    title = models.CharField(max_length=500)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    
    class Meta:
        db_table = "tb_position"
        ordering = ['-id']
        
    def __str__(self):
        return self.title
        

class CVFile(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    filename = models.CharField(max_length=500, null=True, blank=True)
    
    class Meta:
        db_table = "tb_cvfile"
        ordering = ['-id']
        
        
class Apply(models.Model):

    YES = 1
    NO = 0
    
    INTERVIEW_GONE_CHOICES = (
        ('', _('Choose yes or not')),
        (str(YES), _('Yes')),
        (str(NO), _('No')),        
    )
    
    GOT_JOB_OR_NOT_CHOICES = (
        ('', _('Choose yes or not')),
        (str(YES), _('Yes')),
        (str(NO), _('No')),        
    )    
    
    title = models.TextField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    email = models.EmailField(_('Email address'))
    link = models.TextField()
    companyinfo = models.TextField(null=True, blank=True)
    qualification = models.TextField(null=True, blank=True)
    responsibility = models.TextField(null=True, blank=True)
    salary = models.CharField(max_length=500,null=True, blank=True)
    position = models.ForeignKey(Position, related_name='applies', null=True, blank=True, on_delete=models.CASCADE)
    apply_times = models.IntegerField(default=0)
    created_at = models.DateTimeField(editable=False)
    updated_at = models.DateTimeField()
    interview_gone = models.CharField(
        choices=INTERVIEW_GONE_CHOICES,
        max_length=1,
        default=0,
    )
    get_job_or_not = models.CharField(
        choices=GOT_JOB_OR_NOT_CHOICES,
        max_length=1,
        default=0,
    )
    interview_desc = models.TextField(null=True, blank=True)
    #updated_at = DateTimeField(auto_now=True, null=True, blank=True)


    class Meta:
        db_table = "tb_apply"        
        unique_together = [['user', 'title', 'link']]
        ordering = ['-id']

    
    


