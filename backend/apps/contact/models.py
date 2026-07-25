from django.db import models

class ContactMessage(models.Model):
    nom = models.CharField(max_length=150)
    telephone = models.CharField(max_length=30)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.nom} - {self.created_at:%d/%m/%Y %H:%M}"
