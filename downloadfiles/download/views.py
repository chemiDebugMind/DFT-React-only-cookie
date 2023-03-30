from django.shortcuts import render
from rest_framework import exceptions as rest_exceptions, response, decorators as rest_decorators, permissions as rest_permissions
from rest_framework_simplejwt import tokens, views as jwt_views, serializers as jwt_serializers, exceptions as jwt_exceptions
from django.contrib.auth.models import User
from django.middleware import csrf
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework import status
from .serializer import LoginSerializer, RegistrationSerializer, AccountSerializer
import os
from django.http import HttpResponse, JsonResponse
import threading
import zipfile
import requests
import socket
from rest_framework.response import Response
import base64
from django.conf import settings as django_settings
from django.core.files.storage import default_storage


def get_tokens_for_user(user):
    refresh = tokens.RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class LoginView(APIView):
    def post(self, request, format=None):
        data = request.data

        username = data.get('username', None)
        password = data.get('password', None)
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                data = get_tokens_for_user(user)
                res = response.Response()        

                res.set_cookie(
                    key = settings.SIMPLE_JWT['AUTH_COOKIE'], 
                    value = data["access"],
                    expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                    secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                )
                res.set_cookie(
                    key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                    value=data["refresh"],
                    expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                    secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                )

                res.data = {"Success" : "Login successfully","data":data}
                res["X-CSRFToken"]  = csrf.get_token(request)
                return res
            else:
                return response.Response({"No active" : "This account is not active!!"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return response.Response({"Invalid" : "Invalid emaill or password!!"}, status=status.HTTP_404_NOT_FOUND)
        
@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def registerView(request):
    serializer = RegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()

    if user is not None:
        return response.Response("Registered!")
    return rest_exceptions.AuthenticationFailed("Invalid credentials!")


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def logoutView(request):
    try:
        refreshToken = request.COOKIES.get(
            settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        token = tokens.RefreshToken(refreshToken)
        token.blacklist()

        res = response.Response()
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        res.delete_cookie("X-CSRFToken")
        res.delete_cookie("csrftoken")
        res["X-CSRFToken"]=None
        
        return res
    except:
        raise rest_exceptions.ParseError("Invalid token")
    

@rest_decorators.api_view(["GET"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def user(request):
    try:
        user = User.objects.get(id=request.user.id)
    except User.objects.DoesNotExist:
        return response.Response(status_code=404)

    serializer = AccountSerializer(user)
    return response.Response(serializer.data)


class CookieTokenRefreshSerializer(jwt_serializers.TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise jwt_exceptions.InvalidToken(
                'No valid token found in cookie \'refresh\'')


class CookieTokenRefreshView(jwt_views.TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=response.data['refresh'],
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )

            del response.data["refresh"]
        response["X-CSRFToken"] = request.COOKIES.get("csrftoken")
        return super().finalize_response(request, response, *args, **kwargs)
    

@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def download(request):
    if request.method == 'POST':
        input_url = request.data.get('urls')
        urls = input_url.split(',')
        threads = []
        download_folder = 'media'
        os.makedirs(download_folder, exist_ok=True)
        domain_url = request.scheme + "://" + request.get_host()
        file_paths = {}
        for url in urls:
            thread = threading.Thread(target=download_file, args=(url, download_folder,file_paths,domain_url))
            threads.append(thread)
            thread.start()

        for thread in threads:
            thread.join()
        return JsonResponse(file_paths, status=status.HTTP_200_OK)
        
    else:
        return JsonResponse("Something went wrong!", status=status.HTTP_404_NOT_FOUND)


def download_file(url, download_folder,file_paths,domain_url):
    response = requests.get(url,stream=True)
    file_name = os.path.basename(url)
    file_path = os.path.join(download_folder, file_name)
    with open(file_path, 'wb') as f:
        for data in response.iter_content(1024):
            f.write(data)
    file_paths[file_name] = domain_url + '/url' + settings.MEDIA_URL +  file_name
    return file_name
