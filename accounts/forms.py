from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.utils.translation import gettext as _
from django.contrib.auth.forms import PasswordResetForm

from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm):
        model = CustomUser
        fields = ('email',)

class CustomUserChangeForm(UserChangeForm):

    class Meta:

        model = CustomUser
        fields = ('email',)




class EmailValidationOnForgotPassword(PasswordResetForm):

    def clean_email(self):
        email = self.cleaned_data['email']
        if not CustomUser.objects.filter(email__iexact=email, is_active=True).exists():
            msg = _("There is no user registered with the specified E-Mail address.")
            self.add_error('email', msg)
        return email
        
        
class SignUpForm(UserCreationForm):  
        class Meta:  
            model = CustomUser  
            fields = ('email',)        
            