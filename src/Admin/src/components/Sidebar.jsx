import { NavLink, useLocation } from 'react-router-dom'

function MenuItem({ to, icon, label }) {
  const { pathname } = useLocation()
  const isActive = pathname === to
  return (
    <li className={`nav-item menu-items${isActive ? ' active' : ''}`}>
      <NavLink className="nav-link" to={to}>
        <span className="menu-icon"><i className={`mdi ${icon}`}></i></span>
        <span className="menu-title">{label}</span>
      </NavLink>
    </li>
  )
}

function SubMenu({ id, icon, label, children }) {
  const location = useLocation()
  const isOpen = children.some(c => location.pathname === c.to)
  return (
    <li className={`nav-item menu-items${isOpen ? ' active' : ''}`}>
      <a
        className={`nav-link${isOpen ? '' : ' collapsed'}`}
        data-bs-toggle="collapse"
        href={`#${id}`}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <span className="menu-icon"><i className={`mdi ${icon}`}></i></span>
        <span className="menu-title">{label}</span>
        <i className="menu-arrow"></i>
      </a>
      <div className={`collapse${isOpen ? ' show' : ''}`} id={id}>
        <ul className="nav flex-column sub-menu">
          {children.map(c => (
            <li key={c.to} className="nav-item">
              <NavLink className="nav-link" to={c.to}>{c.label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default function Sidebar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <NavLink className="sidebar-brand brand-logo" to="/admin">
          <p className="logo-text">mywealthscore.ai</p>
        </NavLink>
        <NavLink className="sidebar-brand brand-logo-mini" to="/admin">
          <p className="logo-text1">MWS</p>
        </NavLink>
      </div>

      <ul className="nav">
        <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                <img className="img-xs rounded-circle" src="/assets/images/faces/face15.jpg" alt="" />
                <span className="count bg-success"></span>
              </div>
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal">Admin</h5>
                <span>Gold Member</span>
              </div>
            </div>
            <a href="#" id="profile-dropdown" data-bs-toggle="dropdown">
              <i className="mdi mdi-dots-vertical"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
              <a href="#" className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-cog text-primary"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1 text-small">Account settings</p>
                </div>
              </a>
            </div>
          </div>
        </li>

        <li className="nav-item nav-category">
          <span className="nav-link">Navigation</span>
        </li>

        <MenuItem to="/admin"             icon="mdi-speedometer"   label="Dashboard" />
        <MenuItem to="/admin/users"       icon="mdi-account-group" label="Users" />

        <SubMenu
          id="ui-basic"
          icon="mdi-laptop"
          label="Basic UI Elements"
          children={[
            { to: '/admin/ui/buttons',    label: 'Buttons' },
            { to: '/admin/ui/dropdowns',  label: 'Dropdowns' },
            { to: '/admin/ui/typography', label: 'Typography' },
          ]}
        />

        <MenuItem to="/admin/forms"  icon="mdi-playlist-play" label="Form Elements" />
        <MenuItem to="/admin/tables" icon="mdi-table-large"   label="Tables" />
        <MenuItem to="/admin/charts" icon="mdi-chart-bar"     label="Charts" />
        <MenuItem to="/admin/icons"  icon="mdi-contacts"      label="Icons" />
      </ul>
    </nav>
  )
}
