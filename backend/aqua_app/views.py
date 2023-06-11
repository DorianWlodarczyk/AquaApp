from datetime import datetime
import requests
from django.http import HttpResponse,JsonResponse
from rest_framework.decorators import api_view
from .firebase import get_user_id


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

@api_view(['POST'])
def simulate_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return JsonResponse({"error": "Both email and password are required"}, status=400)

    # Zastąp YOUR_FIREBASE_API_KEY właściwym kluczem API Firebase.
    firebase_auth_url = f"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCWv2sZP1PPfYljB8_sEWy5mYSOYoIOQOI"
    data = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }

    r = requests.post(firebase_auth_url, data=data)

    if r.status_code != 200:
        return JsonResponse({"error": "Unauthorized: Invalid email or password"}, status=401)

    token = r.json().get('idToken')

    user_id, email2 = get_user_id(token)

    if user_id == "Unauthorized: Invalid token":
        return JsonResponse({"error": "Unauthorized: Invalid token"}, status=401)

    return JsonResponse({"user_id": user_id, "email": email2}, status=200)