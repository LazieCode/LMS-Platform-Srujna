from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.parsers import JSONParser 
from .serializers import UserSerializer
from rest_framework import status
from .models import User
import jwt, datetime
from djongo import models
from django.contrib.auth.models import AbstractUser
from .validators import *
import json
from courses.models import *
from courses.serializers import *

# Create your views here

# class NewUser(User):
#     full_name = models.CharField(max_length=256)
#     username = models.CharField(max_length=256, unique=True)
#     phone_no = models.BigIntegerField(validators=[validate_phone_length])
#     location = models.CharField(max_length=256)
#     password = models.CharField(max_length=100)

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        user = User.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response


class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response


def getAllUsers(request):
    rem_list = list()
    if request.method == "GET":
        try:
            user_data = list(User.objects.values('id', 'is_superuser', 'full_name', 'username', 'phone_no', 'location', 'is_superlady', 'courses'))
            for ind, user in enumerate(user_data):
                if user['is_superuser'] or user['is_superlady'] == 'true':
                    rem_list.append(ind)
            
            for index in rem_list:
                user_data.pop(index)

            return JsonResponse({'status':'success', 'data': user_data}, safe = False, status = status.HTTP_200_OK)
        except User.DoesNotExist:
            return JsonResponse({'status': 'fail', 'message': 'Could not retrieve data from the Database'}, status=status.HTTP_400_BAD_REQUEST)

def getAllSuperLadies(request):
    res_list = list()
    if request.method == "GET":
        try:
            user_data = list(User.objects.values('id', 'is_superuser', 'full_name', 'username', 'phone_no', 'location', 'is_superlady'))
            for user in user_data:
                if user['is_superlady'] == 'true':
                    res_list.append(user)

            return JsonResponse({'status':'success', 'data': res_list}, safe = False, status = status.HTTP_200_OK)
        except User.DoesNotExist:
            return JsonResponse({'status': 'fail', 'message': 'Could not retrieve data from the Database'}, status=status.HTTP_400_BAD_REQUEST)

def getCourses(request):
    res_list = list()
    if request.method == "GET":
        token = request.COOKIES.get('jwt')
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        try:
            user = User.objects.filter(id=payload['id']).first()
            if user.courses == None:
                return JsonResponse({'status': 'fail', 'message': 'User not registered to any course'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                courses = json.dumps(user.courses)
                
                ls = list(map(int, courses[2:-2].split(",")))

                results = []

                for ids in ls:
                    course = Courses.objects.filter(pk=ids).first()
                    serializer = CoursesSerializer(course)
                    results.append(serializer.data)

                return JsonResponse({'status': 'success', 'message': 'Nice', 'data' : results}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return JsonResponse({'status': 'fail', 'message': 'Could not retrieve data from the Database'}, status=status.HTTP_400_BAD_REQUEST)

def addCourses(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        try:
            user = User.objects.filter(id=data['userid']).first()
            if user == None:
                return JsonResponse({'status': 'fail', 'message': 'User Does not Exist'}, status=status.HTTP_400_BAD_REQUEST)
            if user.courses == None:
                user.courses = str([int(data['courseid'])])
                user.save()
                return JsonResponse({'status': 'success', 'message': 'Course Added successfully'}, status=status.HTTP_200_OK)
            else:
                courses = json.dumps(user.courses)
                course_list = list(map(int, courses[2:-2].split(',')))
                course_list.append(int(data['courseid']))
                user.courses = str(course_list)
                user.save()
                return JsonResponse({'status': 'success', 'message': 'Course Added successfully'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return JsonResponse({'status': 'fail', 'message': 'Could not retrieve data from the Database'}, status=status.HTTP_400_BAD_REQUEST)

def markComplete(request):
    if request.method == "POST":
        # user_id, score, course_id
        data = JSONParser().parse(request)
        try:
            user = User.objects.filter(id=data['userid']).first()
            if user == None:
                return JsonResponse({'status': 'fail', 'message': 'User Does not Exist'}, status=status.HTTP_400_BAD_REQUEST)
            
            else:
                if user.courses == None:
                    return JsonResponse({'status': 'fail', 'message': 'User not registered to any course'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    courses = json.dumps(user.courses)
                    courses = list(map(int, courses[2:-2].split(",")))
                    if int(data['courseid']) in courses:
                        courses.remove(int(data['courseid']))
                    else:
                        return JsonResponse({'status': 'fail', 'message':'User is not registered to this course.'}, status = status.HTTP_400_BAD_REQUEST)
                    user.courses = courses
                    if user.completed == None:
                        user.completed = str([int(data['courseid'])])
                        user.score = int(data['score'])
                        user.save()
                        return JsonResponse({'status': 'success', 'message': 'Course Completed'}, status=status.HTTP_200_OK)
                    else:
                        if data['courseid'] in user.completed:
                            return JsonResponse({'status': 'success', 'message': 'Course Completed'}, status=status.HTTP_200_OK)
                        completed = json.dumps(user.completed)
                        course_list = list(map(int, completed[2:-2].split(',')))
                        course_list.append(int(data['courseid']))
                        user.completed = str(course_list)
                        user.save()
                        return JsonResponse({'status': 'success', 'message': 'Course Completed'}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return JsonResponse({'status': 'fail', 'message': 'Could not retrieve data from the Database'}, status=status.HTTP_400_BAD_REQUEST)
