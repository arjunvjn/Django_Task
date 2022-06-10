from rest_framework import serializers
from .models import Books,MyUser

class LibSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = "__all__"

class AdminReg(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields= ('first_name','last_name','email','password')

    def create(self, validated_data):
        user = MyUser.objects.create(
            first_name=validated_data['first_name'],last_name=validated_data['last_name'],email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()