from rest_framework.routers import DefaultRouter
from .views import ServiceSlideViewSet

router = DefaultRouter()
router.register(r'slides', ServiceSlideViewSet) # Route : /api/content/slides/

urlpatterns = router.urls
