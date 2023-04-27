from common.json import ModelEncoder
from .models import AutomobileVO, Salesperson, Customer, Sale


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
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
