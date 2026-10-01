import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from datetime import timedelta
from .models import Target, TargetCompletion


# =========================================================
# TARGET APIs
# =========================================================

@csrf_exempt
def target_list(request):

    # GET → return all targets of logged-in user
    if request.method == "GET":

        if not request.user.is_authenticated:
            return JsonResponse(
                {"error": "Authentication required"},
                status=401
            )

        targets = Target.objects.filter(user=request.user)

        data = []

        for target in targets:
            data.append({
                "id": target.id,
                "name": target.name,
                "completed": target.completed,
            })

        return JsonResponse(data, safe=False)

    # POST → create target for logged-in user
    if request.method == "POST":

        if not request.user.is_authenticated:
            return JsonResponse(
                {"error": "Authentication required"},
                status=401
            )

        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse(
                {"error": "Invalid JSON"},
                status=400
            )

        name = data.get("name")

        if not name:
            return JsonResponse(
                {"error": "Target name is required"},
                status=400
            )

        target = Target.objects.create(
            user=request.user,
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


# =========================================================
# DELETE TARGET
# =========================================================

@csrf_exempt
def delete_target(request, target_id):

    if request.method == "DELETE":

        if not request.user.is_authenticated:
            return JsonResponse(
                {"error": "Authentication required"},
                status=401
            )

        try:
            target = Target.objects.get(
                id=target_id,
                user=request.user
            )

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


# =========================================================
# UPDATE TARGET
# =========================================================

@csrf_exempt
def update_target(request, target_id):

    if not request.user.is_authenticated:
        return JsonResponse(
            {"error": "Authentication required"},
            status=401
        )

    try:
        target = Target.objects.get(
            id=target_id,
            user=request.user
        )

    except Target.DoesNotExist:
        return JsonResponse(
            {"error": "Target not found"},
            status=404
        )

    # =====================================================
    # DELETE
    # =====================================================

    if request.method == "DELETE":

        target.delete()

        return JsonResponse({
            "message": "Target deleted successfully"
        })

    # =====================================================
    # PATCH
    # =====================================================

    if request.method == "PATCH":

        try:
            data = json.loads(request.body)

        except json.JSONDecodeError:
            return JsonResponse(
                {"error": "Invalid JSON"},
                status=400
            )

        if "name" in data:
            target.name = data["name"]

        if "completed" in data:

            target.completed = data["completed"]

            today = timezone.localdate()

            TargetCompletion.objects.update_or_create(
                target=target,
                date=today,
                defaults={
                    "completed": data["completed"]
                }
            )

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

# =========================================================
# DAILY COMPLETION HISTORY
# =========================================================

def daily_history(request):

    if not request.user.is_authenticated:
        return JsonResponse(
            {"error": "Authentication required"},
            status=401
        )

    today = timezone.localdate()

    completions = TargetCompletion.objects.filter(
        target__user=request.user
    ).select_related("target").order_by("-date")

    data = []

    for completion in completions:

        data.append({
            "target_id": completion.target.id,
            "target_name": completion.target.name,
            "date": str(completion.date),
            "completed": completion.completed
        })

    return JsonResponse({
        "today": str(today),
        "history": data
    })


# =========================================================
# SIGNUP
# =========================================================

@csrf_exempt
def signup(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Method not allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "Invalid JSON"},
            status=400
        )

    username = data.get("username", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "")

    if not username:
        return JsonResponse(
            {"error": "Username is required"},
            status=400
        )

    if not password:
        return JsonResponse(
            {"error": "Password is required"},
            status=400
        )

    if len(password) < 6:
        return JsonResponse(
            {"error": "Password must be at least 6 characters"},
            status=400
        )

    if User.objects.filter(username=username).exists():
        return JsonResponse(
            {"error": "Username already exists"},
            status=400
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return JsonResponse({
        "message": "User created successfully",
        "username": user.username
    }, status=201)


# =========================================================
# LOGIN
# =========================================================

@csrf_exempt
def login_user(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Method not allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "Invalid JSON"},
            status=400
        )

    username = data.get("username")
    password = data.get("password")

    user = authenticate(
        request,
        username=username,
        password=password
    )

    if user is None:
        return JsonResponse(
            {"error": "Invalid username or password"},
            status=401
        )

    login(request, user)

    return JsonResponse({
        "message": "Login successful",
        "username": user.username
    })


