from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(AquaAccount)
class AquaAccountAdmin(admin.ModelAdmin):
    list_display = ('id_aqua_account', 'user_mail', 'user_token', 'is_admin')
  
@admin.register(AquaHistory)
class AquaHistoryAdmin(admin.ModelAdmin):
    list_display = ('id_aqua_history', 'id_aqua_account', 'log_info')
