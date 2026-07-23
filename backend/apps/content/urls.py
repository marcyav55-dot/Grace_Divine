from rest_framework.routers import DefaultRouter
from .views import ServiceSlideViewSet, ArticleViewSet

router = DefaultRouter()
router.register(r'slides', ServiceSlideViewSet)       # /api/content/slides/
router.register(r'articles', ArticleViewSet)          # /api/content/articles/

urlpatterns = router.urls
