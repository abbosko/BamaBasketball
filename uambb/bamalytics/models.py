from django.db import models

# Create your models here.

class Player(models.Model):
    name = models.CharField(max_length=200, unique=True)
    height = models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    weight = models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    age = models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    
    def __str__(self):
        return self.name
    

class Practice(models.Model):
    date = models.DateTimeField(null=False)
    
    def __str__(self):
        return self.date
    

class Team(models.Model):
    name = models.CharField(max_length=200, unique=True)
    
    def __str__(self):
        return self.name
    
class Statistics(models.Model):
    practice_id = models.ForeignKey(Practice, null=False, blank=False, on_delete=models.CASCADE)
    player_id = models.ForeignKey(Player, null=False,blank=False, on_delete=models.CASCADE)

    # Hawkins Data
    jump_height = models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    mRSI = models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    time_to_takeoff = models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    breaking_phase = models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
        # secondary
    peak_relative_propulsive_power = models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    braking_power = models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    propulsive_net_impulse = models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    lr_avg_braking_force = models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)


    # Kinexon Data
    duration =  models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    accumulated_acceleration_load =  models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    accumulated_acceleration_load_pm =  models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    total_distance_session =  models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    total_distance_week =  models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    max_speed =  models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    max_jump_height =  models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    change_of_orientation =  models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)


    # Firstbeat Data
    training_impulse =  models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    training_status =  models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    calories =  models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    
    def __str__(self):
        return self.practice_id
