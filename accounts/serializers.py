from django.conf import settings
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Apply, Position, CVFile, CustomUser



class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password1 = serializers.CharField(min_length=settings.MIN_PASSWORD_LENGTH, error_messages={'min_length': "Password must be longer than {} characters".format(settings.MIN_PASSWORD_LENGTH)})
    password2 = serializers.CharField()

    def validate(self, data):
        if data['password1'] != data['password2']: # Check if the 2 passwords match
            
            raise serializers.ValidationError("Passwords do not match")
            
        if CustomUser.objects.filter(email=data['email']).count() > 0:
            raise serializers.ValidationError("Email already exists")
        return data


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # Add extra responses here
        data['email'] = self.user.email
        data['id'] = self.user.id
        
        return data



class CVFileSerializer(serializers.ModelSerializer):
    
    position_id = serializers.IntegerField(read_only=False)
    user_id = serializers.IntegerField(read_only=False)

    
    class Meta:
        model = CVFile
        fields = ('pk',
                  'filename',
                  'position_id',
                  'user_id',
                  
                  ) 
                  
    def validate(self, data):
        
        if data['position_id'] == 0: 
            
            raise serializers.ValidationError("Please select position field")
            
 
        return data                  

    def create(self, validated_data): 
        return CVFile.objects.create(
            filename=validated_data['filename'],
            position_id=validated_data['position_id'],
            user_id=validated_data['user_id'],        
        )
        
class PositionSerializer(serializers.ModelSerializer):
    
    user_id = serializers.IntegerField(read_only=False)
        
    class Meta:
        model = Position
        fields = ('pk',
                  'title',
                  'user_id',) 

    def create(self, validated_data):    
        return Position.objects.create(
            title=validated_data['title'],
            user_id=validated_data['user_id'],       
        )

class SelectedSerializer(serializers.ModelSerializer):

    position_id = serializers.IntegerField(read_only=False) # added to be edited
    position_title = serializers.CharField(read_only=True, source="position.title") # get postion title and protect not to be updated or added   

    class Meta:
        model = Apply
        fields = ('id',
                'title',
                'email',
                'link',
                'companyinfo',
                'qualification',
                'responsibility',
                'salary',
                'apply_times',
                'position_id',
                'user_id',
                'get_job_or_not',
                'interview_desc',
                'interview_gone',       
                'position_title'
                )
 