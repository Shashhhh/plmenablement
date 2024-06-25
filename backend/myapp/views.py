
import requests
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from openai import OpenAI
from django.http import JsonResponse
import logging
from openai.types.beta.assistant_stream_event import ThreadMessageCompleted, ThreadMessageDelta
logger = logging.getLogger(__name__)

@api_view(['POST'])
def forward_to_openai(request):
    if request.method == 'POST':
        user_input = request.data.get('userInput', '')
        openai_url = 'https://api.openai.com/v1/chat/completions'
        headers = {
            'Authorization': f'Bearer {settings.OPENAI_API_KEY}',
            'Content-Type': 'application/json',
        }
        print('data', request.data)
        print('Received data:', user_input)
        openai_data = {
            "model": "gpt-4o",
            'messages': [{'role': 'user', 'content': user_input}],  
        }

        try:
            response = requests.post(openai_url, headers=headers, json=openai_data)
            response_data = response.json()
            print(response_data)
            return Response(response_data, status=response.status_code)
        except requests.RequestException as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def create_thread_and_run(request):
    client = OpenAI(api_key=settings.OPENAI_API_KEY)
    openai_url = 'https://api.openai.com/v1/assistants/{asst_Mn4aCCQPzF5dJJD80Paq5uRU}'
    headers = {
        'Authorization': f'Bearer {settings.OPENAI_API_KEY}',
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2',
    }
    user_input = request.data.get('userInput', '')
    
    try:
        stream = client.beta.threads.create_and_run(
            assistant_id="asst_Mn4aCCQPzF5dJJD80Paq5uRU",
            thread={
                "messages": [
                    {"role": "user", "content": user_input}
                ]
            },
            stream=True
        )
        for chunk in stream:
            if isinstance(chunk, ThreadMessageCompleted):
                content_value = chunk.data.content[0].text.value
      #      if isinstance(chunk, ThreadMessageDelta):
      #          print(chunk.data.delta.content[0].text.value)
            #print(chunk)
            #print()
        return JsonResponse({'content_value': content_value})
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)