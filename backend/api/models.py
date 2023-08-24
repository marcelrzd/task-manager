from django.db import models

class Task(models.Model):
    TASK_TYPES = (
        ('Work', 'Work'),
        ('Personal', 'Personal'),
        ('Health', 'Health'),
        ('Other', 'Other')
    )

    URGENT = 'Urgent'
    POSTPONED = 'Can be postponed'
    NOT_IMPORTANT = 'Not important'

    LABEL_CHOICES = [
        (URGENT, 'Urgent'),
        (POSTPONED, 'Can be postponed'),
        (NOT_IMPORTANT, 'Not important')
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    task_type = models.CharField(max_length=10, choices=TASK_TYPES)
    due_date = models.DateField(null=True, blank=True)
    label = models.CharField(
        max_length=20,
        choices=LABEL_CHOICES,
        default=NOT_IMPORTANT
    )  # Allowing tasks with no specific due date

    def __str__(self):
        return self.name
