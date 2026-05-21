import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Buttons from './pages/Buttons'
import Dropdowns from './pages/Dropdowns'
import Typography from './pages/Typography'
import Forms from './pages/Forms'
import Tables from './pages/Tables'
import Charts from './pages/Charts'
import Icons from './pages/Icons'
import BlankPage from './pages/BlankPage'
import Users from './pages/Users'

import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/vendors/css/vendor.bundle.base.css'
import './assets/css/style.css'

export default function AdminApp() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="ui/buttons"    element={<Buttons />} />
        <Route path="ui/dropdowns"  element={<Dropdowns />} />
        <Route path="ui/typography" element={<Typography />} />
        <Route path="forms"         element={<Forms />} />
        <Route path="tables"        element={<Tables />} />
        <Route path="charts"        element={<Charts />} />
        <Route path="icons"         element={<Icons />} />
        <Route path="blank"         element={<BlankPage />} />
        <Route path="users"         element={<Users />} />
      </Route>
    </Routes>
  )
}
