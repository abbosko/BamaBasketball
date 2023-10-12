import requests
from dotenv import load_dotenv
from django.conf import settings
import os

load_dotenv()


def get_kinexon_stats_by_practice(practice):
    response = requests.get(
        url = os.getenv('KINEXON_URL') + "/public/v1/statistics/list",
            headers = {
            "Authorization": f"Bearer {os.getenv('KINEXON_API_KEY')}",
        }
    )
    return response.status_code

print(get_kinexon_stats_by_practice("1"))