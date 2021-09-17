"""This file is in charge of connecting views to the urls"""

from django.urls import path
from ..views import user_views as views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    # path('', views.getRoutes, name="routes"),
    path('', views.getUsers, name='users'),
    path('register/', views.registerUser, name='register'),
    path('profile/', views.getUserProfile, name='user-profile'),
    path('profile/update/', views.updateUserProfile, name='user-profile-update'),

    # Make sure that it is (userId) at down in hierarchy  because it can this register and profile etc as dynamic value
    path('<str:pk>/', views.getUserById, name='user'),

    path('update/<str:pk>/', views.updateUser, name='user-update'),
    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
]
