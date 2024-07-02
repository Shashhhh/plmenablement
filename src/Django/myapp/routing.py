from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/stream/(?P<assistant_choice>\w+)/$", consumers.Handler.as_asgi()),

]
