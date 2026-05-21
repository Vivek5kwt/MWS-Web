import { useState, useEffect, useRef, useMemo } from 'react'
import {
  Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend,
} from 'chart.js'

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const API_URL = 'https://admin.mywealthscore.ai/api/users'
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const gridColor = 'rgba(204,204,204,0.1)'
const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - i)

// ── helpers ──────────────────────────────────────────────────────────────────

// Parse "YYYY-MM-DD" as local midnight (avoids UTC offset shifting the date)
function parseLocalDate(str) {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function getWeekStart(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Monday-based week
  const start = new Date(d)
  start.setDate(diff)
  start.setHours(0, 0, 0, 0)
  return start
}

function groupUsers(users, mode) {
  const map = {}
  users.forEach(u => {
    const d = new Date(u.createdAt)
    let key, label

    if (mode === 'weekly') {
      const ws = getWeekStart(d)
      const we = new Date(ws)
      we.setDate(ws.getDate() + 6)
      key = ws.toISOString().split('T')[0]
      const fmt = dt => dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
      label = `${fmt(ws)} – ${fmt(we)}`
    } else if (mode === 'monthly') {
      key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      label = d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    } else {
      key = `${d.getFullYear()}`
      label = key
    }

    if (!map[key]) map[key] = { label, count: 0 }
    map[key].count++
  })

  // latest first
  return Object.entries(map)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([, v]) => v)
}

// ── badge components ──────────────────────────────────────────────────────────

function Badge({ value }) {
  return value
    ? <span className="badge bg-success">Yes</span>
    : <span className="badge bg-danger">No</span>
}

function StatusBadge({ status }) {
  const map = { ACTIVE: 'bg-success', INACTIVE: 'bg-secondary', BLOCKED: 'bg-danger', PENDING: 'bg-warning text-dark' }
  return <span className={`badge ${map[status] ?? 'bg-secondary'}`}>{status ?? '—'}</span>
}

