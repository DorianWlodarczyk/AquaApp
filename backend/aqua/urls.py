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
    path("fish", views.create_fish, name="create_fish"),
    path("<aquariumID>/name",views.aquarium_name_and_imgID,name="aquarium_name_and_imgID"),
    path("<aquariumID>/",views.aquarium_info,name="aquarium_info"),
    path("admin/conflict",views.add_fish_conflict,name="add_fish_conflict"),
    path("admin/conflicts",views.remove_fish_conflict,name="remove_fish_conflic"),
    path("admin/speciess", views.add_species, name="add_species"),
    path("admin/remove_species/<int:id>", views.delete_species, name="delete_species"),
]
