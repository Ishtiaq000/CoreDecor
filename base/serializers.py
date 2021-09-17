"""
To convert data from database model to JSON
"""
from django.db.models import fields
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Product, ProductImage, Order, ShippingAddress, OrderItem


class UserSerializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField(read_only=True)  # To use get_name

    # To use get__id, because in the frontend we are using _id
    _id = serializers.SerializerMethodField(read_only=True)

    # To use get_isAdmin, because in the frontend we are using isAdmin
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        # Fields to return, can be ['name', 'price'] .etc.
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):  # get in get_name is not a part of field it's just a Django convention
        name = obj.first_name
        if name == "":
            name = obj.email
        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'  # Fields to return, can be ['name', 'price'] .etc.


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'  # Fields to return, can be ['name', 'price'] .etc.


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'  # Fields to return, can be ['name', 'price'] .etc.


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'  # Fields to return, can be ['name', 'price'] .etc.


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'  # Fields to return, can be ['name', 'price'] .etc.

    def get_orderItems(self, obj):
        # Reverse lookup, OneToManyField | https://stackoverflow.com/questions/17328910/django-what-is-reverse-relationship
        items = obj.orderitem_set.all()
        # _set | https://stackoverflow.com/questions/42080864/set-in-django-for-a-queryset
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            # OneToOneField that's why we are able to access it like this
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data  # Reverse lookup, OneToOneField
        except:
            address = False

        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
