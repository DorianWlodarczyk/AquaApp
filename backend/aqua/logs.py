from aqua.models import AquaHistory

def log(user_id, message):
    try:
        message_log = AquaHistory(id_aqua_account= user_id, log_info= message)
        message_log.save()
    except ValueError:
        print("Invalid arguments")
        