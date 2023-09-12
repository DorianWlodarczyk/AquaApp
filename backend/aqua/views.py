from django.shortcuts import render, get_object_or_404, get_list_or_404
from datetime import datetime
from django.http import HttpResponse, JsonResponse, Http404
from aqua.models import *
# AquaHistory, AquaAccount, TankObject, AquaLife, AquariumTank
from django.views.decorators.http import require_http_methods
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from aqua.logs import log
from aqua_app.firebase import get_user_id, simulate_login
import json
from datetime import date
# Create your views here.


@csrf_exempt
@require_http_methods(["POST","GET"])
def index(request):
    return HttpResponse("Hello, world! This is a test.")


@require_http_methods(["GET"])
def aquariums_list(request):
    token = request.headers.get('token')

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


@require_http_methods(["GET", "PUT"])
def fish_data(request, fishID):
    result = {}
    if request.method == "GET":
        fish = get_object_or_404(AquaLife, id_aqua_life_fish=fishID)
        result = {
            "name": fish.fish_nickname,
            "species": fish.id_fish.id_fish,
            "state": fish.fish_life_status
        }
    elif request.method == "PUT":
        input = json.loads(request.body)
        token = request.headers.get('token')
        user_id, _ = get_user_id(token=token)
        if user_id is None:
            raise ValueError("Can't get user id from token")

        id_aqua_account = get_object_or_404(AquaAccount, user_id=user_id)

        AquaLife.objects.filter(id_aqua_life_fish=fishID).update(
            fish_life_status=input["state"],
            fish_nickname=input["name"]
        )
        result = {
            "status": "Update success"
        }
        log(user_id=id_aqua_account,
            message=f"Update data about fish named {input['name']}")

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

@require_http_methods(["GET"])
def aquarium_name_and_imgID(request, aquariumID):
    
   
    
    input = json.loads(request.body)
    token = request.headers.get('token')
    user_id, _ = get_user_id(token=token)
    if user_id is None:
        raise ValueError("Can't get user id from token")

    id_aqua_account = get_object_or_404(AquaAccount, user_id=user_id)
    aquarium = get_object_or_404(TankObject, id_tank_object=aquariumID, id_aqua_account=id_aqua_account)

    response_data = {
        "name": aquarium.tank_name,
        "imgID": aquarium.id_tank_picture
    }
    
    return JsonResponse(response_data, safe=False)

@require_http_methods(["GET"])
def aquarium_info(request, aquariumID):
    
  

    token = request.headers.get('token')

    user_id, _ = get_user_id(token=token)
    if user_id is None:
        return JsonResponse({"error": "Can't get user id from token"}, status=400)

    aqua_account = get_object_or_404(AquaAccount, user_id=user_id)
    aquariumID = aqua_account.id_aqua_account  

    
    tank_object = get_object_or_404(TankObject, id_tank_object=aquariumID)
    aqua_maker = get_object_or_404(AquaMaker, id_aqua_maker=tank_object.id_aqua_maker_id)
    aquarium_tank = get_object_or_404(AquariumTank, id_aquarium_tank=aqua_maker.id_aquarium_tank_id)
    heater = get_object_or_404(Heater, id_heater=aqua_maker.id_heater_id)
    lamp = get_object_or_404(Lamp, id_lamp=aqua_maker.id_lamp_id)
    pump = get_object_or_404(Pump, id_pump=aqua_maker.id_pump_id)
    asset = get_object_or_404(Asset, id_asset=get_object_or_404(AquaDecorator, id_aqua_decorator=tank_object.id_aqua_decorator_id).id_asset_id)
    plant = get_object_or_404(Plant, id_plant=get_object_or_404(AquaDecorator, id_aqua_decorator=tank_object.id_aqua_decorator_id).id_plant_id)
    ground = get_object_or_404(Ground, id_ground=get_object_or_404(AquaDecorator, id_aqua_decorator=tank_object.id_aqua_decorator_id).id_ground_id)
    
    # Get all history entries related to this aquarium
    history_objects = AquaHistory.objects.filter(id_aqua_account=tank_object.id_aqua_account_id)
    history = [
        {
            "id": history_obj.id_aqua_history,
            "time": str(history_obj.log_info),
            "text": history_obj.log_info
        } 
        for history_obj in history_objects
    ]
    
    # Prepare the response data
    response_data = {
        "fishNumber": AquaLife.objects.filter(id_tank_object=aquariumID).count(),
        "width": str(aquarium_tank.size_width),
        "height": str(aquarium_tank.size_height),
        "length": str(aquarium_tank.size_length),
        "aquaName": tank_object.tank_name,
        "aquaImg": tank_object.id_tank_picture,
        "heaterName": heater.heater_name,
        "lampName": lamp.lamp_name,
        "pumpName": pump.pump_name,
        "assetName": asset.asset_name,
        "plantName": plant.plant_name,
        "groundName": ground.ground_name,
        "history": history,
    }
    
    return JsonResponse(response_data, safe=False)
    
