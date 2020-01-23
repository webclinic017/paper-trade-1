#!/bin/bash

echo Stopping Paper Robin.
exec docker container stop $(docker container ls -aq)
