"""CFG URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, path
from CFGApp.views import *
from django.urls import path
from CFGApp.views import *
from courses.views import *
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('users', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('api/course_create', courses_create),
    path('allusers', getAllUsers),
    path('allSuperLadies', getAllSuperLadies),
    path('courses', getCourses),
    path('addcourse', csrf_exempt(addCourses)),
    path('markascomplete', csrf_exempt(markComplete)),
]

