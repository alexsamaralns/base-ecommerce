import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUsers } from '../../services/api'

const Dashboard = () => {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer)

  useEffect(() => {
    const getData = async () => {
      const response = await getUsers()
      // console.log('users: ', response.data)
    }

    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h1>Dashboard</h1>
    </>
  )
}

export default Dashboard
