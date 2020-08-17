from rest_framework import serializers
from .models import JobsTopGun


class JobsTopGunSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobsTopGun
        fields = ('pk','title',  'link')