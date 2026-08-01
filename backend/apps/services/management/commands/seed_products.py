import requests
from io import BytesIO
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from apps.services.models import Category, Product

PRODUCTS = [
    {
        "cat_slug": "informatique", "cat_name": "Informatique",
        "name": "Ordinateur Portable HP 15\"",
        "desc": "Laptop performant pour bureautique et études, 8 Go RAM, 256 Go SSD.",
        "price": "850.00",
        "img": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    },
    {
        "cat_slug": "informatique", "cat_name": "Informatique",
        "name": "Sac à dos scolaire renforcé",
        "desc": "Sac résistant pour étudiants, plusieurs compartiments, port USB intégré.",
        "price": "35.00",
        "img": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    },
    {
        "cat_slug": "informatique", "cat_name": "Informatique",
        "name": "Souris sans fil",
        "desc": "Souris ergonomique sans fil, autonomie longue durée.",
        "price": "12.00",
        "img": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
    },
    {
        "cat_slug": "informatique", "cat_name": "Informatique",
        "name": "Clé USB 64 Go",
        "desc": "Clé USB 3.0 haute vitesse, idéale pour le transfert de documents académiques.",
        "price": "9.00",
        "img": "https://images.unsplash.com/photo-1618410320928-25228d811631?w=800&q=80",
    },
    {
        "cat_slug": "habillement", "cat_name": "Habillement",
        "name": "T-shirt personnalisé",
        "desc": "T-shirt coton avec impression personnalisée, plusieurs couleurs disponibles.",
        "price": "20.00",
        "img": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    },
    {
        "cat_slug": "habillement", "cat_name": "Habillement",
        "name": "Casquette brodée",
        "desc": "Casquette avec logo brodé, ajustable, plusieurs coloris.",
        "price": "15.00",
        "img": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    },
    {
        "cat_slug": "habillement", "cat_name": "Habillement",
        "name": "Polo brodé professionnel",
        "desc": "Polo de qualité pour tenue professionnelle ou uniforme d'entreprise.",
        "price": "25.00",
        "img": "https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&q=80",
    },
    {
        "cat_slug": "habillement", "cat_name": "Habillement",
        "name": "Sweat à capuche",
        "desc": "Sweat confortable, coton épais, idéal pour la saison fraîche.",
        "price": "30.00",
        "img": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    },
]


class Command(BaseCommand):
    help = "Ajoute des produits de démonstration (informatique + habillement) avec de vraies images."

    def handle(self, *args, **options):
        created_count = 0
        for item in PRODUCTS:
            category, _ = Category.objects.get_or_create(
                slug=item["cat_slug"],
                defaults={"name": item["cat_name"]},
            )

            if Product.objects.filter(name=item["name"]).exists():
                self.stdout.write(self.style.WARNING(f"Ignoré (existe déjà) : {item['name']}"))
                continue

            product = Product(
                name=item["name"],
                description=item["desc"],
                price=item["price"],
                category=category,
                is_service=False,
            )

            response = requests.get(item["img"], timeout=15)
            response.raise_for_status()
            filename = item["name"].lower().replace(" ", "_").replace("\"", "") + ".jpg"
            product.image.save(filename, ContentFile(response.content), save=True)

            created_count += 1
            self.stdout.write(self.style.SUCCESS(f"Créé : {item['name']}"))

        self.stdout.write(self.style.SUCCESS(f"\nTerminé : {created_count} produit(s) ajouté(s)."))
