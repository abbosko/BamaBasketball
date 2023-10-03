from django.urls import path

from . import views


urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path("<str:pk>/", views.PlayerView.as_view(), name="player"),
    path("team/<str:pk>/", views.TeamView.as_view(), name="team"),
]