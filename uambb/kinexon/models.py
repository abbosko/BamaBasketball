from django.db import models


class Player(models.Model):
    name = models.CharField(unique=True)
    

class Practice(models.Model):
    date = models.DateTimeField(null=False)

class Team(models.Model):
    name = models.CharField(unique=True)
    
