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
from datetime import date
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

    token = request.headers.get('token')
    user_id, _ = get_user_id(token=token)
    if user_id is None:
        raise ValueError("Can't get user id from token")

    id_aqua_account = get_object_or_404(AquaAccount, user_id=user_id)

    aquariums = get_list_or_404(TankObject, id_aqua_account=id_aqua_account)

    result = []
    for item in aquariums:
        aqua_life_list = AquaLife.objects.filter(
            id_tank_object=item.id_tank_object)
        print("aq list:", aqua_life_list)
        fish_list = []
        for aqua_life in aqua_life_list:
            fishes = Fish.objects.filter(id_fish=aqua_life.id_fish.id_fish)
            for fish in fishes:
                fish_conflict = FishConflict.objects.filter(
                    id_first_fish=aqua_life.id_fish.id_fish)
                fish_conflict_list = []
                for co in fish_conflict:
                    fish_conflict_list.append(co.id_second_fish)
                fish_value = {
                    "name": fish.fish_name,
                    "id": fish.id_fish,
                    "conflict": fish_conflict_list
                }
                fish_list.append(fish_value)
        value = {
            "aquariumID": item.id_tank_object,
            "aquariumName": item.tank_name,
            "aquariumImg": item.id_tank_picture,
            "fish": fish_list
        }
        result.append(value)

    return JsonResponse(result, safe=False)


@require_http_methods(["GET"])
def species_in_aquarium(request, aquariumID):
    result = []
    if aquariumID == "fish":
        fish_list = get_list_or_404(Fish)
        for fish in fish_list:
            result.append(fish.id_fish)
    else:
        aqua_life_list = get_list_or_404(AquaLife, id_tank_object=aquariumID)
        for fish in aqua_life_list:
            result.append(fish.id_fish.id_fish)

    return JsonResponse(result, safe=False)


@require_http_methods(["GET"])
def fish_conflict(request):
    result = []
    fishes = get_list_or_404(Fish)
    for fish in fishes:
        fish_conflict = FishConflict.objects.filter(
            id_first_fish=fish.id_fish)
        fish_conflict_list = []
        for co in fish_conflict:
            fish_conflict_list.append(co.id_second_fish)
        fish_value = {
            "id": fish.id_fish,
            "conflict": fish_conflict_list
        }
        result.append(fish_value)

    return JsonResponse(result, safe=False)


@require_http_methods(["GET"])
def fish_data(request, fishID):

    fish = get_object_or_404(AquaLife, id_fish=fishID)
    result = {
        "name": fish.fish_nickname,
        "species": fish.id_fish.id_fish,
        "state": fish.fish_life_status
    }

    return JsonResponse(result, safe=False)


@require_http_methods(["POST"])
def create_fish(request):

    input = json.loads(request.body)
    token = request.headers.get('token')
    user_id, _ = get_user_id(token=token)
    if user_id is None:
        raise ValueError("Can't get user id from token")

    id_aqua_account = get_object_or_404(AquaAccount, user_id=user_id)
    print("data: ", input)
    print("data: ", input)
    try:
        fish = get_object_or_404(Fish, id_fish=input["species"])
        tank = get_object_or_404(TankObject, id_tank_object=input["aquaID"])
        aqua_life = AquaLife.objects.create(
            id_fish=fish,
            id_fish_life_time=date.today(),
            fish_life_status=input["state"],
            id_tank_object=tank,
            fish_nickname=input["name"]
        )
        aqua_life.save()
        result = {
            "status": "ok",
        }
        log(user_id=id_aqua_account,
            message=f"Add new fish named {input['name']}")
    except ValueError as error:
        print(error)
        result = {
            "status": "Something went wrong, can't add new fish",
        }

    return JsonResponse(result, safe=False)
