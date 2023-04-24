from django.shortcuts import render
from .models import AutomobileVO, Customer, Salesperson, Sale
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
import json
# Create your views here.

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
    ]

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name"
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number"
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
    ]
    encoders = {
        "salesperson": Salesperson(),
        "automobile": AutomobileVO(),
        "customer": Customer(),
    }


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request, employee_id):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.create(**content)
        return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
        )
