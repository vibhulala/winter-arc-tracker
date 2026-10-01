import { useEffect, useState } from 'react'
import DailyTarget from './components/DailyTarget'
import ProgressBar from './components/ProgressBar'
import './App.css'

// =====================================================
// PRODUCTION BACKEND
// =====================================================

const API_URL =
  'https://winter-arc-tracker-g5uh.onrender.com/api'

function App() {
  const [targets, setTargets] = useState([])
  const [username, setUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [loginMode, setLoginMode] = useState(true)

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [newTarget, setNewTarget] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  // =====================================================
  // STREAK DATA
  // =====================================================

  const [streakData, setStreakData] = useState({
    today_completed: 0,
    today_total: 0,
    today_percentage: 0,
    today_success: false,
    current_streak: 0,
    best_streak: 0,
  })

  // =====================================================
  // CHECK USER
  // =====================================================

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me/`, {
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok && data.authenticated) {
        setIsLoggedIn(true)
        setUsername(data.username)

        await loadTargets()
        await loadStreak()
      }
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  // =====================================================
  // LOAD TARGETS
  // =====================================================

  const loadTargets = async () => {
    try {
      const response = await fetch(`${API_URL}/targets/`, {
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok) {
        setTargets(data)
      }
    } catch (error) {
      console.error('Target loading error:', error)
    }
  }

  // =====================================================
  // LOAD STREAK
  // =====================================================

  const loadStreak = async () => {
    try {
      const response = await fetch(`${API_URL}/streak/`, {
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok) {
        setStreakData(data)
      }
    } catch (error) {
      console.error('Streak loading error:', error)
    }
  }

  // =====================================================
  // AUTH INPUT
  // =====================================================

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // =====================================================
  // LOGIN / SIGNUP
  // =====================================================

  const handleAuth = async (e) => {
    e.preventDefault()
    setMessage('')

    const endpoint = loginMode
      ? '/auth/login/'
      : '/auth/signup/'

    const body = loginMode
      ? {
          username: form.username,
          password: form.password,
        }
      : {
          username: form.username,
          email: form.email,
          password: form.password,
        }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        credentials: 'include',

        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(
          data.error || 'Something went wrong'
        )
        return
      }

      // SIGNUP
      if (!loginMode) {
        setMessage(
          'Account created successfully. Please login.'
        )

        setLoginMode(true)

        setForm({
          username: '',
          email: '',
          password: '',
        })

        return
      }

      // LOGIN SUCCESS
      setIsLoggedIn(true)
      setUsername(data.username)

      setForm({
        username: '',
        email: '',
        password: '',
      })

      await loadTargets()
      await loadStreak()

    } catch (error) {
      console.error('Authentication error:', error)

      setMessage(
        'Unable to connect to server'
      )
    }
  }

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout/`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Logout error:', error)
    }

    setIsLoggedIn(false)
    setUsername('')
    setTargets([])

    setStreakData({
      today_completed: 0,
      today_total: 0,
      today_percentage: 0,
      today_success: false,
      current_streak: 0,
      best_streak: 0,
    })
  }

  // =====================================================
  // TOGGLE TARGET
  // =====================================================

  const handleToggle = async (id) => {
    const target = targets.find(
      (item) => item.id === id
    )

    if (!target) return

    try {
      const response = await fetch(
        `${API_URL}/targets/${id}/update/`,
        {
          method: 'PATCH',

          headers: {
            'Content-Type': 'application/json',
          },

          credentials: 'include',

          body: JSON.stringify({
            completed: !target.completed,
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        setTargets((prev) =>
          prev.map((item) =>
            item.id === id ? data : item
          )
        )

        await loadStreak()
      } else if (response.status === 401) {
        setIsLoggedIn(false)
        setMessage(
          'Session expired. Please login again.'
        )
      }

    } catch (error) {
      console.error('Toggle error:', error)
    }
  }

  // =====================================================
  // DELETE TARGET
  // =====================================================

  const handleDeleteTarget = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/targets/${id}/`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      )

      if (response.ok) {
        setTargets((prev) =>
          prev.filter((item) => item.id !== id)
        )

        await loadStreak()

      } else if (response.status === 401) {
        setIsLoggedIn(false)
        setMessage(
          'Session expired. Please login again.'
        )
      }

    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  // =====================================================
  // ADD TARGET
  // =====================================================

  const handleAddTarget = async (e) => {
    e.preventDefault()

    const targetName = newTarget.trim()

    if (!targetName) return

    try {
      const response = await fetch(
        `${API_URL}/targets/`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          credentials: 'include',

          body: JSON.stringify({
            name: targetName,
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        setTargets((prev) => [
          ...prev,
          data,
        ])

        setNewTarget('')

        await loadStreak()

      } else if (response.status === 401) {
        setIsLoggedIn(false)

        setMessage(
          'Session expired. Please login again.'
        )
      } else {
        setMessage(
          data.error || 'Unable to add target'
        )
      }

    } catch (error) {
      console.error('Add target error:', error)

      setMessage(
        'Unable to connect to server'
      )
    }
  }

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="loading-screen">

        <div className="loader"></div>

        <p>
          Loading Winter Arc...
        </p>

      </div>
    )
  }

  // =====================================================
  // AUTH SCREEN
  // =====================================================

  if (!isLoggedIn) {
    return (
      <div className="auth-page">

        <div className="auth-card">

          <div className="brand">

            <div className="brand-icon">
              ❄
            </div>

            <h1>
              WINTER ARC
            </h1>

            <p>
              Build discipline. Track progress.
            </p>

          </div>


          <div className="auth-heading">

            <h2>
              {loginMode
                ? 'Welcome Back'
                : 'Start Your Arc'}
            </h2>

            <span>
              {loginMode
                ? 'Continue your journey'
                : 'Create your personal tracker'}
            </span>

          </div>


          <form onSubmit={handleAuth}>

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleInputChange}
              required
            />


            {!loginMode && (
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleInputChange}
                required
              />
            )}


            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleInputChange}
              required
            />


            <button className="primary-btn">

              {loginMode
                ? 'Enter Winter Arc →'
                : 'Create My Arc →'}

            </button>

          </form>


          {message && (
            <div className="auth-message">
              {message}
            </div>
          )}


          <button
            className="switch-auth"
            onClick={() => {
              setLoginMode(!loginMode)
              setMessage('')
            }}
          >

            {loginMode
              ? 'New here? Create an account'
              : 'Already have an account? Login'}

          </button>

        </div>


        <div className="auth-footer">
          OCT 01 — DEC 31
        </div>

      </div>
    )
  }

  // =====================================================
  // DASHBOARD DATA
  // =====================================================

  const completedCount =
    targets.filter(
      (target) => target.completed
    ).length

  const totalTargets =
    targets.length

  const progressPercentage =
    totalTargets === 0
      ? 0
      : Math.round(
          (completedCount / totalTargets) * 100
        )

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">

        <div className="logo-area">

          <div className="logo-icon">
            ❄
          </div>

          <div>

            <h2>
              WINTER ARC
            </h2>

            <span>
              2026 • TRACKER
            </span>

          </div>

        </div>


        <div className="user-area">

          <div className="user-info">

            <span>
              WELCOME BACK
            </span>

            <strong>
              {username}
            </strong>

          </div>


          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* HERO */}

      <section className="hero">

        <div>

          <span className="eyebrow">
            YOUR DAILY DISCIPLINE
          </span>

          <h1>
            Make today
            <br />
            <span>
              count.
            </span>
          </h1>

          <p>
            Small actions. Consistent effort.
            <br />
            A stronger version of you.
          </p>

        </div>


        <div className="date-card">

          <span>
            TODAY
          </span>

          <strong>
            {new Date().getDate()}
          </strong>

          <small>
            {new Date()
              .toLocaleDateString(
                'en-US',
                {
                  month: 'short',
                  year: 'numeric',
                }
              )
              .toUpperCase()}
          </small>

        </div>

      </section>


      {/* MAIN STATS */}

      <section className="stats-grid">

        <div className="stat-card">

          <span>
            TARGETS
          </span>

          <strong>
            {totalTargets}
          </strong>

          <small>
            Today's goals
          </small>

        </div>


        <div className="stat-card">

          <span>
            COMPLETED
          </span>

          <strong>
            {completedCount}
          </strong>

          <small>
            Goals finished
          </small>

        </div>


        <div className="stat-card highlight">

          <span>
            PROGRESS
          </span>

          <strong>
            {progressPercentage}%
          </strong>

          <small>
            Daily completion
          </small>

        </div>

      </section>


      {/* STREAK DASHBOARD */}

      <section className="stats-grid streak-grid">

        <div className="stat-card streak-card">

          <span>
            🔥 CURRENT STREAK
          </span>

          <strong>
            {streakData.current_streak}
          </strong>

          <small>
            {streakData.current_streak === 1
              ? 'Day'
              : 'Days'}
          </small>

        </div>


        <div className="stat-card best-streak-card">

          <span>
            🏆 BEST STREAK
          </span>

          <strong>
            {streakData.best_streak}
          </strong>

          <small>
            Personal best
          </small>

        </div>


        <div
          className={`stat-card ${
            streakData.today_success
              ? 'success-card'
              : 'warning-card'
          }`}
        >

          <span>
            🎯 TODAY
          </span>

          <strong>
            {streakData.today_percentage}%
          </strong>

          <small>
            {streakData.today_success
              ? 'Streak secured ✓'
              : 'Need 80% to secure streak'}
          </small>

        </div>

      </section>


      {/* DAILY PROGRESS */}

      <section className="progress-section">

        <div className="section-title">

          <div>

            <span>
              DAILY PROGRESS
            </span>

            <h3>
              {streakData.today_success
                ? 'Streak secured. 🔥'
                : 'Keep going.'}
            </h3>

          </div>


          <strong>
            {completedCount}/{totalTargets}
          </strong>

        </div>


        <ProgressBar
          completedCount={completedCount}
          totalTargets={totalTargets}
          progressPercentage={progressPercentage}
        />

      </section>


      {/* TARGETS */}

      <section className="targets-section">

        <div className="section-title">

          <div>

            <span>
              TODAY'S TARGETS
            </span>

            <h3>
              Your commitments
            </h3>

          </div>


          <div className="target-count">
            {totalTargets} TARGETS
          </div>

        </div>


        <div className="targets-list">

          {targets.length === 0 ? (

            <div className="empty-state">

              <div>
                ❄
              </div>

              <h3>
                No targets yet
              </h3>

              <p>
                Add your first target and start
                your arc.
              </p>

            </div>

          ) : (

            targets.map(
              (target, index) => (

                <div
                  className={`target-wrapper ${
                    target.completed
                      ? 'completed'
                      : ''
                  }`}
                  key={target.id}
                >

                  <div className="target-number">
                    {String(index + 1).padStart(
                      2,
                      '0'
                    )}
                  </div>


                  <DailyTarget
                    name={target.name}
                    completed={target.completed}
                    onToggle={() =>
                      handleToggle(
                        target.id
                      )
                    }
                    onDelete={() =>
                      handleDeleteTarget(
                        target.id
                      )
                    }
                  />

                </div>

              )
            )

          )}

        </div>


        {/* ADD TARGET */}

        <form
          className="add-target"
          onSubmit={handleAddTarget}
        >

          <input
            type="text"
            placeholder="What will you accomplish today?"
            value={newTarget}
            onChange={(e) =>
              setNewTarget(
                e.target.value
              )
            }
          />


          <button>
            + Add Target
          </button>

        </form>

      </section>


      {/* FOOTER */}

      <footer>

        <span>
          WINTER ARC • 2026
        </span>

        <span>
          BUILD YOUR DISCIPLINE
        </span>

      </footer>

    </div>
  )
}

export default App