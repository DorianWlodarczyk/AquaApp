from django.shortcuts import render
from datetime import datetime
from django.http import HttpResponse
from aqua.models import AquaHistory
# Create your views here.
def log(user_id, message):
  message_log = AquaHistory(id_aqua_account= user_id, log_info= message)
  message_log.save()

def index(request):
    now = datetime.now()
    html = f'''
    <html>
        <body>
            <h1>Hello from Vercel!</h1>
            <p>The current time is { now }.</p>
        </body>
    </html>
    '''
    return HttpResponse(html)