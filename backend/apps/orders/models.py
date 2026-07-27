from django.db import models

class Order(models.Model):
    """Gestion des commandes clients."""
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Commande {self.id} - {self.user.username}"
