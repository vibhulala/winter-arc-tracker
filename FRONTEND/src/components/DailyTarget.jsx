function DailyTarget({ name, completed, onToggle }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
      />

      <h2>{name}</h2>

      <p>
        {completed
          ? 'Target Completed! 🎉'
          : "Complete today's target"}
      </p>

      <button onClick={onToggle}>
        {completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
    </div>
  )
}

export default DailyTarget