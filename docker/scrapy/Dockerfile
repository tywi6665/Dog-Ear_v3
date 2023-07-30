FROM python:alpine

WORKDIR /app

RUN pip install --upgrade pip
RUN pip install scrapyd

ADD ./backend/scrapy.cfg /app
ADD ./docker /app/docker
ADD ./backend/recipe_scraper /app/recipe_scraper
