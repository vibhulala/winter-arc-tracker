import { useState } from 'react'

function DailyTarget({ name }) {
  const [completed, setCompleted] = useState(false)

  const handleToggle = () => {
    setCompleted(!completed)
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
      />

      <h2>{name}</h2>

      <p>
        {completed
          ? 'Target Completed! 🎉'
          : 'Complete today\'s target'}
      </p>

      <button onClick={handleToggle}>
        {completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
    </div>
  )
}

export default DailyTarget