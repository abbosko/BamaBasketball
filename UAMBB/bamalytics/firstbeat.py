import requests
from django.conf import settings
import jwt #pyjwt
import time
from dotenv import load_dotenv
import os

load_dotenv()



def get_firstbeat_token():
    secret = os.getenv("FIRSTBEAT_SHARED_SECRET")
    now = int(time.time())
    expires = now + 300

    payload = {
        'iss': os.getenv('FIRSTBEAT_CONSUMERID'),
        'iat': now,
        'exp': expires
    }

    token = jwt.encode(payload, secret)
    return token


def get_firstbeat_stats_by_practice(practice):
    token = get_firstbeat_token
    response = requests.get(
        url= settings.FIRSTBEAT_URL,
        params = {}
    )
    return response.json()