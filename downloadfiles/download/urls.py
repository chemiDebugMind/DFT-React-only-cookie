from django.urls import path
from .views import LoginView, registerView, logoutView, user, CookieTokenRefreshView,download
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('login/', LoginView.as_view(), name="login"),
    path('register/', registerView, name="register"),
     path('refresh-token/', CookieTokenRefreshView.as_view()),
    path('logout/', logoutView),
    path('user/', user),
    path('download/', download)

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
