Haan bhai. **Git commit se pehle Day 12 ke `.md` notes bana lete hain**, exactly jo humne aaj practically kiya hai uske basis par. Isko `DAY_12.md` naam se `DOCS` folder mein rakh sakte ho.

````md
# DAY 12 — React + Django Backend Integration

## 🎯 Day 12 Goal

Connect the React frontend of Winter Arc Tracker with a Django backend and database.

By the end of Day 12, the application should support:

- GET targets
- POST new targets
- PATCH target completion status
- DELETE targets
- React ↔ Django communication
- Database persistence

---

# 1. Django Backend Setup

Created the Django backend inside:

```text
WINTER-ARC TRACKER/
└── BACKEND/
````

Created Django project:

```bash
django-admin startproject config .
```

Django development server:

```bash
python manage.py runserver
```

Server:

```text
http://127.0.0.1:8000/
```

---

# 2. Django App

Created the `targets` app.

The app is responsible for handling target-related functionality.

Basic structure:

```text
BACKEND/
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   └── ...
│
├── targets/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── ...
│
└── manage.py
```

---

# 3. Target Model

Created a `Target` model containing:

```text
id
name
completed
```

Example database record:

```json
{
    "id": 2,
    "name": "DSA Practice",
    "completed": false
}
```

---

# 4. Database & Migration

Django's migration system was used to create/update database tables.

Basic commands:

```bash
python manage.py makemigrations
```

```bash
python manage.py migrate
```

Important concept:

```text
Model
  ↓
Migration
  ↓
Database Table
```

---

# 5. Django API Endpoints

Created API endpoints for target management.

## GET

```text
GET /api/targets/
```

Returns all targets.

Example:

```json
[
    {
        "id": 2,
        "name": "DSA Practice",
        "completed": false
    },
    {
        "id": 3,
        "name": "gym",
        "completed": false
    }
]
```

---

## POST

```text
POST /api/targets/
```

Used to create a new target.

Request:

```json
{
    "name": "Gym"
}
```

Django creates the target in the database.

---

## PATCH

```text
PATCH /api/targets/<id>/
```

Used to update an existing target.

Example:

```text
PATCH /api/targets/2/
```

Request:

```json
{
    "completed": true
}
```

This changes the target's completion status in the database.

---

## DELETE

```text
DELETE /api/targets/<id>/delete/
```

Used to permanently delete a target.

Example:

```text
DELETE /api/targets/3/delete/
```

---

# 6. Django URL Routing

Final routing:

```python
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
```

Routing flow:

```text
GET /api/targets/
        ↓
target_list()

POST /api/targets/
        ↓
target_list()

PATCH /api/targets/2/
        ↓
update_target()

DELETE /api/targets/2/delete/
        ↓
delete_target()
```

---

# 7. Postman API Testing

Postman was used to test the Django APIs before connecting everything to React.

Tested:

```text
GET
POST
PATCH
DELETE
```

For PATCH, we tested:

```json
{
    "completed": false
}
```

and verified the change using GET.

This confirmed that the Django database was actually being updated.

---

# 8. CORS Configuration

Configured CORS so that the React frontend could communicate with Django.

Architecture:

```text
React
localhost:5173
      │
      │ HTTP Request
      ↓
Django
127.0.0.1:8000
      │
      ↓
Database
```

Without proper CORS configuration, browser requests from React to Django can be blocked.

---

# 9. React → Django GET

React was connected to the Django GET API using `fetch()`.

```javascript
useEffect(() => {
    fetch('http://127.0.0.1:8000/api/targets/')
        .then((response) => response.json())
        .then((data) => {
            setTargets(data)
        })
        .catch((error) => {
            console.error('API Error:', error)
        })
}, [])
```

Now React receives target data from Django.

Flow:

```text
Django Database
      ↓
GET API
      ↓
fetch()
      ↓
setTargets(data)
      ↓
React UI
```

---

# 10. LocalStorage Removed as Main Data Source

Previously, React was storing targets in LocalStorage.

The backend integration changed the architecture.

Old:

```text
React
  ↓
LocalStorage
```

New:

```text
React
  ↓
Django API
  ↓
