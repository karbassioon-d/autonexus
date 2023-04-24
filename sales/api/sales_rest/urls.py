from django.urls import path
from .views import api_list_salespeople


urlpatterns = [
    path('sales/', api_list_salespeople, name='api_list_salespeople'),
]
