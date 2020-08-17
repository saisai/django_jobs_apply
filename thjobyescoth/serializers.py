from rest_framework import serializers
from .models import Jobyescoth


class JobyescothSerializer(serializers.ModelSerializer):

    class Meta:
        model = Jobyescoth
        fields = ('pk','title',  'link')