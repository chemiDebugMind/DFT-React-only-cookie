from django.urls import path
from .views import LoginView, registerView, logoutView, user, CookieTokenRefreshView

urlpatterns = [
    path('login/', LoginView.as_view(), name="login"),
    path('register/', registerView, name="register"),
     path('refresh-token/', CookieTokenRefreshView.as_view()),
    path('logout/', logoutView),
    path('user/', user)

]
