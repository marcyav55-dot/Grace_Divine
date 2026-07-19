from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les données utilisateur."""
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'phone')

class RegisterSerializer(serializers.ModelSerializer):
    """Sérialiseur pour l'inscription."""
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'role')
        extra_kwargs = {'password': {'write_only': True}} # Le mot de passe ne doit jamais être renvoyé en lecture

    def create(self, validated_data):
        # Création de l'utilisateur avec hachage du mot de passe
        user = User.objects.create_user(**validated_data)
        return user