function KycBadge({ status }) {
  const map = { PENDING: 'bg-warning text-dark', VERIFIED: 'bg-success', REJECTED: 'bg-danger' }
  return <span className={`badge ${map[status] ?? 'bg-secondary'}`}>{status ?? '—'}</span>
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

// ── main component ────────────────────────────────────────────────────────────

export default function Users() {
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  // filter state
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate]     = useState('')
  const [month, setMonth]         = useState('')
  const [year, setYear]           = useState('')
  const [viewMode, setViewMode]   = useState('weekly')

  const chartRef      = useRef(null)
  const chartInstance = useRef(null)

  // ── fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`)
        return res.json()
      })
      .then(json => {
        if (json.success) setAllUsers([...json.data].sort((a, b) => a.id - b.id))
        else throw new Error(json.message || 'Failed to load users')
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // ── filter users that have a createdAt ────────────────────────────────────
  const chartUsers = useMemo(() => {
    let filtered = allUsers.filter(u => u.createdAt)

    if (startDate || endDate) {
      const s = startDate ? parseLocalDate(startDate) : null
      const e = endDate ? parseLocalDate(endDate) : null
      if (e) e.setHours(23, 59, 59, 999)
      filtered = filtered.filter(u => {
        const d = new Date(u.createdAt)
        if (s && d < s) return false
        if (e && d > e) return false
        return true
      })
    } else if (month && year) {
      filtered = filtered.filter(u => {
        const d = new Date(u.createdAt)
        return d.getMonth() + 1 === parseInt(month) && d.getFullYear() === parseInt(year)
      })
    } else if (month) {
      filtered = filtered.filter(u => new Date(u.createdAt).getMonth() + 1 === parseInt(month))
    } else if (year) {
      filtered = filtered.filter(u => new Date(u.createdAt).getFullYear() === parseInt(year))
    }

    return filtered
  }, [allUsers, startDate, endDate, month, year])

  const grouped = useMemo(() => groupUsers(chartUsers, viewMode), [chartUsers, viewMode])

  const hasFilter = startDate || endDate || month || year
  const tableUsers = hasFilter ? chartUsers : allUsers

  // ── create chart once ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!chartRef.current) return
    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'New Users',
          data: [],
          backgroundColor: 'rgba(54,162,235,0.65)',
          borderColor: 'rgba(54,162,235,1)',
          borderWidth: 1,
          borderRadius: 5,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: ctx => ` ${ctx.parsed.y} new user${ctx.parsed.y !== 1 ? 's' : ''}` },
          },
        },
        scales: {
          x: { grid: { color: gridColor } },
          y: { grid: { color: gridColor }, beginAtZero: true, ticks: { stepSize: 1, precision: 0 } },
        },
      },
    })
    return () => { chartInstance.current?.destroy(); chartInstance.current = null }
  }, [])

  // ── update chart data whenever grouped changes ────────────────────────────
  useEffect(() => {
    if (!chartInstance.current) return
    chartInstance.current.data.labels                 = grouped.map(g => g.label)
    chartInstance.current.data.datasets[0].data       = grouped.map(g => g.count)
    chartInstance.current.update()
  }, [grouped])

  // ── reset filters ─────────────────────────────────────────────────────────
  function handleReset() {
    setStartDate(''); setEndDate(''); setMonth(''); setYear('')
  }

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="page-header">
        <h3 className="page-title">Users</h3>
      </div>

      {/* ── Chart Card ── */}
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">

              {/* title + view mode toggle */}
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                <h4 className="card-title mb-0">New Users — {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Overview</h4>
                <div className="btn-group btn-group-sm mt-2 mt-sm-0">
                  {['weekly', 'monthly', 'yearly'].map(m => (
                    <button
                      key={m}
                      type="button"
                      className={`btn ${viewMode === m ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setViewMode(m)}
                    >
                      {m.charAt(0).toUpperCase() + m.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* filter row */}
              <div className="row g-2 mb-3 align-items-end">
                <div className="col-6 col-md-3">
                  <label className="form-label small text-muted mb-1">Start Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    value={startDate}
                    onChange={e => { setStartDate(e.target.value); setMonth(''); setYear('') }}
                  />
                </div>
                <div className="col-6 col-md-3">
                  <label className="form-label small text-muted mb-1">End Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    value={endDate}
                    min={startDate}
                    onChange={e => { setEndDate(e.target.value); setMonth(''); setYear('') }}
                  />
                </div>
                
                <div className="col-12 col-md-2">
                  <button className="btn btn-sm btn-outline-secondary w-100" onClick={handleReset}>
                    <i className="mdi mdi-refresh me-1"></i>Reset
                  </button>
                </div>
              </div>

              {/* chart */}
              <div style={{ position: 'relative', minHeight: '220px' }}>
                <canvas ref={chartRef} style={{ maxHeight: '280px' }}></canvas>
                {grouped.length === 0 && (
                  <div className="text-center text-muted py-4" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="mdi mdi-chart-bar mdi-48px d-block mb-1"></i>
                    No registration data for the selected period
                  </div>
                )}
              </div>

              <p className="text-muted small mt-2 mb-0">
                {grouped.length} {viewMode} period{grouped.length !== 1 ? 's' : ''} &nbsp;·&nbsp;
                {chartUsers.length} user{chartUsers.length !== 1 ? 's' : ''} with a registration date
                {allUsers.length - chartUsers.length > 0 && ` (${allUsers.length - chartUsers.length} without date excluded)`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Table Card ── */}
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="card-title mb-0">All Users</h4>
                {!loading && !error && (
                  <span className="badge bg-primary">
                    {hasFilter ? `${tableUsers.length} of ${allUsers.length}` : `${allUsers.length}`} users
                  </span>
                )}
              </div>

              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-muted mt-2">Fetching users...</p>
                </div>
              )}

              {error && (
                <div className="alert alert-danger d-flex align-items-center">
                  <i className="mdi mdi-alert-circle me-2"></i>{error}
                </div>
              )}

              {!loading && !error && (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Phone Verified</th>
                        <th>Email Verified</th>
                        <th>KYC</th>
                        <th>Account Status</th>
                        <th>Onboarding</th>
                        <th>Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableUsers.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.name ?? <span className="text-muted">—</span>}</td>
                          <td>{user.email ?? <span className="text-muted">—</span>}</td>
                          <td>{user.phone_number}</td>
                          <td><Badge value={user.phone_verified} /></td>
                          <td><Badge value={user.email_verified} /></td>
                          <td><KycBadge status={user.kyc_verification} /></td>
                          <td><StatusBadge status={user.account_status} /></td>
                          <td><span className="text-muted small">{user.onboarding_status ?? '—'}</span></td>
                          <td className="text-muted small">{fmtDate(user.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
