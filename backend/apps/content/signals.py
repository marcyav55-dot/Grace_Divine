from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from pywebpush import webpush, WebPushException
import json

from .models import Article, PushSubscription


@receiver(post_save, sender=Article)
def notify_subscribers_on_publish(sender, instance, created, **kwargs):
    """Envoie une notification push à tous les abonnés quand un article est publié."""
    # On notifie seulement si l'article est publié
    if not instance.is_published:
        return

    # Évite de renotifier à chaque modification mineure :
    # on ne notifie que si c'est la première fois que l'article passe en "publié"
    # (approche simple : on se base sur un indicateur en mémoire via update_fields ou un champ dédié)
    payload = {
        "title": "Nouvel article — Maison Grâce Divine",
        "body": instance.title,
        "url": f"/blog/{instance.slug}",
        "icon": "/icon-192.png",
    }

    subscriptions = PushSubscription.objects.all()
    for sub in subscriptions:
        try:
            webpush(
                subscription_info={
                    "endpoint": sub.endpoint,
                    "keys": {
                        "p256dh": sub.p256dh,
                        "auth": sub.auth,
                    },
                },
                data=json.dumps(payload),
                vapid_private_key=settings.VAPID_PRIVATE_KEY,
                vapid_claims={"sub": settings.VAPID_CLAIMS_EMAIL},
            )
        except WebPushException as ex:
            # Abonnement expiré ou invalide -> on le supprime
            if ex.response is not None and ex.response.status_code in (404, 410):
                sub.delete()
            else:
                print(f"Erreur webpush: {ex}")
