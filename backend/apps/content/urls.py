from rest_framework.routers import DefaultRouter
from .views import ServiceSlideViewSet, ArticleViewSet, PushSubscriptionViewSet

router = DefaultRouter()
router.register(r'slides', ServiceSlideViewSet)       # /api/content/slides/
router.register(r'articles', ArticleViewSet)          # /api/content/articles/
router.register(r'push-subscriptions', PushSubscriptionViewSet)  # /api/content/push-subscriptions/

urlpatterns = router.urls
