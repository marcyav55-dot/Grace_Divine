from django.db import models
from django.utils.text import slugify


class ServiceSlide(models.Model):
    """
    Modèle pour gérer les slides dynamiques de la page d'accueil.
    """
    title = models.CharField(max_length=200, verbose_name="Titre")
    description = models.TextField(verbose_name="Description")
    image = models.ImageField(upload_to='slides/', verbose_name="Image du slide")
    is_active = models.BooleanField(default=True, verbose_name="Actif")
    order = models.PositiveIntegerField(default=0, verbose_name="Ordre d'affichage")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Slide de Service"

    def __str__(self):
        return self.title


class Article(models.Model):
    """Article de blog."""
    title = models.CharField(max_length=200, verbose_name="Titre")
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    excerpt = models.CharField(max_length=300, verbose_name="Résumé court", blank=True)
    content = models.TextField(verbose_name="Contenu")
    image = models.ImageField(upload_to='articles/', verbose_name="Image de couverture", blank=True, null=True)
    author = models.CharField(max_length=100, default="Maison Grâce Divine")
    is_published = models.BooleanField(default=False, verbose_name="Publié")
    created_at = models.DateTimeField(auto_now_add=True)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-published_at', '-created_at']
        verbose_name = "Article de blog"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if self.is_published and not self.published_at:
            from django.utils import timezone
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class PageVisit(models.Model):
    """Enregistre chaque visite de page pour les statistiques (visible admin uniquement)."""
    path = models.CharField(max_length=255, verbose_name="Page visitée")
    visited_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=300, blank=True)

    class Meta:
        ordering = ['-visited_at']
        verbose_name = "Visite de page"
        verbose_name_plural = "Visites de page"

    def __str__(self):
        return f"{self.path} — {self.visited_at:%d/%m/%Y %H:%M}"
