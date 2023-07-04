from django.shortcuts import render, get_object_or_404, get_list_or_404
from datetime import datetime
from django.http import HttpResponse, JsonResponse
from aqua.models import AquaHistory, AquaAccount, TankObject, AquaLife
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from aqua.logs import log
from aqua_app.firebase import get_user_id, simulate_login
# Create your views here.

  
@csrf_exempt
@require_http_methods(["POST"])
def index(request):
    user_id = request.POST.get('user')
    # user_id = "hwdp2137BDSM420jp2w13lk1_p0l@k69"
    id_aqua_account = AquaAccount.objects.get(user_id = user_id)

    if not user_id:
        print("podaj user id")
        print(user_id)
        return HttpResponse("chujowy use id")
    else: 
        print(user_id)
        log(user_id=id_aqua_account, message="jan pawel 2 kradl dzieciom szlugi")
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
        fish_number = AquaLife.objects.filter(id_tank_object=item.id_tank_object)
        value = {
            "id": item.id_tank_object,
            "name": item.tank_name,
            "imgID": item.id_tank_picture,
            "fishNumber": len(fish_number)
        }
        result.append(value)
        
    return JsonResponse(result, safe=False)
	