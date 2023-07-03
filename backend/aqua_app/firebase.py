import firebase_admin
from firebase_admin import credentials, auth
from decouple import config
import requests

FIREBASE_CONFIG = {
    "type": config("TYPE"),
    "project_id": config("PROJECT_ID"),
    "private_key_id": config("PRIVATE_KEY_ID"),
    "private_key": config("PRIVATE_KEY").replace("\\n", "\n"),
    "client_email": config("CLIENT_EMAIL"),
    "client_id": config("CLIENT_ID"),
    "auth_uri": config("AUTH_URI"),
    "token_uri": config("TOKEN_URI"),
    "auth_provider_x509_cert_url": config("AUTH_PROVIDER_X509_CERT_URL"),
    "client_x509_cert_url": config("CLIENT_X509_CERT_URL"),
    "universe_domain": config("UNIVERSE_DOMAIN"),
}

cred = credentials.Certificate(FIREBASE_CONFIG)
firebase_admin.initialize_app(cred)

def get_user_details(token):
    try:
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']
        email = decoded_token['email']
        return uid, email
    except ValueError:
        return None, None
    
def simulate_login(email, password):
    if not email or not password:
        raise ValueError("Both email and password are required")

    
    firebase_auth_url = f"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCWv2sZP1PPfYljB8_sEWy5mYSOYoIOQOI"
    data = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }

    r = requests.post(firebase_auth_url, data=data)

    if r.status_code != 200:
        raise ValueError("Unauthorized: Invalid email or password")

    token = r.json().get('idToken')

    return token