FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY ./requirements /code/requirements
COPY ./requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
RUN apt-get update && apt-get install -y vim dos2unix
RUN dos2unix start.sh

EXPOSE 8000

CMD ["./start.sh"]
