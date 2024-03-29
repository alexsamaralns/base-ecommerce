import React, { useState, useEffect, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, logoutUser } from '../redux/user/actions'
import { changeTheme } from '../redux/theme/actions'
import { useNavigate } from 'react-router-dom'
import { api, createSession } from '../services/api'

export const AuthContext = createContext()

/* eslint-disable react/prop-types */
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer)
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser)
      api.defaults.headers.Authorization = `Bearer ${currentUser.token}`
    } else {
      logout()
    }

    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = async (email, password) => {
    if (email && password) {
      const response = await createSession(email, password)

      if (response.data.error === undefined) {
        const loggedUser = response.data.userInfo
        const token = response.data.token

        api.defaults.headers.Authorization = `Bearer ${token}`
        setUser(loggedUser)

        dispatch(changeTheme(loggedUser.theme))

        dispatch(
          loginUser({
            id: loggedUser.id,
            name: loggedUser.name,
            email: loggedUser.email,
            type_user: loggedUser.type_user,
            theme: loggedUser.theme,
            token: token,
          }),
        )

        return response.data.message
      } else {
        return response.data.error
      }
    }

    return 'Please enter all fields.'
  }

  const logout = () => {
    setUser(null)
    api.defaults.headers.Authorization = null
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
