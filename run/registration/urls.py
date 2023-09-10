from django.urls import path
from .views import Register, SaveData, TimeData

urlpatterns = [
    path('', Register.as_view(), name='regster'),
    path('save_data/', SaveData.as_view(), name='save'),
    path('time_data/', TimeData.as_view(), name='time'),
]