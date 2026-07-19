from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    """API pour gérer les produits et services."""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # Filtres de recherche pour le frontend
    filterset_fields = ['category', 'is_service'] 
    search_fields = ['name', 'description']
