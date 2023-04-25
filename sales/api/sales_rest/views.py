from django.shortcuts import render
from .models import AutomobileVO, Customer, Salesperson, Sale
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
import json


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
    ]

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id"
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id"
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "salesperson",
        "automobile",
        "customer",
        "id"
    ]
    encoders = {
        "salesperson": SalespersonEncoder(),
        "automobile": AutomobileVOEncoder(),
        "customer": CustomerEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
        )

@require_http_methods(["DELETE", "PUT"])
def api_salesperson(request, id):
    if request.method == "DELETE":
        count, _ = Salesperson.objects.filter(employee_id=id).delete()
        if count > 0:
            return JsonResponse({"deleted": True}, status=200)
        else:
            return JsonResponse({"message": "salesperson not found"}, status=404)


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
        )

@require_http_methods(["DELETE", "PUT"])
def api_customer(request, id):
    if request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        if count > 0:
            return JsonResponse({"deleted": True}, status=200)
        else:
            return JsonResponse({"message": "customer not found"}, status=404)

    else:
        content = json.loads(request.body)
        if "first_name" in content:
            first_name = content["first_name"]
            content["first_name"] = first_name
        if "last_name" in content:
            last_name = content["last_name"]
            content["last_name"] =  last_name
        if "address" in content:
            address = content["address"]
            content["address"] = address
        if "phone_number" in content:
            phone_number = content["phone_number"]
            content["phone_number"] = phone_number
        customer = Customer.objects.filter(id=id).update(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sale = Sale.objects.all()
        return JsonResponse(
            {"sale": sale},
            encoder=SaleEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            salesperson_id = content["salesperson_id"]
            salesperson = Salesperson.objects.get(employee_id=salesperson_id)
            content["salesperson"] = salesperson

        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "salesperson does not exist"},
                status=404
            )
        try:
            customer_id = content["customer_id"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "customer does not exist"},
                status=404
            )
        try:
            automobile_id = content["automobile_id"]
            automobile = AutomobileVO.objects.get(id=automobile_id)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile does not exist"},
                status=404
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
        )

@require_http_methods(["DELETE", "PUT"])
def api_sale(request, id):
    if request.method == "DELETE":
        count, _ = Sale.objects.filter(id=id).delete()
        if count > 0:
            return JsonResponse({"deleted": True}, status=200)
        else:
            return JsonResponse({"message": "sale not found"}, status=404)
