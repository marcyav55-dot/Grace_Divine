from django.db import models

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
