from common.json import ModelEncoder
from .models import Technician, Appointment


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
        "vip_status",
        "id"
    ]
    encoders = {
        "technician": TechnicianEncoder()
    }
