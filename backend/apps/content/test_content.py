from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse

from apps.content.models import ServiceSlide


class ServiceSlideTests(APITestCase):
    """Tests pour les diapositives de contenu"""

    def setUp(self):
        self.slide = ServiceSlide.objects.create(
            title="Bienvenue Grâce Divine",
            description="Présentation du service"
        )

    def test_slide_list(self):
        """Test récupération de la liste des slides"""

        url = reverse("serviceslide-list")

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_slide_detail(self):
        """Test récupération d'un slide précis"""

        url = reverse(
            "serviceslide-detail",
            kwargs={"pk": self.slide.id}
        )

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create_slide(self):
        """Test création d'un slide"""

        data = {
            "title": "Nouveau slide",
            "description": "Description test"
        }

        url = reverse("serviceslide-list")

        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
