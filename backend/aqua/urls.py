from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("aquariums", views.aquariums_list, name="aquariums_list"),
    path("aquarium", views.add_aquarium, name="add_aquarium"),
    path("aquariums-and-fish", views.aquariums_and_fish, name="aquariums_and_fish"),
    path("<aquariumID>/species", views.species_in_aquarium,
         name="species_in_aquarium"),
    path("fish/fish_conflict", views.fish_conflict, name="fish_conflict"),
    path("fish/<fishID>", views.fish_data, name="fish_data"),

]
