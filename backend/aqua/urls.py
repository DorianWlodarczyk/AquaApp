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
    path("<aquariumID>",views.aquarium_info,name="aquarium_info"),
    path("admin/conflict",views.add_fish_conflict,name="add_fish_conflict"),
    path("admin/conflicts",views.remove_fish_conflict,name="remove_fish_conflic"),
    path("admin/speciess", views.add_species, name="add_species"),
    path("admin/remove_species/<int:id>", views.delete_species, name="delete_species"),
    path("admin/edit_species/<int:id>", views.edit_species, name="edit_species"),
    path("accessories/all", views.accessories, name="accessories"),
    path("admin/delete_accessory/<str:type>/<int:id>", views.delete_accessory, name='delete_accessory'),
    path("admin/add_accessory/<str:type>", views.add_accessory, name='add_accessory'),
    path("admin/edit_accessory/<str:type>/<int:id>", views.edit_accessory, name='edit_accessory'),
    path("fishes/all_species",views.get_all_fish,name="get_all_fish"),
    path('check_if_admin', views.check_if_admin, name='check_if_admin'),
]

