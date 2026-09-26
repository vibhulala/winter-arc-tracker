import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Target


@csrf_exempt
def target_list(request):

    # GET → return all targets
    if request.method == "GET":

        targets = Target.objects.all()

        data = []

        for target in targets:
            data.append({
                "id": target.id,
                "name": target.name,
                "completed": target.completed,
            })

        return JsonResponse(data, safe=False)

    # POST → create a new target
    if request.method == "POST":

        data = json.loads(request.body)

        name = data.get("name")

        if not name:
            return JsonResponse(
                {"error": "Target name is required"},
                status=400
            )

        target = Target.objects.create(
            name=name
        )

        return JsonResponse({
            "id": target.id,
            "name": target.name,
            "completed": target.completed,
        }, status=201)

    return JsonResponse(
        {"error": "Method not allowed"},
        status=405
    )


@csrf_exempt
def delete_target(request, target_id):

    # DELETE → delete a target
    if request.method == "DELETE":

        try:
            target = Target.objects.get(id=target_id)

        except Target.DoesNotExist:
            return JsonResponse(
                {"error": "Target not found"},
                status=404
            )

        target.delete()

        return JsonResponse({
            "message": "Target deleted successfully"
        })

    return JsonResponse(
        {"error": "Method not allowed"},
        status=405
    )
@csrf_exempt
def update_target(request, target_id):

    if request.method == "PATCH":

        try:
            target = Target.objects.get(id=target_id)

        except Target.DoesNotExist:
            return JsonResponse(
                {"error": "Target not found"},
                status=404
            )

        data = json.loads(request.body)

        if "name" in data:
            target.name = data["name"]

        if "completed" in data:
            target.completed = data["completed"]

        target.save()

        return JsonResponse({
            "id": target.id,
            "name": target.name,
            "completed": target.completed,
        })

    return JsonResponse(
        {"error": "Method not allowed"},
        status=405
    )