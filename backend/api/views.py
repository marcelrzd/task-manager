from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import status
from django.middleware.csrf import get_token
from django.http import JsonResponse
from datetime import date, timedelta


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

class ManageTasks(APIView):

    # Handle the GET request to list tasks
    def get(self, request):
        tasks = Task.objects.all()

        # filter logic
        label_filter = request.GET.get('label', None)
        if label_filter:
            tasks = Task.objects.filter(label=label_filter)
        else:
            tasks = Task.objects.all()

        # Sorting logic
        sort_by = request.GET.get('sort', None)
        if sort_by and sort_by in ['due_date', '-due_date', 'task_type', '-task_type', 'label', '-label']:
            tasks = tasks.order_by(sort_by)

        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def get_label(self, obj):
        # Logic for Urgent label
        if obj.task_type == 'Work' and obj.due_date == date.today() + timedelta(days=1):
            return obj.URGENT
        elif obj.task_type == 'Health' and obj.due_date <= date.today() + timedelta(days=3) and "Treatment" not in obj.name:
            return obj.URGENT
        # Logic for Can be postponed label
        elif obj.task_type == 'Personal' and obj.due_date <= date.today() + timedelta(days=7):
            return obj.POSTPONED
        elif obj.task_type == 'Other' and obj.due_date <= date.today() + timedelta(days=5):
            return obj.POSTPONED
        elif obj.task_type == 'Work' and ( "PLO" in obj.name or "GJL" in obj.name) and obj.due_date <= date.today() + timedelta(days=30):
            return obj.POSTPONED
        # Logic for Not important label
        elif obj.due_date and obj.due_date > date.today() + timedelta(days=7):
            return obj.NOT_IMPORTANT
        elif obj.task_type == 'Other' and not obj.due_date:
            return obj.NOT_IMPORTANT
        else:
            return ''
        

    # Handle the DELETE request to delete a task
    def delete(self, request, task_id=None):
        if not task_id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        task = get_object_or_404(Task, id=task_id)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # Handle the POST request for creating a task
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            task = serializer.save()
            task.label = self.get_label(task)
            task.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
