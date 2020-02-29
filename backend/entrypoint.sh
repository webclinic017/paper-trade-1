#!/bin/bash

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# this should be in docker-compose.yml
if ! [ -z "$RUN_ENTRYPOINT" ]
then
  python manage.py flush --no-input
  python manage.py makemigrations
  python manage.py migrate
  python manage.py createsuperuser --noinput
  python manage.py upload_initial_data
fi

exec "$@"
