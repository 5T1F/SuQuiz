import json
import logging

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from . import knn

# 실행코드
# uvicorn backend_ai_conda.asgi:application --reload
class DettectionConsumer(WebsocketConsumer):

    """
    *args : 가변 개수의 위치 인수, tuple
    **kwargs : 키워드 인수, dictionary
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)   # super() 작성 안하면 에러 뜨는데, 이유가 뭘까?
        print("args : ", args)
        print("kwargs : ", kwargs)
        #
        """
        category, knn, (logger)
        """
        self.category_mapper = {'1': 'Consonant', '2': 'Vowel', '3': 'Number', '4': 'ConsonantVowel'}  # category_mapper라는 인스턴스 변수를 정의, PK를 해당 카테고리의 이름으로 매핑
        self.knn = None
        self.logger = logging.getLogger('django server')

    # 웹소켓 연결이 성립될 때
    def connect(self):
        print("accept")
        self.accept()   # 이를 통해 웹소켓 연결이 성립, 이후 메시지 송수신 가능


        category_pk = self.scope['url_route']['kwargs']['category']
        print("category_pk", category_pk)
        if (category_pk == '1'):
            self.knn = knn.ConsonantKNN()
        elif (category_pk == '2'):
            self.knn = knn.VowelKnn()
        elif (category_pk == '3'):
            self.knn = knn.NumberKnn()
        elif (category_pk == '4'):
            self.knn = knn.ConsonantVowelKnn()

        self.logger.info("WebSocket Connected with " + self.category_mapper[category_pk])

        # send message if connected successfully
        msg = {
            # 'category': self.category_mapper[category_pk],
            'message': 'You are now connected!'
        }
        self.send_message(msg)

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            # self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data=None):
        # Get JSON Message
        text_data_json = json.loads(text_data)  # json to dictionary
        message = text_data_json['message']
        response_msg = ''
        msg = {}
        host = str(self.scope['client'][0])  # client's host address
        port = str(self.scope['client'][1])  # client's port address
        client = host + ":" + port
        debug_msg = ''
        for dict_msg in message:
            debug_msg += json.dumps(dict_msg)
        self.logger.debug("From " + "[" + client + "]" + " message: " + debug_msg)

        # Send Result
        try:
            response_msg = self.knn.predict(message)
            self.logger.debug("To " + client + " response: " + response_msg)
        except:
            response_msg = '유효한 데이터가 아닙니다.'
            self.logger.error('ERROR FROM: ', client)

        msg = {'response': response_msg}
        self.send_message(msg)

    def send_message(self, msg):
        self.send(text_data=json.dumps(msg))