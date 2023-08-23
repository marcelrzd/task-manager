from rest_framework import serializers
from .models import Task
from datetime import date, timedelta

class TaskSerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [f.name for f in Task._meta.fields] + ['label']

    def get_label(self, obj):
        # Logic for Urgent label
        if obj.task_type == 'Work' and obj.due_date == date.today() + timedelta(days=1):
            return 'Urgent'
        elif obj.task_type == 'Health' and obj.due_date <= date.today() + timedelta(days=3) and "Treatment" not in obj.name:
            return 'Urgent'
        # Logic for Can be postponed label
        elif obj.task_type == 'Personal' and obj.due_date <= date.today() + timedelta(weeks=1):
            return 'Can be postponed'
        elif obj.task_type == 'Other' and obj.due_date <= date.today() + timedelta(days=5):
            return 'Can be postponed'
        elif obj.task_type == 'Work' and ( "PLO" in obj.name or "GJL" in obj.name) and obj.due_date <= date.today() + timedelta(weeks=4):
            return 'Can be postponed'
        # Logic for Not important label
        elif obj.due_date and obj.due_date > date.today() + timedelta(weeks=1):
            return 'Not important'
        elif obj.task_type == 'Other' and not obj.due_date:
            return 'Not important'
        else:
            return ''
