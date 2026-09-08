# DAY 03 — SYSTEM ARCHITECTURE

## 1. Purpose of This Day

The purpose of Day 3 is to understand and document the
complete system architecture of the Winter Arc website
before starting actual development.

The main goal is to understand:

- How the frontend works
- How the backend works
- How the database stores data
- How frontend and backend communicate
- How APIs work
- How the complete application flow works

---

# 2. What is System Architecture?

System architecture describes how different parts of an
application are organized and how they communicate with
each other.

For Winter Arc, the major components are:

1. Frontend
2. Backend
3. API
4. Database

Basic architecture:

User
  ↓
Frontend
  ↓
API
  ↓
Backend
  ↓
Database


---

# 3. Winter Arc High-Level Architecture

The Winter Arc website will follow a client-server
architecture.

The main flow will be:

User
  ↓
React Frontend
  ↓
REST API
  ↓
Django Backend
  ↓
PostgreSQL Database


The response will travel back in the opposite direction:

PostgreSQL
  ↓
Django Backend
  ↓
REST API
  ↓
React Frontend
  ↓
User


---

# 4. Frontend

The frontend is the part of the application that the
user directly interacts with.

Planned technology:

- React
- HTML
- CSS
- JavaScript

The frontend will be responsible for:

- Displaying the dashboard
- Showing daily targets
- Providing checkboxes
- Allowing users to add/edit/remove targets
- Showing streak information
- Showing daily progress
- Showing weekly progress
- Showing monthly progress
- Showing history
- Handling user interactions

The frontend should mainly focus on presentation
and user interaction.

Critical business decisions should not depend only
on the frontend.


---

# 5. Backend

The backend is the logical and processing layer of
the application.

Planned technology:

- Python
- Django
- Django REST Framework

The backend will be responsible for:

- Authentication
- User management
- Target management
- Daily tracking
- Validation
- Business logic
- Streak calculation
- Progress calculation
- API processing
- Communication with the database

The backend will act as the brain of the application.


---

# 6. Database

The database will act as the persistent storage layer
of the Winter Arc application.

It will store the user's data even after the website
is closed.

Planned database:

PostgreSQL

The database will store information related to:

- Users
- Targets
- Daily records
- Target completion history

The database will preserve the user's Winter Arc journey.


---

# 7. Frontend, Backend and Database Roles

## Frontend

Frontend = User Interface + User Interaction

Examples:

- Buttons
- Checkboxes
- Forms
- Dashboard
- Progress charts
- Streak display


## Backend

Backend = Logic + Processing + Decisions

Examples:

- Authentication
- Validation
- Streak logic
- Progress calculation
- API handling


## Database

Database = Persistent Data Storage

Examples:

- User information
- Targets
- Daily records
- Completion history


Simple rule:

Frontend → Shows
Backend → Thinks
Database → Remembers


---

# 8. API and REST API

An API allows different parts of an application to
communicate with each other.

In Winter Arc, the React frontend will communicate
with the Django backend through REST APIs.

Basic flow:

React Frontend
      ↕
REST API
      ↕
Django Backend
      ↕
PostgreSQL


The API acts as a communication bridge between the
frontend and backend.


---

# 9. HTTP Methods

REST APIs commonly use HTTP methods to perform
different operations.

## GET

Used to retrieve data.

Example:

GET /api/today/


## POST

Used to create new data.

Example:

POST /api/targets/


## PATCH

Used to partially update existing data.

Example:

PATCH /api/targets/5/


## DELETE

Used to delete a resource.

Example:

DELETE /api/targets/5/


Simple memory rule:

GET → Get data
POST → Create data
PATCH → Update data
DELETE → Delete data


---

# 10. Possible Winter Arc API Endpoints

These are initial conceptual endpoints.

They may be changed during implementation.

## Authentication

POST /api/auth/signup/
POST /api/auth/login/
POST /api/auth/logout/


## Targets

GET /api/targets/
POST /api/targets/
PATCH /api/targets/{id}/
DELETE /api/targets/{id}/


## Daily Tracking

GET /api/today/
PATCH /api/today/targets/{id}/


## History

GET /api/history/


## Progress

GET /api/progress/weekly/
GET /api/progress/monthly/
GET /api/progress/overall/


These endpoints are currently part of the planned
architecture and will be finalized during backend
implementation.


---

# 11. Django Backend Architecture

