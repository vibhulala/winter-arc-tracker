function Dashboard() {
  const dashboardData = {
    totalTargets: 5,
    completedTargets: 3,
    streak: 7
  }

  return (
    <div className="dashboard">

      <h1>Winter Arc Dashboard</h1>

      <p>Stay consistent. Stay focused.</p>

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

    </div>
  )
}

export default Dashboard