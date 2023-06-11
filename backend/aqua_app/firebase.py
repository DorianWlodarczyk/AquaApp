import firebase_admin
from firebase_admin import credentials

FIREBASE_CONFIG = '/AQUAAPP/backend/aqua_app/config.json'

cred = credentials.Certificate(FIREBASE_CONFIG)
firebase_admin.initialize_app_(cred)