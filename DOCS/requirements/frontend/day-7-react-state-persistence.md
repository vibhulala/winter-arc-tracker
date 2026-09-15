# Day 7 — Derived State and Component Architecture

## Overview

Day 7 focused on improving the structure and understanding of
the Winter Arc Tracker React application.

The main concepts covered were:

1. State vs Derived Data
2. Component Separation
3. Parent-Child Data Flow
4. Lifting State Up
5. Reusable Components
6. Clean Props Design
7. Conditional Rendering
8. Controlled Components
9. React's Declarative UI
10. Single Source of Truth

The main goal was not to add unnecessary features, but to
understand how React components communicate and how application
state should be structured.

---

# Step 1 — State vs Derived Data

## What is State?

State is information that React needs to remember and that
can change during the lifetime of the application.

In the Winter Arc Tracker, the main state is the `targets` array.

Example:

const [targets, setTargets] = useState([
  {
    id: 1,
    name: 'DSA Practice',
    completed: false
  }
])

The `targets` state contains the actual source data for the
daily targets.

---

## What is Derived Data?

Derived data is information that can be calculated from
existing state or props.

It does not need to be stored separately in React state.

Example:

const completedCount = targets.filter(
  (target) => target.completed
).length

Here, `completedCount` is derived from `targets`.

---

## Why Avoid Unnecessary State?

Suppose we create:

const [completedCount, setCompletedCount] = useState(0)

This would create another state variable that needs to stay
synchronized with `targets`.

This can create bugs.

For example:

targets may contain 3 completed targets while
completedCount accidentally remains 2.

Instead, we calculate it directly:

const completedCount = targets.filter(
  (target) => target.completed
).length

Now the value always reflects the current `targets` state.

---

## Progress Percentage

The progress percentage is also derived data.

Example:

const progressPercentage =
  targets.length === 0
    ? 0
    : Math.round(
        (completedCount / targets.length) * 100
      )

Example:

5 total targets
3 completed targets

(3 / 5) * 100 = 60%

Therefore:

Progress: 3 / 5 (60%)

---

## Data Flow

The relationship is:

targets
   ↓
completedCount
   ↓
progressPercentage
   ↓
UI

The `targets` state is the source of truth.

The other values are calculated from it.

---

## Key Principle

Do not store a value in state if it can be calculated from
existing state or props.

Keep the minimum required information in state and derive
the rest.

---

# Step 2 — Component Separation

As an application grows, keeping all UI inside `App.jsx`
makes the component difficult to understand and maintain.

To improve the structure, the progress display was moved into
a separate component:

ProgressBar.jsx

Project structure:

src/
├── App.jsx
└── components/
    ├── DailyTarget.jsx
    └── ProgressBar.jsx

---

## ProgressBar Component

The ProgressBar component receives progress information through
props.

Example:

<ProgressBar
  completedCount={completedCount}
  totalTargets={targets.length}
  progressPercentage={progressPercentage}
/>

The component is responsible only for displaying progress.

---

## Responsibility of App.jsx

App.jsx is responsible for:

- Managing the targets state
- Updating targets
- Handling target IDs
- Calculating derived progress values
- Passing data to child components

---

## Responsibility of ProgressBar.jsx

ProgressBar.jsx is responsible for:

- Displaying progress text
- Displaying the progress bar
- Receiving progress information through props

This is called separation of concerns.

---

## Why Component Separation is Useful

Breaking a large component into smaller components makes the
application:

- Easier to understand
- Easier to maintain
- Easier to debug
- More reusable
- More scalable

---

# Step 3 — Parent-Child Data Flow

React follows a one-way data flow model.

Data generally moves from:

Parent
   ↓
Child

In the Winter Arc Tracker:

App.jsx
   ↓
DailyTarget.jsx
   ↓
ProgressBar.jsx

The parent component manages the main application state.

---

## Passing Props

App.jsx passes information to DailyTarget:

<DailyTarget
  key={target.id}
  name={target.name}
  completed={target.completed}
  onToggle={() => handleToggle(target.id)}
/>

DailyTarget receives these values:

