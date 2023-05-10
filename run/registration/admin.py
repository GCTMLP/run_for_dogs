from django.contrib import admin
import csv
from django.http import HttpResponse
from datetime import datetime
from rangefilter.filters import DateRangeFilterBuilder, DateTimeRangeFilterBuilder, NumericRangeFilterBuilder

from .models import Peoples
def export_to_csv(modeladmin, request, queryset):
    opts = modeladmin.model._meta
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename={}.csv'.format(opts.verbose_name)
    writer = csv.writer(response)
    fields = [field for field in opts.get_fields() if not field.many_to_many and not field.one_to_many]
    # Write a first row with header information
    writer.writerow([field.verbose_name for field in fields])
    # Write data rows
    for obj in queryset:
        data_row = []
        for field in fields:
            value = getattr(obj, field.name)
            if isinstance(value, bool):
                value = 1 if value == True else 0
            if isinstance(value, datetime):
                value = value.strftime('%d/%m/%Y %H:%M:%S')
            data_row.append(value)
        writer.writerow(data_row)
    return response
export_to_csv.short_description = 'Export to CSV'




#@admin.register(Peoples)
class PeoplesAdmin(admin.ModelAdmin):
    #pass
    #model = Peoples
    list_display = ('id', 'name', 'surname', 'bdate', 'sex', 'phone', 'email', 'size_of_tshirt', 'with_dog', 'dog_name', 'dog_breed', 'dog_bdate', 'dog_adopt', 'sick', 'sick_text', 'time')
    actions = [export_to_csv]
    list_filter = (
        (
            "time",
            DateTimeRangeFilterBuilder(
                title="Custom title",
                default_start=datetime(2020, 1, 1),
                default_end=datetime(2030, 1, 1),
            ),
        ),
    )
admin.site.register(Peoples, PeoplesAdmin)


