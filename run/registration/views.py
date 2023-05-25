from django.views.generic import View, TemplateView
from django.http import JsonResponse
import json
from .models import Peoples
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import redirect

class Register(TemplateView):
    template_name = 'mddle.html'


class SaveData(View):
    def post(self, request):
        try:
            sex = ['male', 'female', 'not say']
            size = ['S', 'M', 'L']
            request = json.loads(request.body)
            print(request)
            form_data = Peoples(name = request['name'],
                                surname = request['surname'],
                                bdate = request['bdate'],
                                sex = sex[int(request['sex'])-1],
                                phone = request['code']+request['phone'],
                                email = request['email'],
                                size_of_tshirt = size[int(request['shrt'])-1],
                                with_dog= True if request['dog'] == '1'
                                else False,
                                dog_name = request['d_name'],
                                dog_breed = request['d_bread'],
                                dog_bdate = request['d_bdate'],
                                dog_adopt = True if request['adopt'] == '1'
                                else False,
                                sick = True if request['sick'] == '1'
                                else False,
                                sick_text = request['sick_text'])
            form_data.save()
            return JsonResponse('true', safe=False)
        except Exception as e:
            return JsonResponse('false', safe=False)
