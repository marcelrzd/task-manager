from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('name', 'task_type', 'due_date')
    list_filter = ('task_type',)
    search_fields = ('name', 'description')
