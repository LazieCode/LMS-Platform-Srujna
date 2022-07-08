from django.db import models


# Create your models here.
# a. Name
# b. Date
# c. Link (string)
# e. Category(string)
# f. Description (string)

class Courses(models.Model):
    name = models.CharField(max_length=70, blank=False, default='')
    Date=models.DateField(auto_now_add=True)
    Link=models.URLField(max_length=200)
    Category=models.CharField(max_length=70, blank=False,default='')
    description = models.CharField(max_length=200,blank=False, default='')


    
    
