from django.db import models


class Player(models.Model):
    name = models.CharField(unique=True)
    height = models.DecimalField(null=True,blank=True)
    weight = models.DecimalField(null=True,blank=True)
    age = models.DecimalField(null=True,blank=True)
    

class Practice(models.Model):
    date = models.DateTimeField(null=False)
    

class Team(models.Model):
    name = models.CharField(unique=True)
    
class Statistics(models.Model):
    practice_id = models.ForeignKey(Practice, null=False, blank=False, on_delete=models.CASCADE)
    player_id = models.ForeignKey(Player, null=False,blank=False, on_delete=models.Cascade)

    # Hawkins Data
    jump_height = models.DecimalField(null=True,blank=True)
    mRSI = models.DecimalField(null=True,blank=True)
    time_to_takeoff = models.DecimalField(null=True,blank=True)
    breaking_phase = models.DecimalField(null=True,blank=True)
        # secondary
    peak_relative_propulsive_power = models.DecimalField(null=True,blank=True)
    braking_power = models.DecimalField(null=True,blank=True)
    propulsive_net_impulse = models.DecimalField(null=True,blank=True)
    lr_avg_braking_force = models.DecimalField(null=True,blank=True)


    # Kinexon Data
    duration =  models.DecimalField(null=True,blank=True)
    accumulated_acceleration_load =  models.DecimalField(null=True,blank=True)
    accumulated_acceleration_load_pm =  models.DecimalField(null=True,blank=True)
    total_distance_session =  models.DecimalField(null=True,blank=True)
    total_distance_week =  models.DecimalField(null=True,blank=True)
    max_speed =  models.DecimalField(null=True,blank=True)
    max_jump_height =  models.DecimalField(null=True,blank=True)
    change_of_orientation =  models.DecimalField(null=True,blank=True)


    # Firstbeat Data
    training_impulse =  models.DecimalField(null=True,blank=True)
    training_status =  models.DecimalField(null=True,blank=True)
    calories =  models.DecimalField(null=True,blank=True)
    
