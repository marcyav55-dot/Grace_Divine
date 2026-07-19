from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les services/produits."""
    category = CategorySerializer(read_only=True) # Lecture imbriquée de la catégorie
    
    class Meta:
        model = Product
        fields = '__all__'