@require_http_methods(["POST"])
def add_fish_conflict(request):
    

    
    input_data = json.loads(request.body)

   
    token = request.headers.get('token')

    
    user_id, _ = get_user_id(token=token)

    if user_id is None:
        return JsonResponse({"error": "Can't get user id from token"}, status=400)

    
    aqua_account = get_object_or_404(AquaAccount, user_id=user_id)
    if not aqua_account.is_admin:
        return JsonResponse({"error": "User is not an admin"}, status=403)

    
    first_id = input_data.get("firstID")
    second_id = input_data.get("secondID")

    if not first_id or not second_id:
        return JsonResponse({"error": "Invalid input data"}, status=400)

    
    first_fish = get_object_or_404(Fish, id_fish=first_id)
    second_fish = get_object_or_404(Fish, id_fish=second_id)

    # Dodaj nowy rekord konfliktu ryb
    fish_conflict = FishConflict(
        id_first_fish=first_fish,
        id_second_fish=second_fish.id_fish
    )
    fish_conflict.save()

    return JsonResponse({"message": "Fish conflict added successfully"}, status=201)


@require_http_methods(["DELETE"])
def remove_fish_conflict(request):
    
    
    input_data = json.loads(request.body)

   
    token = request.headers.get('token')

   
    user_id, _ = get_user_id(token=token)

   
    if user_id is None:
        return JsonResponse({"error": "Can't get user id from token"}, status=400)

   
    aqua_account = get_object_or_404(AquaAccount, user_id=user_id)
    if not aqua_account.is_admin:
        return JsonResponse({"error": "User is not an admin"}, status=403)

   
    first_id = input_data.get("firstID")
    second_id = input_data.get("secondID")

    
    if not first_id or not second_id:
        return JsonResponse({"error": "Invalid input data"}, status=400)

    
    first_fish = get_object_or_404(Fish, id_fish=first_id)

   
    try:
        fish_conflict = get_object_or_404(FishConflict, id_first_fish=first_fish, id_second_fish=second_id)
        fish_conflict.delete()
    except Http404:
        return JsonResponse({"error": "Fish conflict not found"}, status=404)

    return JsonResponse({"message": "Fish conflict removed successfully"}, status=200)

@require_http_methods(["POST"])
def add_species(request):

    token = request.headers.get('token')

   
    user_id, _ = get_user_id(token=token)  

   
    if user_id is None:
        return JsonResponse({"error": "Can't get user id from token"}, status=400)

  
    aqua_account = get_object_or_404(AquaAccount, user_id=user_id)
    if not aqua_account.is_admin:
        return JsonResponse({"error": "User is not an admin"}, status=403)

    
    input_data = json.loads(request.body)
    
    species_name = input_data.get("fish_name")
    
    if not species_name:
        return JsonResponse({"error": "Invalid input data"}, status=400)

    new_fish = Fish(fish_name=species_name)
    new_fish.save()

    return JsonResponse({"name": species_name}, status=201)


