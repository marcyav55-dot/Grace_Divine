import pytest
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

# Django settings for testing
pytest.DjangoPlugin.__settings__ = {
    'DEBUG': False,
    'ALLOWED_HOSTS': ['localhost', '127.0.0.1'],
    'SECRET_KEY': 'test-secret-key',
    'DATABASES': {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': ':memory:'
        }
    }
}

# Create test database tables automatically for all tests
@pytest.fixture(scope='session')
def django_db_setup(django_db_block):
    pass

# Helper functions for test setup
def create_user(username='testuser', email='test@example.com', password='testpass123', role='client'):
    User = get_user_model()
    return User.objects.create_user(username=username, email=email, password=password, role=role)


def api_client():
    from rest_framework.test import APIClient
    return APIClient()
