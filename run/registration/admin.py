from django.contrib import admin

from .models import Peoples


#@admin.register(Peoples)
class PeoplesAdmin(admin.ModelAdmin):
    #pass
    #model = Peoples
    list_display = ('name', 'surname', 'bdate', 'sex', 'phone', 'email', 'size_of_tshirt', 'with_dog', 'dog_name', 'dog_breed', 'dog_bdate', 'dog_adopt', 'sick', 'sick_text', 'time')

admin.site.register(Peoples, PeoplesAdmin)
