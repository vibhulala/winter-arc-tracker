from django.urls import path

from .views import (
    target_list,
    delete_target,
    update_target,
    signup,
    login_user,
    logout_user,
    current_user,
    daily_history,
    streak_data,
)


urlpatterns = [

    path("targets/", target_list),

    path("targets/<int:target_id>/update/", update_target),

    path("targets/<int:target_id>/", update_target),

    path("targets/<int:target_id>/delete/", delete_target),

    path("auth/signup/", signup),
    path("auth/login/", login_user),
    path("auth/logout/", logout_user),
    path("auth/me/", current_user),

    path("history/", daily_history),

    path("streak/", streak_data),
]