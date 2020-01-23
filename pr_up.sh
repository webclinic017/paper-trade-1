#!/bin/bash

echo Starting Paper Robin.
exec docker build -t paper_robin .
exec docker run -it -p 8000:8000 paper_robin
