import requests
from dotenv import load_dotenv
from django.conf import settings
import os

load_dotenv()


def get_hawkins_stats(practice_date):
    response = requests.get(
        url= os.getenv('HAWKINS_URL'), #+ "athletes",
        headers = {
            "Authorization": f"Bearer {os.getenv('HAWKINS_API_KEY')}"
        }
        params = {}
    )
    return response.json()

def get_jump_

print(get_hawkins_stats("1"))
# Primary Data

# Jump Height

# mRSI

# Time to Takeoff

# Braking Phase

 

# Secondary Data

# Peak Relative Propulsive Power

# Braking Power

# Braking Net Impulse

# Propulsive Net Impulse

# L/R Avg. Braking Force
