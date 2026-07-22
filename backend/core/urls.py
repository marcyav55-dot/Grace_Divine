from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Routage principal du projet Grâce Divine Multiservices
urlpatterns = [
    # Administration Django
    path('admin/', admin.site.urls),
    
    # Points d'entrée API par application
    path('api/auth/', include('apps.accounts.urls')),      # Authentification et profils
    path('api/services/', include('apps.services.urls')),  # Produits et services
    path('api/content/', include('apps.content.urls')),    # Blog, slides et contenus
    path('api/orders/', include('apps.orders.urls')),      # Commandes et paiements
]

# Sert les fichiers médias (images uploadées) en développement
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
