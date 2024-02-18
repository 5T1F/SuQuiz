FROM continuumio/anaconda3

RUN mkdir /backend-ai
ADD . /backend-ai
WORKDIR /backend-ai


# Conda 환경 파일을 사용하여 환경 생성
RUN conda env export -n environment -f environment.yml --from-history
RUN pip3 install opencv-python
RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx
RUN pip install websocket
RUN pip install channels
RUN pip install fastapi 'uvicorn[standard]'

EXPOSE 8000
# 컨테이너 생성 및 실행 시 실행하는 명령어
CMD ["uvicorn", "backend_ai_conda.asgi:application", "--host", "0.0.0.0", "--port", "8000", "--reload"]