import firebase_admin
from firebase_admin import credentials, auth
from decouple import config

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

def get_user_id(token):
    try:
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']
        email = decoded_token['email']
        return uid, email

    except ValueError:
        # Token is invalid
        return "Unauthorized: Invalid token"