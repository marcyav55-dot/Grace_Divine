from rest_framework import serializers
from .models import ServiceSlide, Article, PageVisit, PushSubscription


class ServiceSlideSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les slides du carrousel."""
    class Meta:
        model = ServiceSlide
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les articles de blog."""
    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'excerpt', 'content', 'image', 'author', 'published_at']


class PushSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PushSubscription
        fields = ['id', 'endpoint', 'p256dh', 'auth']
