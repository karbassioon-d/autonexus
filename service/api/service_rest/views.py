from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Technician, Appointment, AutomobileVO
from .encoders import TechnicianEncoder, AppointmentEncoder


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        try:
            technicians = Technician.objects.all()
            return JsonResponse(
                {"technicians": technicians},
                encoder=TechnicianEncoder
            )
        except Technician.DoesNotExist():
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=404,
            )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_technician(request, id):
    count, _ = Technician.objects.filter(employee_id=id).delete()
    if count > 0:
        return JsonResponse({"deleted": True}, status=200)
    else:
        return JsonResponse({"message": "technician not found"}, status=404)


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        try:
            appointments = Appointment.objects.all()
            return JsonResponse(
                {"appointments": appointments},
                encoder=AppointmentEncoder
            )
        except Appointment.DoesNotExist():
            return JsonResponse(
                {"message": "Could not get appointments"},
                status=404,
            )

    else:
        content = json.loads(request.body)
        try:
            vin = content["vin"]
            vin = AutomobileVO.objects.get(vin=vin)
            content["vip_status"] = True
        except AutomobileVO.DoesNotExist:
            content["vip_status"] = False
        try:
            technician_id = content["technician"]
            technician = Technician.objects.get(employee_id=technician_id)
            content["technician"] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=404,
            )


@require_http_methods(["DELETE", "PUT"])
def api_edit_appointment(request, id):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=id).delete()
        if count > 0:
            return JsonResponse({"deleted": True}, status=200)
        else:
            return JsonResponse({"message": "appointment not found"}, status=404)

    else:
        content = json.loads(request.body)
        status = content["status"]
        content["status"] = status
        appointment = Appointment.objects.filter(id=id).update(status=status)
        return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
