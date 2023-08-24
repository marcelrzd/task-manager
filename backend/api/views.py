from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import status
from django.middleware.csrf import get_token
from django.http import JsonResponse


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

class ManageTasks(APIView):

    # Handle the GET request to list tasks
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

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
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
