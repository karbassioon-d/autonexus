from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.AutoField(primary_key=True)

    def get_api_url(self):
        return reverse("", kwargs={"pk": self.employee_id})


class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=15)

    def get_api_url(self):
        return reverse("", kwargs={"pk": self.id})


class Sale(models.Model):
    price = models.FloatField()

    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sale",
        on_delete=models.CASCADE,
    )

    customer = models.ForeignKey(
        Customer,
        related_name="sale",
        on_delete=models.CASCADE,
    )

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sale",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("", kwargs={"pk": self.id})
