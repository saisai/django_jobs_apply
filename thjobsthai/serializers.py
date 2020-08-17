from rest_framework import serializers
from .models import JobThai


class JobsThaiSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobThai
        fields = ('pk','title',  'link')