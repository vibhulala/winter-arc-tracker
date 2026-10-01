from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include


def home(request):
    return JsonResponse({
        "message": "Winter Arc Tracker Backend is running",
        "status": "success",
        "api": "/api/",
        "admin": "/admin/"
    })


urlpatterns = [
    path("", home),
    path("admin/", admin.site.urls),
    path("api/", include("targets.urls")),
]