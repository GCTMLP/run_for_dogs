###########
# BUILDER #
###########


FROM python:3.9.6-alpine as builder

WORKDIR /usr/src/run

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

COPY . .

COPY ./requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/run/wheels -r requirements.txt


#########
# FINAL #
#########


FROM python:3.9.6-alpine

# create directory for the app user
RUN mkdir -p /home

# create the app user
RUN addgroup -S run && adduser -S run -G run

# create the appropriate directories
ENV HOME=/home
ENV APP_HOME=/home/run
#RUN mkdir $APP_HOME
RUN mkdir $APP_HOME/staticfiles
RUN mkdir $APP_HOME/mediafiles
WORKDIR $APP_HOME

# install dependencies
RUN apk update && apk add libpq
COPY --from=builder /usr/src/run/wheels /wheels
COPY --from=builder /usr/src/run/requirements.txt .
RUN pip install --no-cache /wheels/*

# copy project
COPY . $APP_HOME

# chown all the files to the app user
RUN chown -R run:run $APP_HOME

# change to the app user
USER run
