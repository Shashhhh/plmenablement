from django.urls import path
from .views import password_check_view

urlpatterns = [
    path('check-password/', password_check_view, name='check_password'),
]
