from rest_framework import serializers
from .models import JobsBKK


class JobsBKKSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobsBKK
        fields = ('pk','title',  'link')