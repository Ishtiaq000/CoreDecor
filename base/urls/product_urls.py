"""This file is in charge of connecting views to the urls"""

from django.urls import path
from ..views import product_views as views


urlpatterns = [
    path('', views.getProducts, name="products"),
    path('top/', views.getTopRatedProducts, name="top-products"),
    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadProductImage, name="image-upload"),
    path('<str:pk>/', views.getProductById, name="product"),
    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
]
