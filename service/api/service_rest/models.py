from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200)


class Technician(models.Model):
    employee_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)

    def get_api_url(self):
        return reverse("", kwargs={"id": self.employee_id})


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=2000)
    status = models.CharField(max_length=200, null=True, default='Scheduled')
    status_color = models.CharField(max_length=200, null=True, default='green')
    customer = models.CharField(max_length=200)
    vin = models.CharField(max_length=200)
    technician = models.ForeignKey(Technician, related_name="appointments", on_delete=models.CASCADE)
    vip_status = models.BooleanField(default=False, null=True)

    def get_api_url(self):
        return reverse("", kwargs={"id": self.id})
