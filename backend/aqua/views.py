from django.shortcuts import render, get_object_or_404, get_list_or_404
from datetime import datetime
from django.http import HttpResponse, JsonResponse
from aqua.models import *
# AquaHistory, AquaAccount, TankObject, AquaLife, AquariumTank
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from aqua.logs import log
from aqua_app.firebase import get_user_id, simulate_login
import json
# Create your views here.


@csrf_exempt
@require_http_methods(["POST"])
def index(request):
    user_id = json.loads(request.body)
    # user_id = "hwdp2137BDSM420jp2w13lk1_p0l@k69"
    # id_aqua_account = AquaAccount.objects.get(user_id=user_id)

    if not user_id:
        print("podaj user id")
        print(user_id)
        return HttpResponse("chujowy use id")
    else:
        print(user_id)
        # log(user_id=id_aqua_account, message="jan pawel 2 kradl dzieciom szlugi")
        return HttpResponse("user id ok")


@require_http_methods(["GET"])
def aquariums_list(request):
    token = request.GET.get('token')

    user_id, _ = get_user_id(token=token)
    if user_id is None:
        raise ValueError("Can't get user id from token")

    id_aqua_account = get_object_or_404(AquaAccount, user_id=user_id)

    aquariums = get_list_or_404(TankObject, id_aqua_account=id_aqua_account)

    result = []
    for item in aquariums:
        fish_number = AquaLife.objects.filter(
            id_tank_object=item.id_tank_object)
        value = {
            "id": item.id_tank_object,
            "name": item.tank_name,
            "imgID": item.id_tank_picture,
            "fishNumber": len(fish_number)
        }
        result.append(value)

    return JsonResponse(result, safe=False)


@require_http_methods(["POST", "GET"])
def add_aquarium(request):

    input = json.loads(request.body)
    token = request.headers.get('token')
    user_id, _ = get_user_id(token=token)
    if user_id is None:
        raise ValueError("Can't get user id from token")

    id_aqua_account = get_object_or_404(AquaAccount, user_id=user_id)
    print("data: ", input)
    try:
        aquarium_container = AquariumTank.objects.create(
            size_width=input["width"],
            size_height=input["height"],
            size_length=input["length"]
        )

        aqua_maker = AquaMaker.objects.create(
            id_aquarium_tank=aquarium_container,
            id_heater=Heater.objects.get(id_heater=input["heaterID"]),
            id_pump=Pump.objects.get(id_pump=input["pumpID"]),
            id_lamp=Lamp.objects.get(id_lamp=input["lampID"])
        )
        aqua_decorator = AquaDecorator.objects.create(
            id_ground=Ground.objects.get(id_ground=input["groundID"]),
            id_plant=Plant.objects.get(id_plant=input["plantID"]),
            id_asset=Asset.objects.get(id_asset=input["assetID"])
        )

        tank_object = TankObject.objects.create(
            id_aqua_decorator=aqua_decorator,
            id_aqua_maker=aqua_maker,
            id_aqua_account=id_aqua_account,
            tank_name=input["name"],
            id_tank_picture=input["imgID"],
            is_favourite_tank=0
        )
        tank_object.save()
        result = {
            "status": "ok",
            "aquariumID": tank_object.id_tank_object
        }
        log(user_id=id_aqua_account,
            message=f"Add new aquarium named {input['name']}")
    except ValueError:
        result = result = {
            "status": "Something went wrong, can't add new aquarium",
            "aquariumID": None
        }

    return JsonResponse(result, safe=False)


@require_http_methods(["GET"])
def aquariums_and_fish(request):

    token = simulate_login("dupa@mail.com", "Dupa123")
    user_id, _ = get_user_id(token=token)
    if user_id is None:
        raise ValueError("Can't get user id from token")

    id_aqua_account = get_object_or_404(AquaAccount, user_id=user_id)

    aquariums = get_list_or_404(TankObject, id_aqua_account=id_aqua_account)

    result = []
    for item in aquariums:
        print(item)
        aqua_life_list = AquaLife.objects.filter(
            id_tank_object=item.id_tank_object)
        print("aq list:", aqua_life_list)
        for aqua_life in aqua_life_list:
            # print("aqua life in aq list", aqua_life.id_fish.id_fish)
            fish = Fish.objects.filter(id_fish=aqua_life.id_fish.id_fish)
            # for f in fish:
            #     print(f.id_fish)
            fish_conflict = FishConflict.objects.filter(
                id_first_fish=aqua_life.id_fish.id_fish)

            print(fish_conflict)

        break
        # value = {
        #     "id": item.id_tank_object,
        #     "name": item.tank_name,
        #     "imgID": item.id_tank_picture,
        #     # "fish": [
        #     #     "name"
        #     #     "id"
        #     #     "speciesID" #fishID z tabeli fish
        #     #     "conflict":[
        #     #     ]
        #     # ]
        # }
        result.append(value)

    return JsonResponse(result, safe=False)
