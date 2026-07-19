from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    """Vue pour l'inscription des utilisateurs."""
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,) # Tout le monde peut s'inscrire
    serializer_class = RegisterSerializer

class ProfileView(generics.RetrieveAPIView):
    """Vue pour récupérer le profil de l'utilisateur connecté."""
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
