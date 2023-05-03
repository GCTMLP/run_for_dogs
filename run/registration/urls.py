from django.urls import path
from .views import Register, SaveData

urlpatterns = [
    path('', Register.as_view(), name='regster'),
    path('save_data/', SaveData.as_view(), name='save'),
]