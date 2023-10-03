from django.urls import path

from . import views


urlpatterns = [
    #path("", views.index, name="index"),
    path("", views.IndexView.as_view(), name="index"),
    path("<str:pk>/", views.PlayerView.as_view(), name="player"),
    path("team/<str:pk>/", views.TeamView.as_view(), name="team"),
]