function DailyTarget({
  name,
  completed,
  onToggle
}) {

The props are:

### name

Contains the target name.

Example:

'DSA Practice'

### completed

Contains the current completion state.

Example:

true

or:

false

### onToggle

Contains the function that should be executed when the
target is toggled.

---

# Step 4 — Lifting State Up

## What is Lifting State Up?

Lifting state up means moving shared state to the closest
common parent component.

In the Winter Arc Tracker, the `targets` state is maintained
inside `App.jsx`.

Why?

Because more than one component depends on the same data.

DailyTarget needs to know whether a target is completed.

ProgressBar needs to know how many targets are completed.

Therefore, keeping the state in App.jsx gives both components
access to the same source of truth.

---

## Incorrect Architecture

If each DailyTarget maintained its own completion state:

DailyTarget
   ↓
local completed state

ProgressBar would not automatically know about those changes.

This could lead to inconsistent application data.

---

## Better Architecture

The state is maintained by App.jsx:

             App.jsx
                |
          targets state
          /           \
         ↓             ↓
DailyTarget        ProgressBar

Both components depend on the same state.

---

# Step 5 — Reusable Components

## What is a Reusable Component?

A reusable component is a component that can be used multiple
times with different data.

The Winter Arc Tracker uses one reusable component:

DailyTarget.jsx

The same component represents:

- DSA Practice
- Workout
- Study
- Reading
- Drink Water

---

## Why Not Create Separate Components?

We could create:

DSATarget.jsx
WorkoutTarget.jsx
StudyTarget.jsx
ReadingTarget.jsx

But this would create unnecessary duplicate code.

Instead, we use:

DailyTarget.jsx

and pass different props.

---

## Example

<DailyTarget name="DSA Practice" />

<DailyTarget name="Workout" />

<DailyTarget name="Study" />

The component stays the same.

Only the data changes.

---

## Reusability Formula

Same component
+
Different props
=
Reusable UI

---

# Step 6 — Clean Props Design

DailyTarget receives three main props:

function DailyTarget({
  name,
  completed,
  onToggle
}) {

Each prop has a clear purpose.

### name

Used to display the target name.

Example:

<h2>{name}</h2>

### completed

Used to determine whether the target is complete.

Example:

checked={completed}

### onToggle

Used to trigger the parent update function.

Example:

onChange={onToggle}

---

## Avoid Hard-Coded Values

Bad:

<h2>DSA Practice</h2>

This makes the component specific to one target.

Better:

<h2>{name}</h2>

Now the component can display any target.

---

# Step 7 — Conditional Rendering

Conditional rendering means displaying different UI depending
on a condition.

The Winter Arc Tracker uses the ternary operator.

Syntax:

condition ? valueIfTrue : valueIfFalse

---

## Status Message

Example:

<p>
  {completed
    ? 'Target Completed! 🎉'
    : "Complete today's target"}
</p>

If:

completed === true

The UI displays:

Target Completed! 🎉

If:

completed === false

The UI displays:

Complete today's target

---

## Conditional Button Text

The button also changes based on the completion state.

Example:

<button onClick={onToggle}>
  {completed ? 'Mark Incomplete' : 'Mark Complete'}
</button>

When incomplete:

Mark Complete

When complete:

Mark Incomplete

---

# Step 8 — Controlled Checkbox

The checkbox is controlled by React state.

Example:

<input
  type="checkbox"
  checked={completed}
  onChange={onToggle}
/>

The `checked` value comes from the `completed` prop.

Therefore:

completed = false
   ↓
☐

completed = true
   ↓
☑

---

## What Happens When the User Clicks?

The complete flow is:

User clicks checkbox
        ↓
onToggle()
        ↓
handleToggle()
        ↓
setTargets()
        ↓
targets state changes
        ↓
React re-renders
        ↓
updated props are passed
        ↓
UI changes

---

# Step 9 — One State Controls Multiple UI Elements

The `completed` value controls multiple parts of the UI.

It controls:

1. Checkbox state
2. Status message
3. Button text

Example:

completed = false

UI:

☐
Complete today's target
Mark Complete

After the target is completed:

completed = true

UI:

☑
Target Completed! 🎉
Mark Incomplete

This keeps all parts of the interface synchronized.

---

# Step 10 — React's Declarative UI

React uses a declarative approach.

Instead of manually manipulating the DOM, we describe what
the UI should look like for a particular state.

We do not need to write code such as:

document.querySelector(...)

to manually change the checkbox or text.

Instead, we change the state.

Example:

completed = true

React automatically updates the UI.

---

## Declarative Flow

State changes
     ↓
React re-renders
     ↓
UI reflects the new state

This is one of the most important ideas in React.

---

# Complete Winter Arc Tracker Data Flow

The complete application flow is:

User clicks checkbox
        ↓
DailyTarget
        ↓
onToggle()
        ↓
App.jsx
        ↓
handleToggle()
        ↓
setTargets()
        ↓
targets state updates
        ↓
React re-renders
        ↓
Derived values recalculate
        ↓
completedCount
        ↓
progressPercentage
        ↓
ProgressBar updates
        ↓
DailyTarget receives updated props
        ↓
UI updates

---

# Component Architecture After Day 7

The application now follows this structure:

App.jsx
│
├── targets state
│
├── handleToggle()
│
├── completedCount
│
├── progressPercentage
│
├── ProgressBar
│
└── DailyTarget
      ├── name
      ├── completed
      └── onToggle

---

# Important React Concepts Learned

## 1. State

State stores information that can change over time.

Example:

targets

---

## 2. Derived Data

Values calculated from existing state.

Examples:

completedCount
progressPercentage

---

## 3. Props

Props allow a parent component to pass data to a child.

---

## 4. One-Way Data Flow

Data generally flows:

Parent
   ↓
Child

---

## 5. Lifting State Up

Shared state should be moved to a common parent component.

---

## 6. Reusable Components

One component can represent multiple pieces of UI using
different props.

---

## 7. Conditional Rendering

UI can change depending on state or conditions.

---

## 8. Controlled Components

Form elements such as checkboxes can be controlled by React
state.

---

## 9. Separation of Concerns

Different components should have clear responsibilities.

---

## 10. Single Source of Truth

The application should avoid maintaining duplicate versions
of the same data.

In this project:

targets

is the main source of truth.

---

# Day 7 Final Takeaway

The main lesson of Day 7 was learning how to structure React
applications instead of simply making the UI work.

The Winter Arc Tracker now follows a clearer architecture:

App.jsx
    ↓
State Management
    ↓
Derived Data
    ↓
Props
    ↓
Child Components
    ↓
UI

The important principle is:

"Keep the source of truth in state, derive values when
possible, and split the UI into components with clear
responsibilities."

---

# Day 7 Checklist

- [x] Understand State vs Derived Data
- [x] Calculate completedCount from targets
- [x] Calculate progressPercentage from state
- [x] Create ProgressBar component
- [x] Understand Parent-Child data flow
- [x] Understand Lifting State Up
- [x] Understand reusable components
- [x] Understand clean props design
- [x] Understand Conditional Rendering
- [x] Understand Controlled Checkbox
- [x] Test target toggling
- [x] Test progress updates
- [x] Test UI state changes
- [x] Complete Day 7 documentation

# Day 7 Status

COMPLETED ✅