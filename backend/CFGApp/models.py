from unicodedata import category
from djongo import models
from .validators import *
from django.contrib.auth.models import AbstractUser
from typing import List, Optional
# from django_mysql.models import ListTextField

# class User(AbstractUser):
#     full_name = models.CharField(max_length=256)
#     username = models.CharField(max_length=256, unique=True)
#     phone_no = models.BigIntegerField(validators=[validate_phone_length])
#     location = models.CharField(max_length=256)
#     password = models.CharField(max_length=100)
#     is_superlady = models.CharField(default='false', max_length=5)
#     REQUIRED_FIELDS = []
#     enrolled_courses = ListTextField(
#         base_field= models.IntegerField(),
#         size=100,  # Maximum of 100 ids in list
#     )
    
class User(AbstractUser):
    full_name = models.CharField(max_length=256)
    username = models.CharField(max_length=256, unique=True)
    phone_no = models.BigIntegerField(validators=[validate_phone_length])
    location = models.CharField(max_length=256)
    password = models.CharField(max_length=100)
    is_superlady = models.CharField(default='false', max_length=5)
    courses = models.CharField(max_length=1000, default=None, null=True)
    completed = models.CharField(max_length=1000, default=None, null = True)
    score = models.BigIntegerField(default=0)
    REQUIRED_FIELDS = []

