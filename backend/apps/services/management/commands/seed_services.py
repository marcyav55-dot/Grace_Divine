import requests
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from apps.services.models import Category, Product

# Services à créer (nouveaux) ou mettre à jour avec une image (existants)
SERVICES = [
    {
        "name": "Site Web Vitrine",
        "cat_slug": "web", "cat_name": "Conception de Sites Web",
        "img": "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    },
    {
        "name": "Forage Standard",
        "cat_slug": "forage", "cat_name": "Forage et Hydraulique",
        "img": "https://images.unsplash.com/photo-1760873059715-7c7cfbe2a2c6?w=800&q=80",
    },
    {
        "name": "Impression de Mémoires",
        "cat_slug": "impression-memoires", "cat_name": "Impression de Mémoires",
        "desc": "Impression, reliure et mise en forme de mémoires de fin d'études pour les finalistes de l'UNIKOL et d'ailleurs.",
        "price": "10.00",
        "img": "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
    },
    {
        "name": "Assistance Travaux Scientifiques",
        "cat_slug": "assistance-scientifique", "cat_name": "Assistance Travaux Scientifiques",
        "desc": "Rédaction, correction et mise en page de mémoires, TFC et rapports de stage pour étudiants et chercheurs.",
        "price": "15.00",
        "img": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    },
    {
        "name": "Zone WiFi du Campus",
        "cat_slug": "wifi-campus", "cat_name": "Zone WiFi du Campus",
        "desc": "Connexion internet illimitée et sécurisée pour les étudiants, à la demi-journée, journée ou semaine.",
        "price": "0.50",
        "img": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    },
]


class Command(BaseCommand):
    help = "Crée/complète les services avec de vraies images."

    def handle(self, *args, **options):
        for item in SERVICES:
            category, _ = Category.objects.get_or_create(
                slug=item["cat_slug"],
                defaults={"name": item["cat_name"]},
            )

            product, created = Product.objects.get_or_create(
                name=item["name"],
                defaults={
                    "description": item.get("desc", ""),
                    "price": item.get("price", "0.00"),
                    "category": category,
                    "is_service": True,
                },
            )

            if not created and not product.category_id:
                product.category = category
                product.save()

            if product.image:
                self.stdout.write(self.style.WARNING(f"Image déjà présente : {item['name']}"))
                continue

            try:
                response = requests.get(item["img"], timeout=15)
                response.raise_for_status()
            except requests.exceptions.RequestException as e:
                self.stdout.write(self.style.ERROR(f"Image indisponible pour {item['name']} : {e}"))
                continue

            filename = item["name"].lower().replace(" ", "_") + ".jpg"
            product.image.save(filename, ContentFile(response.content), save=True)

            action = "Créé" if created else "Complété (image ajoutée)"
            self.stdout.write(self.style.SUCCESS(f"{action} : {item['name']}"))
