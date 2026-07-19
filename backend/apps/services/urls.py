from rest_framework.routers import DefaultRouter
from .views import ProductViewSet

router = DefaultRouter()
router.register(r'list', ProductViewSet) # Route : /api/services/list/

urlpatterns = router.urls
