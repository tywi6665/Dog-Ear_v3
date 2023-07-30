FROM python:alpine

WORKDIR /app
ADD ./backend/requirements.txt /app/backend/


RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

RUN pip install scrapyd

ADD ./docker /app/docker
ADD ./backend /app/backend