@require_http_methods(["DELETE"])
def delete_species(request, id):  
     
    token = request.headers.get('token')

    user_id, _ = get_user_id(token=token)

    if user_id is None:
        return JsonResponse({"error": "Can't get user id from token"}, status=400)

    aqua_account = get_object_or_404(AquaAccount, user_id=user_id)
    if not aqua_account.is_admin:
        return JsonResponse({"error": "User is not an admin"}, status=403)

    try:
        fish = Fish.objects.get(id_fish=id)
        
        
        FishConflict.objects.filter(id_first_fish=id).delete()
        
        
        fish.delete()
        
        return JsonResponse({"message": f"Species with id {id} deleted successfully along with related conflict records"}, status=200)
    except Fish.DoesNotExist:
        return JsonResponse({"error": "Species not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
    
@require_http_methods(["PUT"])
def edit_species(request, id):
    
    token = request.headers.get('token')

    user_id, _ = get_user_id(token=token)

    if user_id is None:
        return JsonResponse({"error": "Can't get user id from token"}, status=400)

    aqua_account = get_object_or_404(AquaAccount, user_id=user_id)
    if not aqua_account.is_admin:
        return JsonResponse({"error": "User is not an admin"}, status=403)

    try:
        fish = Fish.objects.get(id_fish=id)
        input_data = json.loads(request.body)

        for key, value in input_data.items():
            if hasattr(fish, key):
                setattr(fish, key, value)

        fish.save()

        return JsonResponse({"name": fish.fish_name}, status=200)
    except Fish.DoesNotExist:
        return JsonResponse({"error": "Species not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)   
    
    
@require_http_methods(["GET"])
def accessories(request):
    try:
        heaters = list(Heater.objects.values('id_heater', 'heater_name', 'max_capacity'))
        lamps = list(Lamp.objects.values('id_lamp', 'lamp_name'))
        pumps = list(Pump.objects.values('id_pump', 'pump_name', 'pump_capacity'))
        assets = list(Asset.objects.values('id_asset', 'asset_name'))
        plants = list(Plant.objects.values('id_plant', 'plant_name'))
        grounds = list(Ground.objects.values('id_ground', 'ground_name'))
        
        response_data = {
            "heaters": [{"id": str(item['id_heater']), "name": item['heater_name'], "maxCapacity": item['max_capacity']} for item in heaters],
            "lamps": [{"id": str(item['id_lamp']), "name": item['lamp_name']} for item in lamps],
            "pumps": [{"id": str(item['id_pump']), "name": item['pump_name'], "maxCapacity": item['pump_capacity']} for item in pumps],
            "assets": [{"id": str(item['id_asset']), "name": item['asset_name']} for item in assets],
            "plants": [{"id": str(item['id_plant']), "name": item['plant_name']} for item in plants],
            "grounds": [{"id": str(item['id_ground']), "name": item['ground_name']} for item in grounds],
        }

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse(response_data)

@require_http_methods(["DELETE"])
def delete_accessory(request, type, id):
    
    token = request.headers.get('token')

    user_id, _ = get_user_id(token=token)

    if user_id is None:
        return JsonResponse({"error": "Can't get user id from token"}, status=400)

    aqua_account = get_object_or_404(AquaAccount, user_id=user_id)
    if not aqua_account.is_admin:
        return JsonResponse({"error": "User is not an admin"}, status=403)

    try:
        model_class = None
        id_field = None

        if type == 'heater':
            model_class = Heater
            id_field = 'id_heater'

            # Adding extra deletion steps for heaters
            aqua_maker_entries = AquaMaker.objects.filter(id_heater=id)
            for entry in aqua_maker_entries:
                TankObject.objects.filter(id_aqua_maker=entry.id_aqua_maker).delete()
            aqua_maker_entries.delete()
        elif type == 'lamp':
            model_class = Lamp
            id_field = 'id_lamp'
        elif type == 'plant':
            model_class = Plant
            id_field = 'id_plant'
        elif type == 'pump':
            model_class = Pump
            id_field = 'id_pump'
        elif type == 'ground':
            model_class = Ground
            id_field = 'id_ground'
        elif type == 'asset':
            model_class = Asset
            id_field = 'id_asset'
        else:
            return JsonResponse({"error": "Invalid type parameter"}, status=400)

        filter_kwargs = {id_field: id}
        accessory = get_object_or_404(model_class, **filter_kwargs)
        accessory.delete()

        return JsonResponse({"message": f"Accessory of type '{type}' with id {id} deleted successfully"}, status=200)
    
    except model_class.DoesNotExist:
        return JsonResponse({"error": "Accessory not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
    
@require_http_methods(["POST"])
def add_accessory(request, type):
    
    token = request.headers.get('token')
    
    user_id, _ = get_user_id(token=token)

    if user_id is None:
        return JsonResponse({"error": "Can't get user id from token"}, status=400)

    aqua_account = get_object_or_404(AquaAccount, user_id=user_id)
    if not aqua_account.is_admin:
        return JsonResponse({"error": "User is not an admin"}, status=403)

    try:
        
        model_class = None
        id_field = None
        data = json.loads(request.body)

        if type == 'heater':
            model_class = Heater
            id_field = 'id_heater'
        elif type == 'lamp':
            model_class = Lamp
            id_field = 'id_lamp'
        elif type == 'plant':
            model_class = Plant
            id_field = 'id_plant'
        elif type == 'pump':
            model_class = Pump
            id_field = 'id_pump'
        elif type == 'ground':
            model_class = Ground
            id_field = 'id_ground'
        elif type == 'asset':
            model_class = Asset
            id_field = 'id_asset'
        else:
            return JsonResponse({"error": "Invalid type parameter"}, status=400)

        new_accessory = model_class.objects.create(**data)
        response_data = {
            "name": getattr(new_accessory, f"{type}_name"),
        }
        
        if type in ['heater', 'pump']:
            response_data["maxCapacity"] = getattr(new_accessory, "max_capacity", None)

        return JsonResponse(response_data, status=201)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
    
@require_http_methods(["PUT"])
def edit_accessory(request, type, id):
    
    token = request.headers.get('token')
    
    user_id, _ = get_user_id(token=token)

    if user_id is None:
        return JsonResponse({"error": "Can't get user id from token"}, status=400)

    aqua_account = get_object_or_404(AquaAccount, user_id=user_id)
    if not aqua_account.is_admin:
        return JsonResponse({"error": "User is not an admin"}, status=403)

    try:
        model_class = None
        id_field = None
        data = json.loads(request.body)

        if type == 'heater':
            model_class = Heater
            id_field = 'id_heater'
        elif type == 'lamp':
            model_class = Lamp
            id_field = 'id_lamp'
        elif type == 'plant':
            model_class = Plant
            id_field = 'id_plant'
        elif type == 'pump':
            model_class = Pump
            id_field = 'id_pump'
        elif type == 'ground':
            model_class = Ground
            id_field = 'id_ground'
        elif type == 'asset':
            model_class = Asset
            id_field = 'id_asset'
        else:
            return JsonResponse({"error": "Invalid type parameter"}, status=400)

        filter_kwargs = {id_field: id}
        accessory = get_object_or_404(model_class, **filter_kwargs)

        for key, value in data.items():
            setattr(accessory, key, value)
        
        accessory.save()

        response_data = {
            "name": getattr(accessory, f"{type}_name"),
        }

        if type in ['heater', 'pump']:
            response_data["maxCapacity"] = getattr(accessory, "max_capacity", None)

        return JsonResponse(response_data, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
