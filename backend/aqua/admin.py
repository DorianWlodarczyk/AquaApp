from django.contrib import admin
from .models import *

# Register your models here.


@admin.register(AquaAccount)
class AquaAccountAdmin(admin.ModelAdmin):
    list_display = ('id_aqua_account', 'user_mail', 'user_id', 'is_admin')


@admin.register(AquaHistory)
class AquaHistoryAdmin(admin.ModelAdmin):
    list_display = ('id_aqua_history', 'id_aqua_account', 'log_info')


@admin.register(TankObject)
class TankObjectAdmin(admin.ModelAdmin):
    list_display = ('id_tank_object', 'id_aqua_decorator', 'id_aqua_maker',
                    'id_aqua_account', 'tank_name', 'id_tank_picture', 'is_favourite_tank')


@admin.register(AquaDecorator)
class AquaDecoratorAdmin(admin.ModelAdmin):
    list_display = ('id_aqua_decorator', 'id_ground', 'id_plant', 'id_asset')


@admin.register(AquaMaker)
class AquaMakerAdmin(admin.ModelAdmin):
    list_display = ('id_aqua_maker', 'id_aquarium_tank',
                    'id_heater', 'id_pump', 'id_lamp')


@admin.register(Ground)
class GroundAdmin(admin.ModelAdmin):
    list_display = ('id_ground', 'ground_name', 'ground_size')


@admin.register(Plant)
class PlantAdmin(admin.ModelAdmin):
    list_display = ('id_plant', 'plant_name')


@admin.register(AquaLife)
class AquaLifeAdmin(admin.ModelAdmin):
    list_display = ('id_aqua_life_fish', 'id_fish', 'id_fish_life_time',
                    'id_tank_object', 'fish_life_status', 'fish_nickname')


@admin.register(AquariumTank)
class AquariumTankAdmin(admin.ModelAdmin):
    list_display = ('id_aquarium_tank', 'size_width',
                    'size_height', 'size_length')


@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ('id_asset', 'asset_name', 'asset_size_flag')


@admin.register(Fish)
class FishAdmin(admin.ModelAdmin):
    list_display = ('id_fish', 'fish_name', 'fish_size', 'min_ph',
                    'max_ph', 'min_degree', 'max_degree', 'fish_character', 'info')


@admin.register(FishConflict)
class FishConflictAdmin(admin.ModelAdmin):
    list_display = ('id_fish_conflict', 'id_first_fish', 'id_second_fish')


@admin.register(Heater)
class HeaterAdmin(admin.ModelAdmin):
    list_display = ('id_heater', 'heater_name', 'heater_min_power',
                    'heater_max_power', 'min_capacity', 'max_capacity')


@admin.register(Lamp)
class LampAdmin(admin.ModelAdmin):
    list_display = ('id_lamp', 'lamp_name', 'power')


@admin.register(Pump)
class PumpAdmin(admin.ModelAdmin):
    list_display = ('id_pump', 'pump_name', 'power',
                    'pump_capacity', 'water_gauge')
