# from django.shortcuts import render
# from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from ..serializers import ImageSerializer, ProductSerializer
# from .products import products
from ..models import Product
from ..models import ProductImage


# Create your views here.


@api_view(["GET"])
def getProducts(request):
    search_parameters = request.query_params.get("keyword")
    # print('-------------', search_parameters)
    if search_parameters == None:
        search_parameters = ""
    products = Product.objects.filter(name__icontains=search_parameters) or Product.objects.filter(category__icontains=search_parameters)
    # many=True when we have multiple items
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getProductById(request, pk):
    product = Product.objects.get(_id=pk)
    images = ProductImage.objects.filter(product=product)
    # many=False when we have single item
    serializer = ProductSerializer(product, many=False)
    image_serializer = ImageSerializer(images, many=True)
    images = [x["images"] for x in image_serializer.data]
    product_data = serializer.data
    product_data["image"] = product_data["image"].split(sep=None) + images
    return Response(product_data)
    # for product in products:
    #     if product["_id"] == pk:
    #         return Response(product)


@api_view(["GET"])
def getTopRatedProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by(
        "-rating")[0:5]  # Top 5 Products
    # many=True when we have multiple items
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name="Sample Name",
        category="Sample Category",
        description="",
        price=0,
        countInStock=0,
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    product = Product.objects.get(_id=pk)
    data = request.data

    product.name = data["name"]
    product.category = data["category"]
    product.description = data["description"]
    product.price = data["price"]
    product.countInStock = data["countInStock"]

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response("Product has been deleted")


@api_view(["POST"])
def uploadProductImage(request):
    data = request.data

    product_id = data["product_id"]

    product = Product.objects.get(_id=product_id)

    try:
        product.image = request.FILES.get("image")
    except UnicodeDecodeError:
        pass

    product.save()

    return Response("Image has been uploaded")
