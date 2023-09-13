from aqua.models import AquaHistory
from datetime import datetime

def log(user_id, message):
    try:
        current_date = datetime.now().date()  
        message_log = AquaHistory(id_aqua_account=user_id, log_info=message, date=current_date)
        message_log.save()
    except ValueError:
        print("Invalid arguments")
        