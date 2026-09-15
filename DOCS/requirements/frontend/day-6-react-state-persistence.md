# Step 6 — Final Integration and Testing

## 1. Final React Architecture

The Winter Arc Tracker now combines several React concepts:

- useState
- useEffect
- Props
- Event handling
- Functional state updates
- Array map()
- Array filter()
- localStorage
- JSON.stringify()
- JSON.parse()
- try...catch

---

## 2. Complete Application Flow

The user interacts with a checkbox inside the
DailyTarget component.

DailyTarget
    ↓
onToggle()
    ↓
handleToggle()
    ↓
setTargets()
    ↓
React state changes
    ↓
Component re-renders
    ↓
Progress is recalculated
    ↓
useEffect runs
    ↓
Updated targets are saved to localStorage

---

## 3. Loading Data After Refresh

When the application starts:

localStorage.getItem()
        ↓
Saved data found?
        ↓
Yes → JSON.parse()
        ↓
React state
        ↓
UI displays saved state

If no saved data exists:

localStorage.getItem()
        ↓
null
        ↓
initialTargets
        ↓
React state
        ↓
UI displays default targets

If parsing fails:

JSON.parse()
        ↓
Error
        ↓
catch block
        ↓
initialTargets
        ↓
React state

---

## 4. Progress Calculation

The completed targets are calculated using filter():

const completedCount = targets.filter(
  (target) => target.completed
).length

The percentage is calculated using:

(completedCount / targets.length) * 100

Example:

2 completed targets out of 5:

(2 / 5) * 100 = 40%

Therefore:

Progress: 2 / 5 (40%)

---

## 5. Functional State Update

When updating the targets array, we use:

setTargets((prevTargets) =>
  prevTargets.map((target) =>
    target.id === id
      ? {
          ...target,
          completed: !target.completed
        }
      : target
  )
)

The new state is calculated from the previous state.

This is preferred when the next state depends on the
previous state.

---

## 6. State Persistence

React state exists during the current application
session.

localStorage allows the application to persist data
inside the browser.

React state:

targets

Browser storage:

winterArcTargets

The application synchronizes them using useEffect():

useEffect(() => {
  localStorage.setItem(
    'winterArcTargets',
    JSON.stringify(targets)
  )
}, [targets])

---

## 7. Final Testing Checklist

The following features were tested:

- [x] Targets are displayed
- [x] Checkbox can be clicked
- [x] Target completion status changes
- [x] Mark Complete button works
- [x] Mark Incomplete button works
- [x] Progress count updates
- [x] Progress percentage updates
- [x] Completed targets remain completed after refresh
- [x] Uncompleted targets remain uncompleted
- [x] localStorage stores target data
- [x] Functional state update is used
- [x] Invalid JSON is handled using try...catch

---

## Day 6 Final Outcome

The Winter Arc Tracker is now a functional React
application with persistent target tracking.

The application can:

1. Display daily targets.
2. Track completion status.
3. Update progress dynamically.
4. Save progress in localStorage.
5. Restore progress after page refresh.
6. Handle invalid stored data safely.

---

## Key Concepts Learned in Day 6

### React

- useState()
- useEffect()
- Props
- Event handling
- Functional state updates
- Component communication

### JavaScript

- map()
- filter()
- spread operator
- ternary operator
- JSON.stringify()
- JSON.parse()
- try...catch

### Browser API

- localStorage
- localStorage.setItem()
- localStorage.getItem()

---

## Important Takeaways

1. `useState()` manages component state.

2. `handleToggle()` changes the completion state.

3. Functional state updates are useful when the new
   state depends on the previous state.

4. `useEffect()` can synchronize React state with
   localStorage.

5. `JSON.stringify()` converts JavaScript data into
   a JSON string.

6. `JSON.parse()` converts JSON back into JavaScript data.

7. `try...catch` prevents invalid stored data from
   crashing the application.

8. `localStorage` allows data to survive page refreshes.

9. `map()` creates a new array when updating targets.

10. `filter()` helps calculate the number of completed
    targets.

---

# DAY 6 COMPLETE

The Winter Arc Tracker now has persistent state and
dynamic progress tracking.

Architecture:

React State
    ↕
localStorage

User Interaction
    ↓
handleToggle()
    ↓
setTargets()
    ↓
useEffect()
    ↓
localStorage

This completes the Day 6 implementation.