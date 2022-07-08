from django.urls import path
from courses import views 
 
urlpatterns = [ 
    path('api/course_create', views.courses_create),
]