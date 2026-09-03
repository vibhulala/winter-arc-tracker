# WINTER ARC — Day 01 Requirements

## 1. Project Overview

**Project Name:** WINTER ARC

**Type:** Full-Stack Web Application

**Winter Arc Duration:** 1 October 2026 → 31 December 2026

**Total Duration:** 92 Days

**Preparation Period:** September 2026

### Tagline

> Your Winter. Your Targets. Your Arc.

---

## 2. Project Vision

WINTER ARC is a personal productivity and goal-tracking web application.

The purpose of the application is to help users stay consistent with their self-defined daily goals during the 92-day Winter Arc.

Users can create their own daily targets, mark them as completed, track their consistency, maintain streaks, and view their progress through daily, weekly, monthly, and overall analytics.

The application should be simple, motivating, and quick to use.

---

## 3. Problem Statement

People often set multiple goals for themselves but struggle to maintain consistency over a long period.

Traditional habit trackers can become complicated or overwhelming.

WINTER ARC aims to provide a simple system where users can:

* Define their daily targets.
* Track daily completion.
* See whether a day was successful or missed.
* Maintain a streak.
* Review their historical performance.
* Understand their overall progress.

---

## 4. Project Timeline

### Preparation Phase

**September 2026**

During September, users can:

* Create an account.
* Log in.
* Set their default daily targets.
* Prepare for their Winter Arc.

Official tracking begins on:

**1 October 2026**

### Winter Arc

**1 October 2026 → 31 December 2026**

Total:

**92 Days**

---

## 5. User Account

The application will provide:

* Signup
* Login
* Logout
* Personal user account

Each user's targets and progress must remain associated with their own account.

Users must not be able to access another user's private tracking data.

---

## 6. Daily Target System

Users can define their own default daily targets.

Example:

* Gym
* DSA
* Coding
* Study
* Reading

The default targets automatically repeat for each day.

### Default Routine

The default routine acts as the user's normal daily template.

Changing a target for one particular day must NOT permanently change the default routine.

---

## 7. Specific-Day Customization

Users can modify targets for an individual date.

For example:

Default routine:

* Gym
* DSA
* Coding
* Study
* Reading

On October 4, the user may:

* Remove Coding.
* Add Family Time.
* Rename Study to Study 1 Hour.

These changes apply only to October 4.

The next day follows the default routine again.

---

## 8. Daily Target Limit

The initial system will recommend a maximum of:

**5 daily targets**

The scoring system is based on five targets.

The system may be expanded in the future if required.

---

## 9. Daily Completion Rules

Each day receives a status based on completed targets.

### 🟢 Perfect Day

**5 / 5 completed**

Result:

* Perfect Day
* Streak continues

### 🟡 Good Day

**4 / 5 completed**

Result:

* Good Day
* Streak continues

### 🔴 Missed Day

**3 / 5 or fewer completed**

Result:

* Missed Day
* Streak breaks

---

## 10. No Activity Rule

If the user does not open the application or record any activity for a particular day, that day is automatically considered:

**🔴 Missed Day**

Therefore:

**No activity = Missed Day = Streak breaks**

The system should not require the user to manually mark a day as missed.

---

## 11. Streak System

A streak represents consecutive successful days.

### Streak continues when:

* 🟢 Perfect Day
* 🟡 Good Day

### Streak breaks when:

* 🔴 Missed Day
* No activity

Example:

```text
Day 1 🟢 → Streak 1
Day 2 🟢 → Streak 2
Day 3 🟡 → Streak 3
Day 4 🔴 → Streak 0
Day 5 🟢 → Streak 1
```

---

## 12. Progress Tracking

The application will track progress at multiple levels.

### Daily Progress

Example:

```text
4 / 5 Targets Completed
80%
🟡 Good Day
```

### Weekly Progress

Users can see their performance for a week.

### Monthly Progress

Separate progress will be available for:

* October
* November
* December

### Overall Progress

The application will provide a summary of the complete:

**92-Day Winter Arc**

---

## 13. History & Calendar

Every day's target completion history must be stored.

The calendar will visually represent daily performance.

Example:

```text
October 2026

1  🟢
2  🟢
3  🟡
4  🔴
5  🟢
6  🟢
...
```

Users can click a date to view that day's targets and completion details.

---

## 14. MVP Features

The first version of WINTER ARC will include:

* Signup / Login
* User account
* Default daily targets
* Daily target checklist
* Add target for a specific date
* Edit target for a specific date
* Remove target for a specific date
* Target completion toggles
* Daily status calculation
* Streak calculation
* Automatic missed-day handling
* Daily history
* Calendar
* Weekly progress
* Monthly progress
* Overall 92-day progress

---

## 15. Features NOT Included in MVP

To keep the project focused, the following features are intentionally excluded from the first version:

* Friends / Social system
* Leaderboards
* AI Coach
* Push notifications
* Native Android application
* Native iOS application
* Public profiles
* Complex reward systems
* Advanced gamification

These may be considered in future versions.

---

## 16. User Experience Principles

The application should be:

### Simple

Daily tracking should take only a few seconds.

### Motivating

The application should encourage consistency.

### Non-judgmental

A missed day should not shame the user.

The user should be encouraged to continue from the next day.

### Responsive

The website should work properly on:

* Desktop
* Tablet
* Mobile browsers

---

## 17. High-Level Technical Direction

The planned technology stack is:

### Frontend

React + Vite

### Backend

Python + Django + Django REST Framework

### Database

PostgreSQL

### API Testing

Postman

### Version Control

Git + GitHub

---

## 18. Basic System Flow

The high-level system flow will be:

```text
User
  ↓
React Frontend
  ↓
HTTP / JSON Request
  ↓
Django REST API
  ↓
Business Logic & Validation
  ↓
PostgreSQL Database
  ↓
JSON Response
  ↓
React Frontend
  ↓
User Interface
```

Detailed architecture will be designed on Day 3.

---

## 19. Conceptual Target Data

A target will conceptually contain information such as:

```text
Target
├── id
├── user
├── name / title
├── date
├── completed
├── completed_at
└── created_at
```

The exact database structure will be finalized during Day 4 — Database Design.

---

## 20. Success Criteria

WINTER ARC will be considered successful when a user can:

1. Create an account.
2. Set their default daily targets.
3. Start their Winter Arc on October 1.
4. See their daily targets.
5. Mark targets as completed.
6. Automatically receive a daily status.
7. Maintain or break their streak according to the rules.
8. Customize targets for a particular date.
9. View previous days.
10. View calendar history.
11. View weekly progress.
12. View monthly progress.
13. View their complete 92-day Winter Arc performance.

---

# Day 01 — Locked Decisions

The following decisions are finalized for the current MVP:

* Winter Arc = **92 Days**
* Tracking period = **1 Oct 2026 → 31 Dec 2026**
* September = **Preparation Period**
* Users create their own daily targets.
* Default targets repeat automatically.
* Individual dates can be customized.
* Specific-day changes do not modify the default routine.
* Recommended daily target count = **5**
* 5/5 = 🟢 Perfect Day
* 4/5 = 🟡 Good Day
* 3/5 or less = 🔴 Missed Day
* No activity = 🔴 Missed Day
* Green and Yellow continue the streak.
* Red breaks the streak.
* Daily history is stored.
* Calendar shows daily status.
* Weekly, monthly, and overall progress are required.
* MVP will focus on simplicity and consistency.

---

## Day 01 Status

**Requirements Definition: COMPLETE ✅**

Next:

**Day 02 — User Flow & Website Pages**
