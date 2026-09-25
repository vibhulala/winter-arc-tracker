# Day 10 — Dashboard Build

## 🎯 Goal

Build a static Dashboard UI using temporary/dummy data.

The dashboard is currently static. Real application data is NOT connected to the dashboard yet.

---

# 1. What We Built

On Day 10, we created a separate Dashboard component:

src/components/Dashboard.jsx

The Dashboard contains:

- Dashboard heading
- Subtitle
- Summary cards
- Total Targets
- Completed Targets
- Current Streak
- Today's Progress
- Static progress bar
- Dashboard styling

---

# 2. Dashboard Component

We created:

function Dashboard() {
  return (
    <div className="dashboard">
      ...
    </div>
  )
}

A React component is a reusable piece of UI.

The Dashboard component is responsible for displaying the dashboard UI.

---

# 3. Importing a Component

In App.jsx:

import Dashboard from './components/Dashboard'

This imports the Dashboard component into App.jsx.

Then inside the return:

<Dashboard />

This renders the Dashboard component.

### Data Flow

App.jsx
   ↓
<Dashboard />
   ↓
Dashboard.jsx
   ↓
Dashboard UI


---

# 4. Dummy / Temporary Data

For Day 10, we intentionally used static dummy data.

Inside Dashboard.jsx:

const dashboardData = {
  totalTargets: 5,
  completedTargets: 3,
  streak: 7
}

This is NOT connected to the actual application state.

It is only temporary data for building the dashboard UI.

---

# 5. JavaScript Object

The dashboard data is stored inside an object:

const dashboardData = {
  totalTargets: 5,
  completedTargets: 3,
  streak: 7
}

The object contains key-value pairs:

totalTargets → 5
completedTargets → 3
streak → 7

---

# 6. Displaying JavaScript Data in JSX

We can display JavaScript values inside JSX using curly braces:

<h2>{dashboardData.totalTargets}</h2>

<h2>{dashboardData.completedTargets}</h2>

<h2>{dashboardData.streak}</h2>

React evaluates the expression inside `{}` and displays its value.

Example:

{dashboardData.completedTargets}

becomes:

3


---

# 7. Summary Cards

We created three summary cards:

1. Total Targets
2. Completed
3. Current Streak

Structure:

<div className="summary-cards">

  <div className="summary-card">
    <h2>{dashboardData.totalTargets}</h2>
    <p>Total Targets</p>
  </div>

  <div className="summary-card">
    <h2>{dashboardData.completedTargets}</h2>
    <p>Completed</p>
  </div>

  <div className="summary-card">
    <h2>{dashboardData.streak}</h2>
    <p>Current Streak</p>
  </div>

</div>


---

# 8. Today's Progress Section

We created another section:

<div className="dashboard-progress">

  <h2>Today's Progress</h2>

  <p>60% completed</p>

  <div className="dashboard-progress-bar">
    <div
      className="dashboard-progress-fill"
      style={{ width: '60%' }}
    ></div>
  </div>

</div>

This section currently displays a static 60% progress.

---

# 9. Inline Style in React

We used:

style={{ width: '60%' }}

React uses an object inside the style attribute.

The outer `{}` tells JSX that JavaScript is being used.

The inner `{}` represents the JavaScript object.

Example:

style={{
  width: '60%'
}}

This means the progress-fill element will have:

width: 60%;


---

# 10. Why is Completed Always Showing 3?

This is IMPORTANT.

Our Dashboard currently contains:

const dashboardData = {
  totalTargets: 5,
  completedTargets: 3,
  streak: 7
}

Therefore:

{dashboardData.completedTargets}

will ALWAYS display:

3

Even if all targets are incomplete.

Similarly:

<p>60% completed</p>

will always show:

60%

because it is static text.

And:

style={{ width: '60%' }}

will always create a 60% progress bar.

---

# 11. Dashboard Is NOT Connected to Real State Yet

Our actual application already has real state in App.jsx:

const [targets, setTargets] = useState(...)

App.jsx also calculates:

const completedCount = targets.filter(
  (target) => target.completed
).length

and:

const progressPercentage =
  targets.length === 0
    ? 0
    : Math.round(
        (completedCount / targets.length) * 100
      )

