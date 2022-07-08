from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from django.core import serializers
 
from .models import Courses
from .serializers import CoursesSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['POST'])
def courses_create(request):
    if request.method == 'POST':
        course_data = JSONParser().parse(request)
        course_serializer = CoursesSerializer(data=course_data)
        if course_serializer.is_valid():
            course_serializer.save()
            # print(course_serializer.data)
            return Response({'data':course_serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'error':course_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': 'Method not found'}, status=status.HTTP_405_BAD_REQUEST)



