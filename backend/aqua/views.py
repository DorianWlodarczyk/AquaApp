from django.shortcuts import render
from datetime import datetime
from django.http import HttpResponse
from aqua.models import AquaHistory, AquaAccount
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from aqua.logs import log
# Create your views here.

  
@csrf_exempt
@require_http_methods(["POST"])
def index(request):
    user_id = request.POST.get('user')
    # user_id = "hwdp2137BDSM420jp2w13lk1_p0l@k69"
    id_aqua_account = AquaAccount.objects.get(user_token = user_id)

    if not user_id:
        print("podaj user id")
        print(user_id)
        return HttpResponse("chujowy use id")
    else: 
        print(user_id)
        log(user_id=id_aqua_account, message="jan pawel 2 kradl dzieciom szlugi")
        return HttpResponse("user id ok")
    