These values are REAL application data.

However, Day 10 Dashboard does not use them yet.

Current architecture:

App.jsx
│
├── targets state
├── completedCount
└── progressPercentage

        X

Dashboard.jsx
│
├── totalTargets: 5
├── completedTargets: 3
├── streak: 7
└── progress: 60%

The dashboard is currently independent from the real state.

---

# 12. Why Didn't We Connect Real Data?

Because the Day 10 goal was:

Build Dashboard UI with temporary/dummy data.

Deliverable:

Static Dashboard.

Therefore, Day 10 focuses on:

UI
+
Component Structure
+
Dummy Data
+
Styling

rather than real data integration.

---

# 13. CSS Classes Used

Dashboard container:

.dashboard

Summary cards container:

.summary-cards

Individual card:

.summary-card

Progress section:

.dashboard-progress

Progress bar:

.dashboard-progress-bar

Progress fill:

.dashboard-progress-fill


---

# 14. CSS Grid

For the summary cards, we used:

.summary-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

Important concepts:

display: grid;

Makes the element a CSS Grid container.

grid-template-columns:

Defines the number and size of columns.

repeat(3, 1fr)

means:

Create 3 equal columns.

gap: 20px;

Creates 20px space between grid items.

---

# 15. Dashboard Styling

Main dashboard:

.dashboard {
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px;
}

Important:

max-width:
Limits the maximum width.

margin: 40px auto:
Adds vertical margin and centers the element horizontally.

padding:
Creates space inside the container.

---

# 16. Summary Card Styling

Example:

.summary-card {
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  background: #f5f5f5;
}

Important concepts:

padding
→ space inside the card

border-radius
→ rounded corners

text-align
→ controls text alignment

background
→ card background


---

# 17. Progress Bar Structure

The progress bar has two elements:

dashboard-progress-bar
        ↓
dashboard-progress-fill

The outer element represents the complete progress bar.

The inner element represents the completed portion.

Example:

<div className="dashboard-progress-bar">
  <div
    className="dashboard-progress-fill"
    style={{ width: '60%' }}
  ></div>
</div>

Current result:

60% completed


---

# 18. Important React Concept Learned

A component can contain:

- JavaScript variables
- Objects
- JSX
- CSS classes
- JavaScript expressions

Example:

function Dashboard() {

  const dashboardData = {
    totalTargets: 5,
    completedTargets: 3,
    streak: 7
  }

  return (
    ...
  )
}

This is a basic example of combining JavaScript logic with JSX.

---

# 19. Final Dashboard Architecture

Current structure:

App.jsx
│
├── Dashboard
│   │
│   ├── Heading
│   ├── Subtitle
│   │
│   ├── Summary Cards
│   │   ├── Total Targets
│   │   ├── Completed
│   │   └── Current Streak
│   │
│   └── Today's Progress
│       └── Static Progress Bar
│
├── ProgressBar
│
└── DailyTarget


---

# 20. Day 10 Important Takeaways

### Remember these:

1. A React component is a reusable UI unit.

2. Components can be imported and rendered inside other components.

3. JavaScript objects can be used to store temporary UI data.

4. JSX uses `{}` to display JavaScript expressions.

5. CSS Grid can be used to create dashboard card layouts.

6. Inline React styles use:
   
   style={{ property: value }}

7. Dummy data is useful when building UI before connecting real data.

8. A static UI does NOT automatically react to application state.

9. The actual application state is currently stored in App.jsx.

10. Dashboard.jsx currently uses its own dummy data.

---

# 🧠 MOST IMPORTANT CONCEPT

Day 10 taught us the difference between:

STATIC DATA

and

REAL APPLICATION STATE.

Static:

const dashboardData = {
  completedTargets: 3
}

Real state:

const [targets, setTargets] = useState(...)

The static dashboard does not automatically change when targets change.

Later, the dashboard can be connected to real application data.

---

# ✅ Day 10 Status

Dashboard Component       ✅
Dummy Data                ✅
Summary Cards             ✅
Progress Section          ✅
Static Progress Bar       ✅
CSS Styling               ✅
Dashboard UI              ✅

Day 10 Complete.