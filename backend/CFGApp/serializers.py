from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *
class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id',
                 'full_name',
                 'username',
                 'phone_no',
                 'location',
                 'password',
                 'courses',
                 'is_superlady']
                 
    #validate_password = make_password

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance