from django.shortcuts import render
from datetime import datetime
from django.http import HttpResponse
from aqua.models import AquaHistory, AquaAccount
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
def log(user_id, message):
  message_log = AquaHistory(id_aqua_account= user_id, log_info= message)
  message_log.save()
  
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
    log(user_id=id_aqua_account, message="nie sztuka uciec gdy w dupie sztuciec")
    return HttpResponse("user id ok")
    