from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO

# Create your views here.

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin"
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "employee_id",
        "first_name",
        "last_name"
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "customer",
        "vin",
        "technician",
    ]
    encoders = {
        "vin": AutomobileVOEncoder(),
        "technician": TechnicianEncoder()
    }


@require_http_methods(["GET", "POST"])
def show_technicians_list(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(

        )
