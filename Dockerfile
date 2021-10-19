FROM python:3.8-alpine
WORKDIR /cityProject
COPY . /cityProject
RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 python -m pip install -r requirements.txt --no-cache-dir && \
CMD ["python","app.py"]