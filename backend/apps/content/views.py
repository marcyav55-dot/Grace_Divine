from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import ServiceSlide, Article, PushSubscription
from .serializers import ServiceSlideSerializer, ArticleSerializer, PushSubscriptionSerializer


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


class PushSubscriptionViewSet(viewsets.ModelViewSet):
    """API pour enregistrer les abonnements aux notifications push."""
    queryset = PushSubscription.objects.all()
    serializer_class = PushSubscriptionSerializer
    permission_classes = [permissions.AllowAny]  # tout visiteur peut s'abonner

    def create(self, request, *args, **kwargs):
        # Évite les doublons : si l'endpoint existe déjà, on le renvoie tel quel
        endpoint = request.data.get("endpoint")
        existing = PushSubscription.objects.filter(endpoint=endpoint).first()
        if existing:
            serializer = self.get_serializer(existing)
            return Response(serializer.data, status=200)
        return super().create(request, *args, **kwargs)
