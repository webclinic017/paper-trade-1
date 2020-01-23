FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY . /code/
RUN pip install -r requirements.txt
RUN apt-get update && apt-get install -y vim dos2unix
RUN dos2unix start.sh

EXPOSE 8000

CMD ["/start.sh"]
