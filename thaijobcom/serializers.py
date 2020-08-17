from rest_framework import serializers
from .models import Thaijobcom


class ThaijobcomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Thaijobcom
        fields = ('pk','title',  'link')