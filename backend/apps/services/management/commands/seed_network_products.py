import requests
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from apps.services.models import Category, Product

PRODUCTS = [
    {
        "name": "Pince à sertir RJ45",
        "desc": "Pince professionnelle pour sertissage de câbles réseau RJ45/RJ11.",
        "price": "18.00",
        "img": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    },
    {
        "name": "Testeur de câble réseau (LAN Tester)",
        "desc": "Testeur de câble LAN pour vérifier la continuité et le câblage réseau.",
        "price": "15.00",
        "img": "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=800&q=80",
    },
    {
        "name": "Switch réseau 8 ports",
        "desc": "Commutateur réseau Ethernet 8 ports pour interconnexion locale.",
        "price": "35.00",
        "img": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    },
    {
        "name": "Connecteurs RJ45 (lot de 50)",
        "desc": "Lot de connecteurs RJ45 pour câblage réseau Ethernet.",
        "price": "8.00",
        "img": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    },
    {
        "name": "Batterie d'ordinateur portable",
        "desc": "Batterie de remplacement compatible pour ordinateurs portables.",
        "price": "45.00",
        "img": "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=800&q=80",
    },
    {
        "name": "Écran d'ordinateur 19\"",
        "desc": "Moniteur LED 19 pouces, idéal pour bureau ou poste de travail.",
        "price": "80.00",
        "img": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
    },
    {
        "name": "Chargeur d'ordinateur portable",
        "desc": "Chargeur/adaptateur secteur universel pour ordinateurs portables.",
        "price": "20.00",
        "img": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80",
    },
    {
        "name": "Mémoire RAM 8 Go DDR4",
        "desc": "Barrette de mémoire RAM 8 Go DDR4 pour ordinateur de bureau ou portable.",
        "price": "28.00",
        "img": "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=800&q=80",
    },
]


class Command(BaseCommand):
    help = "Ajoute des produits informatiques/réseau (pince à sertir, switch, RAM, etc.)"

    def handle(self, *args, **options):
        category, _ = Category.objects.get_or_create(
            slug="informatique",
            defaults={"name": "Informatique"},
        )

        created_count = 0
        failed = []

        for item in PRODUCTS:
            if Product.objects.filter(name=item["name"]).exists():
                self.stdout.write(self.style.WARNING(f"Ignoré (existe déjà) : {item['name']}"))
                continue

            try:
                response = requests.get(item["img"], timeout=15)
                response.raise_for_status()
            except requests.exceptions.RequestException as e:
                self.stdout.write(self.style.ERROR(f"Image indisponible pour {item['name']} : {e}"))
                failed.append(item["name"])
                continue

            product = Product(
                name=item["name"],
                description=item["desc"],
                price=item["price"],
                category=category,
                is_service=False,
            )
            filename = item["name"].lower().replace(" ", "_").replace("\"", "").replace("(", "").replace(")", "") + ".jpg"
            product.image.save(filename, ContentFile(response.content), save=True)

            created_count += 1
            self.stdout.write(self.style.SUCCESS(f"Créé : {item['name']}"))

        self.stdout.write(self.style.SUCCESS(f"\nTerminé : {created_count} produit(s) ajouté(s)."))
        if failed:
            self.stdout.write(self.style.WARNING(f"Échecs (image) : {', '.join(failed)}"))
