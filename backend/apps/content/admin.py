from django.contrib import admin
from django.db.models import Count
from django.db.models.functions import TruncDate
from .models import ServiceSlide, Article, PageVisit


@admin.register(ServiceSlide)
class ServiceSlideAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("title",)


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "is_published", "published_at", "created_at")
    list_filter = ("is_published",)
    search_fields = ("title", "content")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(PageVisit)
class PageVisitAdmin(admin.ModelAdmin):
    list_display = ("path", "visited_at", "ip_address")
    list_filter = ("path",)
    date_hierarchy = "visited_at"
    search_fields = ("path", "ip_address")

    change_list_template = "admin/pagevisit_changelist.html"

    # Seul un superuser voit ce modèle dans l'admin
    def has_module_permission(self, request):
        return request.user.is_superuser

    def has_view_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_add_permission(self, request):
        return False  # les visites ne se créent que via le middleware

    def has_change_permission(self, request, obj=None):
        return False  # lecture seule

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context["total_visits"] = PageVisit.objects.count()
        extra_context["top_pages"] = (
            PageVisit.objects.values("path")
            .annotate(total=Count("id"))
            .order_by("-total")[:10]
        )
        extra_context["visits_by_day"] = (
            PageVisit.objects.annotate(day=TruncDate("visited_at"))
            .values("day")
            .annotate(total=Count("id"))
            .order_by("-day")[:14]
        )
        return super().changelist_view(request, extra_context=extra_context)
