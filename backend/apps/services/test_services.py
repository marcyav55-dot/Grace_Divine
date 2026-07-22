from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.services.models import Category, Product
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()

class CategoryTests(APITestCase):
    """Tests pour les catégories"""

    def setUp(self):
        self.category_data = {
            'name': 'Forage',
            'slug': 'forage'
        }

    def test_create_category(self):
        """Test création catégorie réussie"""
        response = self.client.post(reverse('services:category-list'), self.category_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.filter(name='Forage').exists(), True)
        self.assertEqual(response.data['name'], 'Forage')

    def test_create_category_duplicate_slug(self):
        """Test création catégorie avec slug dupliqué"""
        Category.objects.create(name='Forage exist', slug='forage')
        response = self.client.post(reverse('services:category-list'), self.category_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_category_list(self):
        """Test liste des catégories"""
        Category.objects.create(name='Forage', slug='forage')
        Category.objects.create(name='Entretien', slug='entretien')
        response = self.client.get(reverse('services:category-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

class ProductTests(APITestCase):
    """Tests pour les produits/services"""

    def setUp(self):
        self.category = Category.objects.create(name='Forage', slug='forage')
        self.product_data = {
            'name': 'Forage professionnel',
            'description': 'Service de forage de puits',
            'price': '150.00',
            'category': self.category.id,
            'is_service': True
        }

    def test_create_product(self):
        """Test création produit réussie"""
        response = self.client.post(reverse('services:product-list'), self.product_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.filter(name='Forage professionnel').exists(), True)
        product = Product.objects.get(name='Forage professionnel')
        self.assertEqual(product.category, self.category)
        self.assertEqual(product.is_service, True)

    def test_product_price_validation(self):
        """Test validation du prix du produit"""
        invalid_data = self.product_data.copy()
        invalid_data['price'] = 'invalid'
        response = self.client.post(reverse('services:product-list'), invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_product_list_filtered_by_category(self):
        """Test liste de produits filtrée par catégorie"""
        category2 = Category.objects.create(name='Entretien', slug='entretien')
        Product.objects.create(
            name='Forage pro',
            description='Forage',
            price='100.00',
            category=self.category,
            is_service=True
        )
        Product.objects.create(
            name='Entretien pro',
            description='Entretien',
            price='200.00',
            category=category2,
            is_service=False
        )
        response = self.client.get(reverse('services:product-list'), {'category': self.category.slug})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Forage pro')
