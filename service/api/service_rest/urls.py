from django.urls import path
from .views import api_list_technicians, api_delete_technician, api_list_appointments, api_edit_appointment


urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:id>", api_delete_technician, name="api_delete_technician"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:id>", api_edit_appointment, name="delete appointment"),
    path("appointments/<int:id>/cancel", api_edit_appointment, name="cancel appointment"),
    path("appointments/<int:id>/finish", api_edit_appointment, name="finish appointment"),
]
