from django.db import models

class Task(models.Model):
    TASK_TYPES = (
        ('Work', 'Work'),
        ('Personal', 'Personal'),
        ('Health', 'Health'),
        ('Other', 'Other')
    )

    name = models.CharField(max_length=255)
    description = models.TextField()
    task_type = models.CharField(max_length=10, choices=TASK_TYPES)
    due_date = models.DateField(null=True, blank=True)  # Allowing tasks with no specific due date

    def __str__(self):
        return self.name
