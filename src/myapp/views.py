from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import json

SECRET_PASSWORD = os.getenv('SECRET_PASSWORD')

@csrf_exempt
def password_check_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        password = data.get('password')
        if password == SECRET_PASSWORD:
            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({'status': 'failure'}, status=401)
    return JsonResponse({'status': 'bad_request'}, status=400)