The Django backend will contain several important
components.

Basic flow:

URL
  ↓
View / API View
  ↓
Validation
  ↓
Business Logic
  ↓
Model / ORM
  ↓
Database


## URLs

URLs determine which backend endpoint handles an
incoming request.

Examples:

/api/today/
/api/targets/
/api/history/
/api/progress/


## Views

Views receive requests, process the required logic
and return responses.


## Serializers

Serializers help convert backend data into formats
such as JSON.

They also help validate incoming API data.


## Models

Models represent the application's data structure
and interact with the database through Django ORM.


---

# 12. Database Architecture

The database will contain the major entities required
for the Winter Arc system.

Main entities:

- User
- Target
- Daily Record
- Target Completion


Conceptual relationship:

User
 |
 | 1
 |
 +----------< Target
 |
 |
 +----------< Daily Record
                 |
                 |
                 +----------< Target Completion


One user can have multiple targets.

One user can have multiple daily records.

A daily record can contain multiple target completion
records.


---

# 13. User Entity

The User entity represents a registered Winter Arc user.

It will contain information required for:

- Authentication
- Identifying the user
- Connecting targets with the correct user
- Connecting daily records with the correct user


Conceptual example:

User

id: 1
name: Nilay
email: user@example.com


---

# 14. Target Entity

A Target represents a productivity goal created for
a user.

Examples:

- Gym
- DSA
- Coding
- Study
- Reading

A target belongs to a specific user.

Conceptual example:

Target

id: 1
user_id: 1
name: Gym


---

# 15. Daily Record Entity

A Daily Record represents the user's activity for
a particular date.

It allows the system to maintain historical records
of the Winter Arc journey.

Example:

October 1 → Daily Record
October 2 → Daily Record
October 3 → Daily Record


The daily history will later be used for:

- Streak calculation
- Progress calculation
- History display
- Statistics


---

# 16. Target Completion Entity

Target Completion represents whether a particular
target was completed on a particular day.

Example:

October 1

Gym      → completed
DSA      → completed
Coding   → completed
Study    → completed
Reading  → not completed


This information allows the backend to calculate
daily completion status.


---

# 17. Daily Target Rules

The Winter Arc system will provide default daily
targets.

However, users should be able to customize targets
for a specific day.

Users should be able to:

- Add a target
- Remove a target
- Edit a target

The system should support both:

1. Default daily targets
2. Day-specific target changes

The exact database implementation for this feature
will be finalized during the database and backend
implementation phase.


---

# 18. Daily Completion Rules

The agreed Winter Arc daily completion rules are:

5/5 targets completed
→ PERFECT DAY
→ Green status
→ Streak continues


4/5 targets completed
→ GOOD DAY
→ Yellow status
→ Streak continues


3/5 or fewer targets completed
→ MISSED DAY
→ Red status
→ Streak breaks


These rules are part of the core business logic.


---

# 19. Streak Logic

The streak represents consecutive successful days.

The current agreed rule is:

5/5 → Streak continues

4/5 → Streak continues

3/5 or less → Streak breaks


Example:

Day 1 → 5/5 → Streak continues
Day 2 → 4/5 → Streak continues
Day 3 → 5/5 → Streak continues
Day 4 → 2/5 → Streak breaks


The backend will be responsible for determining
the authoritative streak status.


---

# 20. Automatic Missed Day

A day on which the required completion condition
is not met should be treated as a missed day.

If a user fails to complete enough targets for a day,
the streak should break.

The exact handling of an unvisited or completely
unsubmitted day will be implemented during the
backend logic phase.


---

# 21. Source of Truth

Daily target completion history will act as the
primary source of truth.

Streaks, progress and statistics can be calculated
from historical daily completion data.

Conceptually:

Daily Completion History
        ↓
Backend Calculations
        ↓
Streak
Progress
Statistics


This prevents calculated values from becoming the
only source of application data.


---

# 22. Progress Calculation

The backend will use historical daily records to
calculate progress.

Possible statistics include:

- Perfect days
- Good days
- Missed days
- Completion rate
- Current streak
- Best streak


Example:

Perfect Days → 18
Good Days → 7
Missed Days → 6
Completion Rate → 82%


The frontend will display these statistics in a
user-friendly way.


---

# 23. Weekly Progress

The backend can filter historical records by week
and calculate weekly statistics.

Conceptual flow:

