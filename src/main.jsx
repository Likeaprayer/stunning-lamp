import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Staff from './staff-page.jsx'
import StaffDashboard from './staff-dashboard.jsx'
import Artworks from './artworks-page.jsx'
import ArtworkDashboard from './artwork-dashboard.jsx'
import Dashboard from './dashboard-page.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/staff-dash" element={<StaffDashboard />} />
        <Route path="/art" element={<Artworks /> } />
        <Route path="/art-dash" element={<ArtworkDashboard />} />
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
  </StrictMode>,
)
