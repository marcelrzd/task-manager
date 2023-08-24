from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import status

class ManageTasks(APIView):

    # Handle the GET request
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    # Handle the DELETE request
    def delete(self, request, task_id=None):
        if not task_id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        task = get_object_or_404(Task, id=task_id)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
