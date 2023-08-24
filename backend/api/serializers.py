from django.template.defaultfilters import date
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    formatted_due_date = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'task_type', 'due_date', 'formatted_due_date', 'label']

    def get_formatted_due_date(self, obj):
        # Using Django's date filter to format the date
        return date(obj.due_date, "m/d/Y")
