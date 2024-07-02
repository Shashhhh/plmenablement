from django.urls import path
from .views import forward_to_openai, create_thread_and_run

urlpatterns = [
    path('api/forward_to_openai', forward_to_openai, name='forward_to_openai'),
    path('api/create_thread_and_run', create_thread_and_run, name = 'create_thread_and_run')
]