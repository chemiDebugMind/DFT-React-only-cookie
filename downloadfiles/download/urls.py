from django.urls import path
from .views import LoginView, registerView, logoutView

urlpatterns = [
    path('login/', LoginView.as_view(), name="login"),
    path('register/', registerView, name="register"),
    path('logout', logoutView)

]
