import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.REACT_APP_API,
})

export const createSession = async (email, password) => {
  return api.post('/sessions', { email, password })
}

export const getUsers = async () => {
  return api.get('/users')
}

export const getUserById = async (id) => {
  return api.get(`/user/${id}`)
}

export const createUser = async (objInfo) => {
  try {
    return await api.post('/createUser', objInfo)
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data,
    }
  }
}

export const updateUser = async (objInfo) => {
  try {
    return await api.put('/updateUser', objInfo)
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data,
    }
  }
}

export const deleteUserById = async (id) => {
  return api.delete(`/deleteUser/${id}`)
}

export const toggleTheme = async (id, theme) => {
  return api.post('/toggleTheme', { id, theme })
}

export const apiViaCep = async (zipCode) => {
  return api.get(`https://viacep.com.br/ws/${zipCode}/json/`)
}
