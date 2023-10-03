from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic

from .models import Player, Practice, Team, Statistics


class HomeView(generic.ListView):          # ListView -> display list of objs
    template_name = "home.html"
    context_object_name = "player_list"

    def get_queryset(self):
        """Return the last five players."""
        return Player.objects.order_by("id")


class PlayerView(generic.DetailView):       # DetailView -> display details for list of objs
    model = Player
    template_name = "player.html"


class TeamView(generic.DetailView):
    model = Team
    template_name = "team.html"