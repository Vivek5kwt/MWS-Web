import { useEffect, useState } from 'react'
import {
  Chart,
  LineController, BarController, DoughnutController, PieController, ScatterController,
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement,
  Legend, Tooltip, Filler,
} from 'chart.js'

Chart.register(
  LineController, BarController, DoughnutController, PieController, ScatterController,
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement,
  Legend, Tooltip, Filler,
)

const labels = ['2013', '2014', '2014', '2015', '2016', '2017']
const bgColors = [
  'rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)',
  'rgba(75,192,192,0.2)', 'rgba(153,102,255,0.2)', 'rgba(255,159,64,0.2)',
]
const borderColors = [
  'rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)',
  'rgba(75,192,192,1)', 'rgba(153,102,255,1)', 'rgba(255,159,64,1)',
]

const gridColor = 'rgba(204,204,204,0.1)'
const commonScales = {
  x: { grid: { color: gridColor } },
  y: { grid: { color: gridColor }, beginAtZero: true },
}

function initChart(id, config) {
  const el = document.getElementById(id)
  if (!el) return null
  return new Chart(el.getContext('2d'), config)
}

function getWeekStart(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const start = new Date(d)
  start.setDate(diff)
  start.setHours(0, 0, 0, 0)
  return start
}

function groupWeekly(users) {
  const map = {}
  users.forEach(u => {
    if (!u.createdAt) return
    const ws = getWeekStart(new Date(u.createdAt))
    const we = new Date(ws)
    we.setDate(ws.getDate() + 6)
    const key = ws.toISOString().split('T')[0]
    const fmt = dt => dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
    if (!map[key]) map[key] = { label: `${fmt(ws)} – ${fmt(we)}`, count: 0 }
    map[key].count++
  })
  return Object.entries(map)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([, v]) => v)
}

export default function Charts() {
  const [weeklyStats, setWeeklyStats] = useState(null)

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(json => {
        if (!json.success) return
        const grouped = groupWeekly(json.data)
        const noDate = json.data.filter(u => !u.createdAt).length
        const weekLabels = grouped.map(g => g.label)
        const weekData   = grouped.map(g => g.count)
        const weekColors = grouped.map(() => 'rgba(54,162,235,0.65)')
        const weekBorder = grouped.map(() => 'rgba(54,162,235,1)')
        if (noDate > 0) {
          weekLabels.push('No Date')
          weekData.push(noDate)
          weekColors.push('rgba(255,99,132,0.65)')
          weekBorder.push('rgba(255,99,132,1)')
        }
        setWeeklyStats({ labels: weekLabels, data: weekData, colors: weekColors, borders: weekBorder })
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!weeklyStats) return
    const chart = initChart('barChart', {
      type: 'bar',
      data: {
        labels: weeklyStats.labels,
        datasets: [{
          label: 'New Users',
          data: weeklyStats.data,
          backgroundColor: weeklyStats.colors,
          borderColor: weeklyStats.borders,
          borderWidth: 1,
          borderRadius: 4,
        }],
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => {
                const suffix = ctx.parsed.y !== 1 ? 's' : ''
                const prefix = ctx.label === 'No Date' ? ' no registration date' : ' new user'
                return ` ${ctx.parsed.y}${prefix}${suffix}`
              },
            },
          },
        },
        scales: {
          ...commonScales,
          y: { ...commonScales.y, ticks: { stepSize: 1, precision: 0 } },
        },
      },
    })
    return () => chart?.destroy()
  }, [weeklyStats])

  useEffect(() => {
    const charts = []

    charts.push(initChart('lineChart', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: '# of Votes',
          data: [10, 19, 3, 5, 2, 3],
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 1,
          fill: false,
          tension: 0.5,
        }],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: commonScales,
        elements: { point: { radius: 0 } },
      },
    }))

    charts.push(initChart('areaChart', {
      type: 'line',
      data: {
        labels: ['2013', '2014', '2015', '2016', '2017'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 1,
          fill: true,
          tension: 0.5,
        }],
      },
      options: {
        plugins: { legend: { display: false }, filler: { propagate: true } },
        scales: commonScales,
      },
    }))

    const doughnutPieData = {
      labels: ['Pink', 'Blue', 'Yellow'],
      datasets: [{
        data: [30, 40, 30],
        backgroundColor: bgColors,
        borderColor: borderColors,
      }],
    }
    const doughnutPieOptions = {
      responsive: true,
      animation: { animateScale: true, animateRotate: true },
    }

    charts.push(initChart('doughnutChart', {
      type: 'doughnut',
      data: doughnutPieData,
      options: doughnutPieOptions,
    }))

    charts.push(initChart('pieChart', {
      type: 'pie',
      data: doughnutPieData,
      options: doughnutPieOptions,
    }))

    charts.push(initChart('scatterChart', {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'First Dataset',
            data: [{ x: -10, y: 0 }, { x: 0, y: 3 }, { x: -25, y: 5 }, { x: 40, y: 5 }],
            backgroundColor: ['rgba(255,99,132,0.2)'],
            borderColor: ['rgba(255,99,132,1)'],
            borderWidth: 1,
          },
          {
            label: 'Second Dataset',
            data: [{ x: 10, y: 5 }, { x: 20, y: -30 }, { x: -25, y: 15 }, { x: -10, y: 5 }],
            backgroundColor: ['rgba(54,162,235,0.2)'],
            borderColor: ['rgba(54,162,235,1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: { type: 'linear', position: 'bottom', grid: { color: gridColor } },
          y: { grid: { color: gridColor } },
        },
      },
    }))

    return () => charts.forEach(c => c?.destroy())
  }, [])

  return (
    <>
      <div className="page-header">
        <h3 className="page-title">Chart-js</h3>
      </div>

      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Line Chart</h4>
              <canvas id="lineChart" style={{ height: '250px' }}></canvas>
            </div>
          </div>
        </div>
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">New Users — Weekly</h4>
              <canvas id="barChart" style={{ height: '230px' }}></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Area Chart</h4>
              <canvas id="areaChart" style={{ height: '250px' }}></canvas>
            </div>
          </div>
        </div>
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Doughnut Chart</h4>
              <div className="doughnutjs-wrapper d-flex justify-content-center">
                <canvas id="doughnutChart" style={{ height: '250px' }}></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Pie Chart</h4>
              <div className="doughnutjs-wrapper d-flex justify-content-center">
                <canvas id="pieChart" style={{ height: '250px' }}></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Scatter Chart</h4>
              <canvas id="scatterChart" style={{ height: '250px' }}></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
