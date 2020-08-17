from rest_framework import serializers
from .models import ThMonstercoth


class ThMonstercothSerializer(serializers.ModelSerializer):

    class Meta:
        model = ThMonstercoth
        fields = ('pk','title',  'link')