Database
```

Django database is now the persistent source for target data.

---

# 11. React → Django POST

The Add Target functionality was connected to the Django POST API.

React sends:

```javascript
{
    name: newTarget.trim()
}
```

using:

```text
POST /api/targets/
```

Flow:

```text
User enters target
      ↓
Add Target
      ↓
React
      ↓
POST API
      ↓
Django
      ↓
Database
      ↓
Response
      ↓
React State
```

Example:

```text
User adds: gym

Database:

id: 3
name: gym
completed: false
```

---

# 12. React → Django PATCH

The target completion toggle was connected to the PATCH API.

When a target is clicked:

```text
Target clicked
      ↓
handleToggle()
      ↓
PATCH /api/targets/<id>/
      ↓
Django
      ↓
Database updated
      ↓
React state updated
```

Example request:

```json
{
    "completed": true
}
```

This means completion status is now persisted in the database.

Refreshing the browser does not lose the completion status.

---

# 13. React → Django DELETE

Delete functionality was also connected to the backend.

When Delete is clicked:

```text
Delete button
      ↓
handleDeleteTarget()
      ↓
DELETE API
      ↓
Django
      ↓
target.delete()
      ↓
Database
      ↓
React state updated
```

Endpoint:

```text
DELETE /api/targets/<id>/delete/
```

After deletion, the target does not return after refreshing the page because it has been removed from the database.

---

# 14. Complete CRUD Flow

Day 12 completed the CRUD connection between React and Django.

```text
CREATE
POST
 ↓
Django
 ↓
Database


READ
GET
 ↓
Django
 ↓
React


UPDATE
PATCH
 ↓
Django
 ↓
Database


DELETE
DELETE
 ↓
Django
 ↓
Database
```

CRUD:

```text
C → Create  → POST    ✅
R → Read    → GET     ✅
U → Update  → PATCH   ✅
D → Delete  → DELETE  ✅
```

---

# 15. Final Architecture

```text
                    ┌─────────────────┐
                    │  React Frontend │
                    └────────┬────────┘
                             │
                       HTTP Requests
                             │
                             ↓
                    ┌─────────────────┐
                    │   Django API    │
                    └────────┬────────┘
                             │
                             ↓
                    ┌─────────────────┐
                    │    Database     │
                    └─────────────────┘
```

React handles:

* UI
* User interaction
* React state

Django handles:

* API requests
* CRUD operations
* Database communication

Database handles:

* Persistent target data

---

# 16. Important Concepts Learned

## API

API allows the frontend and backend to communicate.

```text
React ↔ Django
```

---

## HTTP Methods

```text
GET     → Read data
POST    → Create data
PATCH   → Update data
DELETE  → Delete data
```

---

## JSON

React and Django exchange data using JSON.

Example:

```json
{
    "id": 2,
    "name": "DSA Practice",
    "completed": true
}
```

---

## React State

React stores the currently displayed targets in:

```javascript
const [targets, setTargets] = useState([])
```

---

## fetch()

React uses `fetch()` to communicate with Django:

```javascript
fetch(url)
```

---

# 17. Final Day 12 Result

Before Day 12:

```text
React
  ↓
LocalStorage
```

After Day 12:

```text
React
  ↓
Django API
  ↓
Database
```

The Winter Arc Tracker is now a **React + Django full-stack application** with working target CRUD operations.

---

# ✅ DAY 12 COMPLETE

### Features completed:

* [x] Django backend setup
* [x] Target model
* [x] Database migration
* [x] GET API
* [x] POST API
* [x] PATCH API
* [x] DELETE API
* [x] Postman testing
* [x] CORS configuration
* [x] React GET integration
* [x] React POST integration
* [x] React PATCH integration
* [x] React DELETE integration
* [x] LocalStorage removed as primary data source
* [x] Full CRUD communication between React and Django

**Day 12 milestone: React Frontend successfully connected with Django Backend and Database.** 🚀

````

### 📁 Save it as

```text
D:\WINTER-ARC TRACKER\DOCS\DAY_12.md
````

Phir:

```powershell
git status
```

→ `DAY_12.md` bhi changes mein dikhega.

Uske baad **commit karenge**, but commit se pehle ek baar `git status` ka output dekh lena.
