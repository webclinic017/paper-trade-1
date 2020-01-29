#!/bin/sh

echo Stopping Paper Robin.
docker-compose down
& docker container stop $(docker container ls -aq)
& yes | docker rmi $(docker images -f "dangling=true" -q) 
& yes | docker volume prune -f
