from django.db import models

# Create your models here.
from django.db import models

# Create your models here.

class Player(models.Model):
    id = models.IntegerField(primary_key=True, default=-100)
    first_name = models.CharField(max_length=200, null=False, default='Player1')
    last_name = models.CharField(max_length=200, null=False, default='Player1')
    height = models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    weight = models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    age = models.DecimalField(max_digits=10, decimal_places=3, null=True,blank=True)
    
    def __str__(self):
        return self.first_name
    
    def get_player_first_name(self):
        return self.first_name
    
    def get_player_last_name(self):
        return self.last_name
    
    def get_player_full_name(self):
        return self.first_name + " " + self.last_name
    
    def get_player_height(self):
        return self.height
    
    def get_player_weight(self):
        return self.weight
    
    def get_player_age(self):
        return self.age
    
    def get_player_id(self):
        return self.id
    
    def get_player_stats_by_practice_id(self, practice_date):
        pass


    

class Practice(models.Model):
    date = models.DateTimeField(null=False)
    
    def __str__(self):
        return self.date
    
    def get_practice_stats(self):
        pass 

    

class Team(models.Model):
    name = models.CharField(max_length=200, unique=True, primary_key=True)
    
    def __str__(self):
        return self.name
    
    def get_team_name(self):
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
    
    def get_stats_by_practice_id(self):
        pass

       
    def get_stats_by_practice_date(self):
        pass

    def get_stats_by_player_id(self):
        pass

    def get_stats_by_playerid_practiceid(self):
        pass 

    def get_firstbeat_data(self):
        pass

    def set_trimp():
        pass

    def set_training_status(self):
        pass

    def set_calories(self):
        pass 

    def get_trimp(self):
        return self.training_impulse
    
    def get_training_status(self):
        return self.training_status
    
    def get_calories(self):
        return self.calories
    
