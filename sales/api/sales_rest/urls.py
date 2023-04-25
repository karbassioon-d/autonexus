from django.urls import path
from .views import api_list_salespeople, api_salesperson, api_list_customers, api_customer, api_list_sales, api_sale


urlpatterns = [
    path('salespeople/', api_list_salespeople, name='api_list_salespeople'),
    path('salespeople/<int:id>/', api_salesperson, name="api_sales_person"),
    path('customers/', api_list_customers, name="api_list_customers"),
    path('customers/<int:id>/', api_customer, name="api_customer"),
    path('sale/', api_list_sales, name="api_list_sales"),
    path('sale/<int:id>/', api_sale, name="api_sale"),
]
