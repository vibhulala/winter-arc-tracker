import { useEffect, useState } from 'react'
import DailyTarget from './components/DailyTarget'
import ProgressBar from './components/ProgressBar'
import './App.css'
import Dashboard from './components/Dashboard'

const initialTargets = [
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
]

function App() {
  const [targets, setTargets] = useState(() => {
    try {
      const savedTargets =
        localStorage.getItem('winterArcTargets')

      return savedTargets
        ? JSON.parse(savedTargets)
        : initialTargets
    } catch (error) {
      console.error(
        'Failed to load saved targets:',
        error
      )

      return initialTargets
    }
  })
  const [newTarget, setNewTarget] = useState('')
  useEffect(() => {
    localStorage.setItem(
      'winterArcTargets',
      JSON.stringify(targets)
    )
  }, [targets])

  const handleToggle = (id) => {
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
  }
  const handleAddTarget = (e) => {
  e.preventDefault()

  if (!newTarget.trim()) {
    return
  }

  const newTargetObject = {
    id: Date.now(),
    name: newTarget.trim(),
    completed: false
  }

  setTargets((prevTargets) => [
    ...prevTargets,
    newTargetObject
  ])

  setNewTarget('')
}
  const completedCount = targets.filter(
    (target) => target.completed
  ).length

  const progressPercentage =
    targets.length === 0
      ? 0
      : Math.round(
          (completedCount / targets.length) * 100
        )

  return (
    
    <div>
      <h1>Winter Arc Tracker</h1>
      
      <Dashboard />

      <ProgressBar
        completedCount={completedCount}
        totalTargets={targets.length}
        progressPercentage={progressPercentage}
      />
      <form className="add-target-form" onSubmit={handleAddTarget}>
  <input
    type="text"
    placeholder="Enter a new target"
    value={newTarget}
    onChange={(e) => setNewTarget(e.target.value)}
  />

  <button type="submit">
    Add Target
  </button>
</form>
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