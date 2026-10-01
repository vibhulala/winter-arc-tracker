from django.db import models
from django.contrib.auth.models import User


class Target(models.Model):
    user = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    related_name="targets"
)

    name = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
class TargetCompletion(models.Model):
    target = models.ForeignKey(
        Target,
        on_delete=models.CASCADE,
        related_name="completions"
    )
    date = models.DateField()
    completed = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["target", "date"],
                name="unique_target_completion_per_day"
            )
        ]

    def __str__(self):
        return f"{self.target.name} - {self.date}"