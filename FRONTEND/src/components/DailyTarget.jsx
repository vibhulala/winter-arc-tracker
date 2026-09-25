function DailyTarget({
  name,
  completed,
  onToggle,
  onDelete
}) {
  return (
    <div className="daily-target">

      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
      />

      <span className={completed ? 'completed' : ''}>
        {name}
      </span>

      <button onClick={onDelete}>
        Delete
      </button>

    </div>
  )
}

export default DailyTarget