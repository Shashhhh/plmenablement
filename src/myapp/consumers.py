from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings
import json
from openai import AsyncOpenAI
from openai.types.beta.assistant_stream_event import ThreadMessageDelta
class Handler(AsyncWebsocketConsumer):
    
    async def connect(self):
        headers = dict(self.scope.get('headers', []))
        x_ratelimit_limit_requests = headers.get(b'x-ratelimit-limit-requests', b'').decode('utf-8')
        x_ratelimit_limit_tokens = headers.get(b'x-ratelimit-limit-tokens', b'').decode('utf-8')
        x_ratelimit_remaining_requests = headers.get(b'x-ratelimit-remaining-requests', b'').decode('utf-8')
        x_ratelimit_remaining_tokens = headers.get(b'x-ratelimit-remaining-tokens', b'').decode('utf-8')
        
        print(f"Rate Limit (Requests): {x_ratelimit_limit_requests}")
        print(f"Rate Limit (Tokens): {x_ratelimit_limit_tokens}")
        print(f"Remaining Requests: {x_ratelimit_remaining_requests}")
        print(f"Remaining Tokens: {x_ratelimit_remaining_tokens}")
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        self.assistant_ids = {
            'Machinist': "asst_Mn4aCCQPzF5dJJD80Paq5uRU",
            'Value_prop': "asst_D6l7CGFwkpTuGQIR4Cw9SMAh",
            'Marketing_Assistant': "asst_bY3w88GhMu3IeGqtykL89YrA",
            'Case_study_finder': "asst_NFo1JypuJKH7vu7di0tqooTE",
            'YoutubeGPT': 'asst_XSQ2jFimAvT3N122NwQxIdMO',
        }
        self.assistant_choice = self.scope["url_route"]["kwargs"]["assistant_choice"]
        self.thread = await self.client.beta.threads.create()
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        user_input = text_data.strip()
        assistant_id = self.assistant_ids.get(self.assistant_choice, self.assistant_ids['Value_prop'])
        message = await self.client.beta.threads.messages.create(
                thread_id=self.thread.id,
                role="user",
                content= user_input
                )
        stream = await self.client.beta.threads.runs.create(
                assistant_id=assistant_id,
                thread_id=self.thread.id,
                stream=True
                )
        async for chunk in stream:
            if isinstance(chunk, ThreadMessageDelta):
                await self.send(text_data=json.dumps({'delta': chunk.data.delta.content[0].text.value}))
        await self.send(text_data=json.dumps({'type': 'end'}))
