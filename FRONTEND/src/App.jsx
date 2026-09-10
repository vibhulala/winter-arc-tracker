import { useState } from 'react'
import DailyTarget from './components/DailyTarget'
import './App.css'

function App() {
  const [targets, setTargets] = useState([
    {
      id: 1,
      name: 'DSA Practice',
      completed: false
    },
    {
      id: 2,
      name: 'Workout',
      completed: false
    },
    {
      id: 3,
      name: 'Study',
      completed: false
    },
    {
      id: 4,
      name: 'Reading',
      completed: false
    },
    {
      id: 5,
      name: 'Drink Water',
      completed: false
    }
  ])

  const handleToggle = (id) => {
    setTargets(
      targets.map((target) =>
        target.id === id
          ? { ...target, completed: !target.completed }
          : target
      )
    )
  }
  {/* Ye sirf completed targets ko select karega. */}
  const completedCount = targets.filter(
  (target) => target.completed
).length
  const progressPercentage =
  targets.length === 0
    ? 0
    : Math.round((completedCount / targets.length) * 100)

  return (
    <div>
      <h1>Winter Arc Tracker</h1>
      <p>
      Progress: {completedCount} / {targets.length} ({progressPercentage}%)
      </p>
      <div className="progress-bar">
      <div
      className="progress-fill"
      style={{ width: `${progressPercentage}%` }}
      ></div>
      </div>
      <p>Today's Targets</p>

      {targets.map((target) => (
        <DailyTarget
          key={target.id}
          name={target.name}
          completed={target.completed}
          onToggle={() => handleToggle(target.id)}
        />
      ))}
    </div>
  )
}

export default App