# =========================================================
# LOGOUT
# =========================================================

@csrf_exempt
def logout_user(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Method not allowed"},
            status=405
        )

    logout(request)

    return JsonResponse({
        "message": "Logout successful"
    })


# =========================================================
# CURRENT USER
# =========================================================

def current_user(request):

    if not request.user.is_authenticated:
        return JsonResponse(
            {"authenticated": False},
            status=401
        )

    return JsonResponse({
        "authenticated": True,
        "username": request.user.username
    })


# =========================================================
# STREAK API
# =========================================================

# =========================================================
# STREAK API
# =========================================================

def streak_data(request):

    # ---------------------------------------------------------
    # Authentication
    # ---------------------------------------------------------

    if not request.user.is_authenticated:
        return JsonResponse(
            {"error": "Authentication required"},
            status=401
        )

    today = timezone.localdate()

    # ---------------------------------------------------------
    # Get current user's targets
    # ---------------------------------------------------------

    targets = Target.objects.filter(
        user=request.user
    )

    today_total = targets.count()

    # ---------------------------------------------------------
    # No targets
    # ---------------------------------------------------------

    if today_total == 0:
        return JsonResponse({
            "today": str(today),
            "today_completed": 0,
            "today_total": 0,
            "today_percentage": 0,
            "today_success": False,
            "current_streak": 0,
            "best_streak": 0
        })

    # =========================================================
    # TODAY
    # =========================================================
    #
    # IMPORTANT:
    # Today's progress is calculated directly from Target.completed
    # so that the UI and streak calculation always match.
    # =========================================================

    today_completed = targets.filter(
        completed=True
    ).count()

    today_percentage = round(
        (today_completed / today_total) * 100
    )

    # 80% OR MORE = SUCCESSFUL DAY
    today_success = today_percentage >= 80

    # =========================================================
    # COMPLETION HISTORY
    # =========================================================

    completions = TargetCompletion.objects.filter(
        target__user=request.user
    ).select_related("target")

    # ---------------------------------------------------------
    # Group historical completion records by date
    # ---------------------------------------------------------

    daily_data = {}

    for completion in completions:

        date = completion.date

        if date not in daily_data:
            daily_data[date] = {
                "completed": 0,
                "total": 0
            }

        daily_data[date]["total"] += 1

        if completion.completed:
            daily_data[date]["completed"] += 1

    # =========================================================
    # SUCCESSFUL DAYS
    # =========================================================

    successful_days = set()

    # ---------------------------------------------------------
    # TODAY
    # ---------------------------------------------------------

    if today_success:
        successful_days.add(today)

    # ---------------------------------------------------------
    # PREVIOUS DAYS
    # ---------------------------------------------------------

    for date, data in daily_data.items():

        # Today is already calculated from current targets
        if date == today:
            continue

        if data["total"] == 0:
            continue

        percentage = (
            data["completed"] / data["total"]
        ) * 100

        # 80% OR MORE = SUCCESSFUL DAY
        if percentage >= 80:
            successful_days.add(date)

    # =========================================================
    # CURRENT STREAK
    # =========================================================

    current_streak = 0

    check_date = today

    while check_date in successful_days:

        current_streak += 1

        check_date = check_date - timedelta(days=1)

    # =========================================================
    # BEST STREAK
    # =========================================================

    best_streak = 0
    running_streak = 0

    if successful_days:

        sorted_days = sorted(successful_days)

        previous_day = None

        for date in sorted_days:

            if previous_day is not None:

                difference = (
                    date - previous_day
                ).days

                if difference == 1:
                    running_streak += 1

                else:
                    running_streak = 1

            else:
                running_streak = 1

            best_streak = max(
                best_streak,
                running_streak
            )

            previous_day = date

    # =========================================================
    # FINAL RESPONSE
    # =========================================================

    return JsonResponse({

        "today": str(today),

        "today_completed": today_completed,

        "today_total": today_total,

        "today_percentage": today_percentage,

        "today_success": today_success,

        "current_streak": current_streak,

        "best_streak": best_streak
    })