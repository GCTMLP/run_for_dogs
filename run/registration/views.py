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
                                with_dog= True if request['dog'] == '1' else False,
                                dog_name = request['d_name'],
                                dog_breed = request['d_bread'],
                                dog_bdate = request['d_bdate'],
                                dog_adopt = True if request['adopt'] == '1' else False,
                                sick = True if request['sick'] == '1' else False,
                                sick_text = request['sick_text'])
            form_data.save()
#             send_mail('Confirmation of Run for Dogs Dubai Race Registration', f'''Dear {request['name']},
#
# We are thrilled to confirm your registration for the Run for Dogs Dubai race on the 14th of May! Thank you for your interest in supporting the welfare of our furry friends and making a difference in their lives.
# A week before the event, we will send you more information. In the meantime, you can visit the FAQ section on our website runfordogs.world for any questions you may have.
# At Run for Dogs, we care about dogs, people, and nature. We want to show that dogs are not a burden but great life companions through our running events. With your support, we believe we can make Dubai a better place for these animals.
# Please follow us on Instagram to stay up-to-date with the latest news.
# We look forward to seeing you at the race.
#
# Best regards,
# Run for Dogs Team ''',
#                       settings.EMAIL_HOST, [request['email']],
#                       fail_silently=False)
            return JsonResponse('true', safe=False)
        except Exception as e:
            return JsonResponse('false', safe=False)
