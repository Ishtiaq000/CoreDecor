# from django import contrib
# from django.shortcuts import render
# from django.http import JsonResponse
from django.db.models import manager
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ..serializers import UserSerializer, UserSerializerWithToken


# Create your views here.


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html
    # https://github.com/jazzband/djangorestframework-simplejwt/blob/master/rest_framework_simplejwt/serializers.py

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for key, value in serializer.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# @api_view(["GET"])
# def getRoutes(request):
#     routes = [
#         '/api/products/',
#         '/api/products/create/',
#         '/api/products/upload/',
#         '/api/products/<id>/reviews/',
#         '/api/products/top/',
#         '/api/products/<id>/',
#         '/api/products/delete/<id>/',
#         '/api/products/<update>/<id>/',
#     ]
#     # return JsonResponse(routes, safe=False)  # With JsonResponse we need to use safe=False
#     return Response(routes)


@api_view(["POST"])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            # first_name is changing to name in serializer.py in get_name function
            first_name=data["name"],
            username=data["email"],
            email=data["email"],
            password=make_password(data["password"])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {"detail": "User with this email already exist"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    # many=True when we have multiple items
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])  # Check for user token
def getUserProfile(request):
    user = request.user
    # many=False when we have single item
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data

    user.first_name = data["name"]
    user.username = data["email"]
    user.email = data["email"]

    if data["password"] != "":
        user.password = make_password(data["password"])

    user.save()

    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response("User has been deleted")


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data["name"]
    user.username = data["email"]
    user.email = data["email"]

    # We can ask our newly joined employee to make a account and then we can update his/her account status to staff
    user.is_staff = data["isAdmin"]

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)
