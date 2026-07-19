from rest_framework import serializers
from .models import ServiceSlide

class ServiceSlideSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les slides du carrousel."""
    class Meta:
        model = ServiceSlide
        fields = '__all__' # Expose tous les champs du modèle