Daily Records
      ↓
Filter Current Week
      ↓
Calculate Statistics
      ↓
Weekly Progress
      ↓
Frontend


Possible weekly information:

- Completion percentage
- Perfect days
- Good days
- Missed days
- Current streak


---

# 24. Monthly Progress

The backend can filter historical records by month
and calculate monthly statistics.

Conceptual flow:

Daily Records
      ↓
Filter Current Month
      ↓
Calculate Statistics
      ↓
Monthly Progress
      ↓
Frontend


The Winter Arc will run from:

October 1
to
December 31


Therefore the application should support tracking
across the complete Winter Arc period.


---

# 25. Complete End-to-End Flow

The complete Winter Arc application flow is:

User
  ↓
React Frontend
  ↓
REST API
  ↓
Django Backend
  ↓
Business Logic
  ↓
PostgreSQL
  ↓
Django Backend
  ↓
JSON Response
  ↓
React Frontend
  ↓
User


This is the main request-response cycle of the
application.


---

# 26. Example — User Completes a Target

Suppose the user clicks:

☐ DSA


The checkbox becomes:

☑ DSA


React detects the interaction.

Then React sends:

PATCH /api/today/targets/2/


Example request body:

{
  "completed": true
}


The backend receives the request.

Backend process:

1. Authenticate the user.
2. Validate the request.
3. Verify the target.
4. Update the completion record.
5. Calculate completed targets.
6. Calculate daily status.
7. Determine streak status.
8. Return the result.


The database stores the updated completion.


The backend may return:

{
  "success": true,
  "completed": 4,
  "total": 5,
  "status": "good",
  "streak": 7
}


React then updates the interface:

4 / 5

GOOD DAY

🔥 7 DAY STREAK


---

# 27. Complete Target Completion Flow

User
  ↓
React Checkbox
  ↓
PATCH API Request
  ↓
Django URL
  ↓
API View
  ↓
Authentication
  ↓
Validation
  ↓
Business Logic
  ↓
Django ORM
  ↓
PostgreSQL
  ↓
Updated Data
  ↓
JSON Response
  ↓
React
  ↓
Updated UI


---

# 28. Important Architecture Principle

Critical business logic should be handled by the
backend.

The frontend should not be responsible for making
authoritative decisions about:

- Streak status
- Daily status
- Progress calculations
- Authentication
- Data validation


The frontend should primarily display the results
provided by the backend.


Example:

Incorrect:

Frontend
→ 4/5
→ decides streak continues


Correct:

Frontend
→ sends completion
→ Backend calculates 4/5
→ Backend determines GOOD DAY
→ Backend determines streak
→ Frontend displays result


---

# 29. Final Technology Stack

Current planned technology stack:

## Frontend

React
JavaScript
HTML
CSS


## Backend

Python
Django
Django REST Framework


## Database

PostgreSQL


## Development Tools

VS Code
Git
GitHub


## Deployment

Deployment strategy will be finalized during the
deployment phase.


---

# 30. Final Architecture Diagram

The conceptual architecture of Winter Arc is:

                         WINTER ARC
                              |
                              ↓
                            USER
                              |
                              ↓
                    ┌─────────────────┐
                    │ React Frontend  │
                    └────────┬────────┘
                             |
                         REST API
                             |
                             ↓
                    ┌─────────────────┐
                    │ Django + DRF    │
                    └────────┬────────┘
                             |
                      Business Logic
                             |
                             ↓
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    └────────┬────────┘
                             |
                       Historical Data
                             |
                             ↓
                    Backend Calculations
                             |
                  ┌──────────┴──────────┐
                  ↓                     ↓
               STREAK                PROGRESS
                  |                     |
                  └──────────┬──────────┘
                             ↓
                       React Frontend
                             |
                             ↓
                            USER


---

# 31. Day 3 Summary

Today we designed the system architecture of the
Winter Arc website.

We understood:

- Frontend architecture
- Backend architecture
- Database architecture
- REST APIs
- HTTP methods
- Django components
- Database entities
- Daily completion rules
- Streak logic
- Progress calculation
- End-to-end request flow
- Frontend-backend communication

The main architecture is:

React
  ↓
REST API
  ↓
Django + DRF
  ↓
PostgreSQL


The main principle is:

Frontend → Shows
Backend → Thinks
Database → Remembers


Day 3 architecture is now documented and ready for
implementation planning.