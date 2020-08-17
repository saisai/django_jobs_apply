from rest_framework import serializers
from .models import Jobthaiwebcom


class JobthaiwebcomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Jobthaiwebcom
        fields = ('pk','title',  'link')