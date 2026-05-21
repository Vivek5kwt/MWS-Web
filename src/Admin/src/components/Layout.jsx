import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer'

function toggleSidebar() {
  document.body.classList.toggle('sidebar-icon-only')
}

function toggleOffcanvas() {
  document.querySelector('.sidebar-offcanvas')?.classList.toggle('active')
}

export default function Layout() {
  useEffect(() => {
    document.body.classList.add('sidebar-fixed')
    return () => document.body.classList.remove('sidebar-fixed')
  }, [])

  return (
    <div className="container-scroller">
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Navbar onToggleSidebar={toggleSidebar} onToggleOffcanvas={toggleOffcanvas} />
        <div className="main-panel">
          <div className="content-wrapper">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
