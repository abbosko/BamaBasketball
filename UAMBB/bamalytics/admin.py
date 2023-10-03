from django.contrib import admin

from .models import Player, Practice, Team, Statistics

# Register your models here.
admin.site.register(Player)
admin.site.register(Practice)
admin.site.register(Team)
admin.site.register(Statistics)