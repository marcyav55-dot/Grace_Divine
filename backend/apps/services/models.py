from django.db import models

class Category(models.Model):
    """Catégories de produits ou services."""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    """Produits ou services offerts."""
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    image = models.ImageField(upload_to='products/')
    is_service = models.BooleanField(default=False) # True si c'est un service comme le forage

    def __str__(self):
        return self.name
