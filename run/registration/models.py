from django.db import models

class Peoples(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100, null=True)
    bdate = models.CharField(max_length=100, null=True)
    sex = models.CharField(max_length=100, null=True)
    phone = models.CharField(max_length=100, null=True)
    email = models.EmailField(max_length=100, null=True)
    size_of_dog = models.CharField(max_length=100, null=True)
    dog_name = models.CharField(max_length=100, null=True)
    dog_breed = models.CharField(max_length=100, null=True)
    time = models.DateTimeField(auto_now_add=True)
    time_to_go = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.name
