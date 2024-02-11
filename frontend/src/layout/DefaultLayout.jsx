import React from 'react'
import { useSelector } from 'react-redux'
import { AppContent, AppSidebar, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const { themeContent, themeHeader, themeSidebar } = useSelector(
    (rootReducer) => rootReducer.changeThemeReducer,
  )

  return (
    <div>
      <AppSidebar themeSidebar={themeSidebar} />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader themeHeader={themeHeader} />
        <div className={`body flex-grow-1 ${themeContent}`}>
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default DefaultLayout
