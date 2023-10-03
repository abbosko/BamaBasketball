import jwt #pyjwt
import time
from dotenv import load_dotenv
import os

load_dotenv()

secret = os.getenv("FIRSTBEAT_SHARED_SECRET")
now = int(time.time())
expires = now + 300

payload = {
    'iss': os.getenv('FIRSTBEAT_CONSUMERID'),
    'iat': now,
    'exp': expires
}

token = jwt.encode(payload, secret)
print(token)