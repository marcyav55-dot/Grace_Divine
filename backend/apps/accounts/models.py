from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Modèle utilisateur étendu pour gérer les rôles (Client, Vendeur, Employé).
    """
    ROLE_CHOICES = (
        ('client', 'Client'),
        ('seller', 'Vendeur'),
        ('employee', 'Employé'),
        ('admin', 'Administrateur'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='client')
    phone = models.CharField(max_length=15, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)

    def __str__(self):
        return self.username
