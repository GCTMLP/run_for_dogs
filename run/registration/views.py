from django.views.generic import View, TemplateView
from django.http import JsonResponse
import json
from .models import Peoples

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
                                size_of_dog = size[int(request['shrt'])-1],
                                dog_name = request['d_name'],
                                dog_breed = request['d_bread'],
                                time_to_go = request['time_choose'])
            form_data.save()
            return JsonResponse('true', safe=False)
        except Exception as e:
            return JsonResponse('false', safe=False)



class TimeData(View):

    def post(self, request):
        data = Peoples.objects.all()
        times = {
            '17:00-17:30': 0,
            '17:30-18:00': 0,
            '18:00-18:30': 0,
            '18:30-19:00': 0,
            '19:00-19:30': 0,
        }
        for man in data:
            times[man.time_to_go] +=1
        time_availible = [key for key, time in times.items() if time < 36]
        return_data = json.dumps(time_availible)
        return JsonResponse(return_data, safe=False)
