import requests
from dotenv import load_dotenv
from django.conf import settings

load_dotenv()


def get_kinexon_stats_by_practice(practice):
    response = requests.get(
        url= settings.KINEXON_URL,
        params = {}
    )
    return response.json()