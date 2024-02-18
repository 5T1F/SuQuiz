from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
# import app.routing
from django.urls import re_path
from backend_ai.consumers import DettectionConsumer
websocket_urlpatterns = [
    re_path(r'^ws/(?P<category>\w+)', DettectionConsumer.as_asgi()),
]
# suquiz.shop/ws/

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})