# WINTER ARC — Day 02 User Flow

## 1. What is User Flow?

User Flow is the step-by-step journey that a user follows
while interacting with a website.

It defines what the user sees, what action they take,
and what happens after that action.

---

## 2. User Flow Goals

The main goals of the Winter Arc user flow are:

- Keep the experience simple and friendly.
- Allow users to create their own daily targets.
- Allow users to customize targets for specific days.
- Track daily completion.
- Automatically calculate daily status.
- Maintain the user's Winter Arc streak.
- Store daily history.
- Display weekly, monthly and overall progress.

---

## 3. Website Page Structure

### Public Pages

#### 1. Landing Page

Introduces the Winter Arc concept and provides navigation
to Signup and Login.

#### 2. Signup Page

Allows a new user to create an account.

#### 3. Login Page

Allows an existing user to access their account.

### Authenticated Pages

#### 4. Dashboard

The main screen where users track their daily targets,
streak and daily progress.

#### 5. Targets

Allows users to manage their default daily targets.

#### 6. History / Calendar

Displays previous days and their completion status.

#### 7. Progress

Displays weekly, monthly and overall progress.

#### 8. Settings

Provides basic profile and account management options.

---

## 4. Page-to-Page Navigation

### Public Navigation

Landing → Signup

Landing → Login

### New User

Signup → Setup Targets → Dashboard

### Returning User

Login → Dashboard

### Main Navigation

Dashboard → Targets

Dashboard → History

Dashboard → Progress

Dashboard → Settings

### History Navigation

History → Calendar → Day Details → Edit Targets

### Logout

Settings → Logout → Landing

---

## 5. Navigation vs Business Logic

Navigation defines how the user moves between pages.

Business logic defines what the system does with the
user's actions and data.

Example:

Dashboard → History = Navigation

4/5 targets → Good Day → Streak continues = Business Logic

---

## 6. Daily Tracking Flow

The user opens the Dashboard and views today's targets.

The user marks completed targets using checkboxes.

The system calculates the number of completed targets.

The system determines the daily status.

The daily result is saved to the user's history.

---

## 7. Target Customization Flow

Default targets automatically appear for each new day.

The user can add, remove or edit targets for a specific day.

Changes made to a specific day do not permanently modify
the default daily routine.

---

## 8. Daily Status Flow

5/5 completed → Perfect Day 🟢

4/5 completed → Good Day 🟡

3/5 or fewer → Missed Day 🔴

---

## 9. Streak Flow

Perfect Day → Streak continues

Good Day → Streak continues

Missed Day → Streak breaks

If the user completely misses a day, the system automatically
marks that day as missed and breaks the streak.

---

## 10. History & Progress Flow

Every day's target completion and status are stored.

The user can view previous days through the calendar.

Stored history is used to calculate:

- Weekly progress
- Monthly progress
- Overall progress
- Best streak
- Completion rate
- Perfect days
- Good days
- Missed days

---

## 11. Complete User Flow Diagram

Landing
    ↓
Signup / Login
    ↓
Setup Targets
    ↓
Dashboard
    ↓
Today's Targets
    ↓
Complete Targets
    ↓
Daily Status
    ↓
Update Streak
    ↓
Save Daily History
    ↓
Calendar / Progress
    ↓
92-Day Final Result

---

## 12. Wireframe

A wireframe is a basic visual blueprint of a website page.
It defines the structure and placement of elements before
actual UI design and development.

### Dashboard

The Dashboard displays:

- Current Winter Arc day
- Current streak
- Today's targets
- Completed target count
- Daily status
- Quick progress information

### Targets Page

Users can:

- Add targets
- Edit targets
- Delete targets

### History / Calendar

Users can view previous days and select a date to see
its details.

### Progress

The Progress page displays:

- Weekly progress
- Monthly progress
- Overall progress
- Perfect days
- Good days
- Missed days
- Best streak

### Settings

Provides basic account management options.

---

## 13. What I Learned Today

Today I learned how to design a user flow before starting
actual development.

I learned that a user flow describes the journey of a user
through a website.

I also learned the difference between:

- User Flow
- Page Structure
- Navigation
- Business Logic
- Wireframe

I learned that planning the structure before coding makes
the development process easier and more organized.