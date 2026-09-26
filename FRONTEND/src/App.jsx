import { useEffect, useState } from 'react'
import DailyTarget from './components/DailyTarget'
import ProgressBar from './components/ProgressBar'
import './App.css'
import Dashboard from './components/Dashboard'


function App() {

  const [targets, setTargets] = useState([])
  const [newTarget, setNewTarget] = useState('')


  // GET TARGETS FROM DJANGO
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


  // TOGGLE TARGET
  // NOTE: Abhi ye local state par hai.
  // Backend PATCH connection next step mein karenge.
  const handleToggle = async (id) => {

  const target = targets.find(
    (target) => target.id === id
  )

  if (!target) {
    return
  }

  const newCompletedStatus = !target.completed

  try {

    const response = await fetch(
      `http://127.0.0.1:8000/api/targets/${id}/`,
      {
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          completed: newCompletedStatus,
        }),
      }
    )

    const updatedTarget = await response.json()

    if (!response.ok) {
      console.error(
        'Failed to update target:',
        updatedTarget
      )
      return
    }

    setTargets((prevTargets) =>
      prevTargets.map((target) =>
        target.id === id
          ? updatedTarget
          : target
      )
    )

  } catch (error) {
    console.error('API Error:', error)
  }
}


  // DELETE TARGET
  // NOTE: Abhi ye local state par hai.
  // Backend DELETE connection next step mein karenge.
  const handleDeleteTarget = async (id) => {

  try {

    const response = await fetch(
      `http://127.0.0.1:8000/api/targets/${id}/delete/`,
      {
        method: 'DELETE',
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error(
        'Failed to delete target:',
        data
      )
      return
    }

    // Remove target from React state
    setTargets((prevTargets) =>
      prevTargets.filter(
        (target) => target.id !== id
      )
    )

  } catch (error) {
    console.error('API Error:', error)
  }
}


  // ADD TARGET USING DJANGO POST API
  const handleAddTarget = async (e) => {
    e.preventDefault()

    if (!newTarget.trim()) {
      return
    }

    try {

      const response = await fetch(
        'http://127.0.0.1:8000/api/targets/',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            name: newTarget.trim(),
          }),
        }
      )


      const data = await response.json()


      if (!response.ok) {
        console.error('Failed to add target:', data)
        return
      }


      // Django se jo new target mila,
      // usko React state mein add karna
      setTargets((prevTargets) => [
        ...prevTargets,
        data,
      ])


      // Input clear
      setNewTarget('')

    } catch (error) {
      console.error('API Error:', error)
    }
  }


  // COMPLETED TARGET COUNT
  const completedCount = targets.filter(
    (target) => target.completed
  ).length


  // PROGRESS PERCENTAGE
  const progressPercentage =
    targets.length === 0
      ? 0
      : Math.round(
          (completedCount / targets.length) * 100
        )


  return (

    <div>

      <Dashboard
        totalTargets={targets.length}
        completedTargets={completedCount}
        progressPercentage={progressPercentage}
      />


      <h1>Winter Arc Tracker</h1>


      <ProgressBar
        completedCount={completedCount}
        totalTargets={targets.length}
        progressPercentage={progressPercentage}
      />


      {/* ADD TARGET FORM */}

      <form
        className="add-target-form"
        onSubmit={handleAddTarget}
      >

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


      {/* TARGET LIST */}

      {targets.map((target) => (

        <DailyTarget
          key={target.id}
          name={target.name}
          completed={target.completed}
          onToggle={() => handleToggle(target.id)}
          onDelete={() => handleDeleteTarget(target.id)}
        />

      ))}

    </div>
  )
}


export default App