from django.urls import path

from .views import (
    target_list,
    delete_target,
    update_target,
)


urlpatterns = [

    path(
        "targets/",
        target_list,
    ),

    path(
        "targets/<int:target_id>/",
        update_target,
    ),

    path(
        "targets/<int:target_id>/delete/",
        delete_target,
    ),

]