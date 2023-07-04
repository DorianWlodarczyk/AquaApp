# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AquaAccount(models.Model):
    id_aqua_account = models.BigAutoField(primary_key=True)
    user_mail = models.CharField(max_length=60)
    user_id = models.CharField(max_length=256, blank=True, null=True)
    is_admin = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'aqua_account'
        
    def __str__(self):
        return self.user_id


class AquaDecorator(models.Model):
    id_aqua_decorator = models.BigAutoField(primary_key=True)
    id_ground = models.ForeignKey('Ground', models.PROTECT, db_column='id_ground')
    id_plant = models.ForeignKey('Plant', models.PROTECT, db_column='id_plant')
    id_asset = models.ForeignKey('Asset', models.PROTECT, db_column='id_asset')

    class Meta:
        managed = True
        db_table = 'aqua_decorator'


class AquaHistory(models.Model):
    id_aqua_history = models.BigAutoField(primary_key=True)
    id_aqua_account = models.ForeignKey(AquaAccount, models.CASCADE, db_column='id_aqua_account', blank=True, null=True)
    log_info = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'aqua_history'


class AquaLife(models.Model):
    id_aqua_life_fish = models.BigAutoField(primary_key=True)
    id_fish = models.ForeignKey('Fish', models.PROTECT, db_column='id_fish')
    id_fish_life_time = models.DateField(blank=True, null=True)
    id_tank_object = models.ForeignKey('TankObject', models.CASCADE, db_column='id_tank_object', blank=True, null=True)
    fish_life_status = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'aqua_life'


class AquaMaker(models.Model):
    id_aqua_maker = models.BigAutoField(primary_key=True)
    id_aquarium_tank = models.ForeignKey('AquariumTank', models.CASCADE, db_column='id_aquarium_tank')
    id_heater = models.ForeignKey('Heater', models.PROTECT, db_column='id_heater')
    id_pump = models.ForeignKey('Pump', models.PROTECT, db_column='id_pump')
    id_lamp = models.ForeignKey('Lamp', models.PROTECT, db_column='id_lamp')

    class Meta:
        managed = True
        db_table = 'aqua_maker'


class AquariumTank(models.Model):
    id_aquarium_tank = models.BigAutoField(primary_key=True)
    size_width = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    size_height = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    size_length = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'aquarium_tank'


class Asset(models.Model):
    id_asset = models.BigAutoField(primary_key=True)
    asset_name = models.CharField(max_length=45, blank=True, null=True)
    asset_size_flag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'asset'

class Fish(models.Model):
    id_fish = models.BigAutoField(primary_key=True)
    fish_name = models.CharField(max_length=45, blank=True, null=True)
    fish_size = models.IntegerField(blank=True, null=True)
    min_ph = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    max_ph = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    min_degree = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    max_degree = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    fish_character = models.CharField(max_length=45, blank=True, null=True)
    info = models.CharField(max_length=250, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'fish'


class FishConflict(models.Model):
    id_fish_conflict = models.BigAutoField(primary_key=True)
    id_first_fish = models.ForeignKey(Fish, models.PROTECT, db_column='id_first_fish', blank=True, null=True)
    id_second_fish = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'fish_conflict'


class Ground(models.Model):
    id_ground = models.BigAutoField(primary_key=True)
    ground_name = models.CharField(max_length=45, blank=True, null=True)
    ground_size = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'ground'


class Heater(models.Model):
    id_heater = models.BigAutoField(primary_key=True)
    heater_name = models.CharField(max_length=45, blank=True, null=True)
    heater_min_power = models.IntegerField(blank=True, null=True)
    heater_max_power = models.IntegerField(blank=True, null=True)
    min_capacity = models.IntegerField(blank=True, null=True)
    max_capacity = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'heater'


class Lamp(models.Model):
    id_lamp = models.BigAutoField(primary_key=True)
    lamp_name = models.CharField(max_length=60, blank=True, null=True)
    power = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'lamp'


class Plant(models.Model):
    id_plant = models.BigAutoField(primary_key=True)
    plant_name = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'plant'


class Pump(models.Model):
    id_pump = models.BigAutoField(primary_key=True)
    pump_name = models.CharField(max_length=60, blank=True, null=True)
    power = models.IntegerField(blank=True, null=True)
    pump_capacity = models.IntegerField(blank=True, null=True)
    water_gauge = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'pump'


class TankObject(models.Model):
    id_tank_object = models.BigAutoField(primary_key=True)
    id_aqua_decorator = models.ForeignKey(AquaDecorator, models.PROTECT, db_column='id_aqua_decorator')
    id_aqua_maker = models.ForeignKey(AquaMaker, models.PROTECT, db_column='id_aqua_maker')
    id_aqua_account = models.ForeignKey(AquaAccount, models.CASCADE, db_column='id_aqua_account')
    tank_name = models.CharField(max_length=80, blank=True, null=True)
    id_tank_picture = models.CharField(max_length=80, blank=True, null=True)
    is_favourite_tank = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'tank_object'
