from rest_framework import viewsets, permissions
from .models import ServiceSlide, Article
from .serializers import ServiceSlideSerializer, ArticleSerializer


class ServiceSlideViewSet(viewsets.ModelViewSet):
    """API pour gérer les slides (Lecture libre, Modification admin)."""
    queryset = ServiceSlide.objects.filter(is_active=True)
    serializer_class = ServiceSlideSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ArticleViewSet(viewsets.ModelViewSet):
    """API pour gérer les articles de blog (Lecture libre, Modification admin)."""
    queryset = Article.objects.filter(is_published=True)
    serializer_class = ArticleSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
