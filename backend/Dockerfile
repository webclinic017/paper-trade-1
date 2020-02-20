FROM python:3

# Environment variables
ENV PYTHONUNBUFFERED 1

# Work directory
WORKDIR /code

# Install dependencies
COPY ./requirements /code/requirements
COPY ./requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
RUN apt-get update && apt-get install -y vim dos2unix netcat
 
# Used when developing locally on windows :/
RUN dos2unix /code/entrypoint.sh

ENTRYPOINT ["/code/entrypoint.sh"]

EXPOSE 8000
