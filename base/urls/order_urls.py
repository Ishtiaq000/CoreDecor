"""This file is in charge of connecting views to the urls"""

from django.urls import path
from ..views import order_views as views


urlpatterns = [
    # api/orders/ - admin is authorized to see all the orders
    path("", views.getAllOrders, name="orders"),
    path("add/", views.addOrderItems, name="orders-add"),
    path("myorders/", views.getMyOrders, name="myorders"),
    path('delete/<str:pk>/', views.deleteOrder, name="order-delete"),
    path("<str:pk>/", views.getOrderById, name="user-order"),
    path("<str:pk>/pay/", views.updateOrderToPaid, name="order-paid"),
    path("<str:pk>/deliver/", views.updateOrderToDelivered, name="order-delivered"),
]
