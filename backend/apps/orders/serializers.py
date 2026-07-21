from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les commandes."""
    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ('created_at',)
