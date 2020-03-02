import asyncio
from asgiref.sync import async_to_sync
import json
from django.contrib.auth import get_user_model
from channels.consumer import AsyncConsumer
from channels.db import database_sync_to_async

from paper_robin.apps.user.models import User
from paper_robin.apps.stock.models import StockPortfolio

class Consumer(AsyncConsumer):

    async def websocket_connect(self, event):
        print("connected", event)

        await self.send({
            "type": "websocket.accept",
        })

        username = self.scope['url_route']['kwargs']['username']
        user = await self.get_user(username)  
        self.scope['user'] = user
    
        await self.set_user_connection_status(user, True)
        await self.channel_layer.group_add("broadcast", self.channel_name)

        print(self.scope['user'].connected)


    async def websocket_receive(self, event):
        print("received", event)

    async def websocket_disconnect(self, event):
        user = self.scope['user']
        await self.set_user_connection_status(user, False)
        await self.channel_layer.group_discard("broadcast", self.channel_name)
        print(user.connected)
        print("disconnected", event)

    async def intraday_data_loaded(self, event):
        await self.send({
            "type": "websocket.send",
            "text": "ready"
        })

    @database_sync_to_async
    def get_watch_list(self, user):
        return StockPortfolio.objects.get(id=1)

    @database_sync_to_async
    def get_user(self, username):
        return User.objects.get(username=username)

    @database_sync_to_async
    def set_user_connection_status(self, user, status):
        user.connected = status
        user.save()