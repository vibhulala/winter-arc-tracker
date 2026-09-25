function Dashboard({
  totalTargets,
  completedTargets,
  progressPercentage
}) {
  const streak = 7

  return (
    <div className="dashboard">

      <h1>Winter Arc Dashboard</h1>

      <p>Stay consistent. Stay focused.</p>

      <div className="summary-cards">

        <div className="summary-card">
          <h2>{totalTargets}</h2>
          <p>Total Targets</p>
        </div>

        <div className="summary-card">
          <h2>{completedTargets}</h2>
          <p>Completed</p>
        </div>

        <div className="summary-card">
          <h2>{streak}</h2>
          <p>Current Streak</p>
        </div>

      </div>

      <div className="dashboard-progress">

        <h2>Today's Progress</h2>

        <p>{progressPercentage}% completed</p>

        <div className="dashboard-progress-bar">
          <div
            className="dashboard-progress-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

      </div>

    </div>
  )
}

export default Dashboard