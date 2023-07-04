from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("aquariums", views.aquariums_list, name="aquariums_list"),
]