from .models import PageVisit


class VisitTrackerMiddleware:
    """Enregistre chaque requête GET vers une page (hors admin et API) dans PageVisit."""

    IGNORED_PREFIXES = ("/admin", "/api", "/static", "/media", "/favicon.ico")

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        if request.method == "GET" and not request.path.startswith(self.IGNORED_PREFIXES):
            try:
                PageVisit.objects.create(
                    path=request.path,
                    ip_address=self._get_client_ip(request),
                    user_agent=request.META.get("HTTP_USER_AGENT", "")[:300],
                )
            except Exception:
                pass  # on ne bloque jamais une requête à cause du tracking

        return response

    def _get_client_ip(self, request):
        forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return request.META.get("REMOTE_ADDR")
