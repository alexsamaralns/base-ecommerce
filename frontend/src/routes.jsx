import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Users = React.lazy(() => import('./views/pages/register/users/Users'))
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'))

const routes = [
  { path: '/', name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/register/users', name: 'Theme', element: Users },
]

export default routes
