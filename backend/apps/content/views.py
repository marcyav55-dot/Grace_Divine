from rest_framework import viewsets, permissions
from .models import ServiceSlide
from .serializers import ServiceSlideSerializer

class ServiceSlideViewSet(viewsets.ModelViewSet):
    """API pour gérer les slides (Lecture libre, Modification admin)."""
    queryset = ServiceSlide.objects.filter(is_active=True)
    serializer_class = ServiceSlideSerializer
    # Permet la lecture à tous, mais restreint l'édition aux admins
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] 
