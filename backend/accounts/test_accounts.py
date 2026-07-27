from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()

class UserRegistrationTests(APITestCase):
    """Tests pour l'inscription des utilisateurs"""

    def setUp(self):
        self.client = Client()
        self.register_url = reverse('api/auth:register')
        self.valid_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpass123',
            'role': 'client'
        }

    def test_user_registration_success(self):
        """Test inscription utilisateur réussie"""
        response = self.client.post(self.register_url, self.valid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='testuser').exists())
        user = User.objects.get(username='testuser')
        self.assertEqual(user.role, 'client')
        self.assertTrue(user.check_password('testpass123'))

    def test_user_registration_missing_field(self):
        """Test inscription avec champ manquant"""
        invalid_data = self.valid_data.copy()
        invalid_data.pop('email')
        response = self.client.post(self.register_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_registration_duplicate(self):
        """Test inscription utilisateur dupliqué"""
        User.objects.create_user(
            username='existing',
            email='existing@example.com',
            password='existingpass',
            role='client'
        )
        duplicate_data = self.valid_data.copy()
        duplicate_data['username'] = 'existing'
        duplicate_data['email'] = 'existing@example.com'
        response = self.client.post(self.register_url, duplicate_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class UserAuthenticationTests(APITestCase):
    """Tests pour l'authentification JWT"""

    def setUp(self):
        self.client = Client()
        self.register_url = reverse('api/auth:register')
        self.login_url = reverse('api/auth:token_obtain_pair')
        self.user = User.objects.create_user(
            username='authuser',
            email='auth@example.com',
            password='authpass123',
            role='client'
        )

    def test_user_login_success(self):
        """Test connexion utilisateur réussie"""
        data = {
            'username': 'authuser',
            'password': 'authpass123'
        }
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_user_login_invalid_credentials(self):
        """Test connexion avec identifiants invalides"""
        data = {
            'username': 'authuser',
            'password': 'wrongpass'
        }
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_protected_endpoint_access(self):
        """Test accès endpoint protégé avec JWT"""
        login_response = self.client.post(self.login_url, {
            'username': 'authuser',
            'password': 'authpass123'
        }, format='json')
        token = login_response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        profile_url = reverse('api/auth:profile')
        response = self.client.get(profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'authuser')

    def test_protected_endpoint_without_auth(self):
        """Test accès endpoint protégé sans authentification"""
        profile_url = reverse('api/auth:profile')
        response = self.client.get(profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
