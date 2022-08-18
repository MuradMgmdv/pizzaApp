import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'

function MainLayout() {
  return (
    // статика           <-----
    <div className="wrapper">
      <Header />
    {/* не известно что  <----- */ }
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
