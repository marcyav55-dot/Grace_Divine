from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.orders.models import Order
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()

class OrderTests(TestCase):
    """Tests pour les commandes"""

    def setUp(self):
        self.user = User.objects.create_user(
            username='clientuser',
            email='client@example.com',
            password='clientpass123',
            role='client'
        )
        self.client.force_login(self.user)
        self.order_data = {
            'user': self.user.id,
            'total_price': '150.00'
        }

    def test_create_order(self):
        """Test création commande réussie"""
        response = self.client.post(reverse('orders:order-list'), self.order_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.filter(user=self.user).exists(), True)
        order = Order.objects.get(user=self.user)
        self.assertEqual(order.status, 'pending')
        self.assertEqual(order.total_price, 150.00)

    def test_order_requires_authentication(self):
        """Test création commande sans authentification"""
        self.client.logout()
        response = self.client.post(reverse('orders:order-list'), self.order_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_order_status_update(self):
        """Test mise à jour du statut d'une commande"""
        order = Order.objects.create(
            user=self.user,
            total_price=100.00,
            status='pending'
        )
        url = reverse('orders:order-detail', kwargs={'pk': order.id})
        update_data = {'status': 'confirmed'}
        response = self.client.patch(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        order.refresh_from_db()
        self.assertEqual(order.status, 'confirmed')

    def test_order_list_for_user(self):
        """Test liste des commandes pour l'utilisateur connecté"""
        # Créer plusieurs commandes
        Order.objects.create(user=self.user, total_price=100.00, status='pending')
        Order.objects.create(user=self.user, total_price=200.00, status='confirmed')
        Order.objects.create(
            user=User.objects.create_user(username='other', email='other@example.com', password='pass'),
            total_price=50.00
        )
        response = self.client.get(reverse('orders:order-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_order_total_price_validation(self):
        """Test validation du prix total"""
        invalid_data = self.order_data.copy()
        invalid_data['total_price'] = 'invalid'
        response = self.client.post(reverse('orders:order-list'), invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
