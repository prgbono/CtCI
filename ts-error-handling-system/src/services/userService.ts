import axiosInstance from '../utils/axiosInstance'

const getUsers = (params) => axiosInstance.get('/api/users', { params })
const getUserById = (id) => axiosInstance.get(`/api/users/${id}`)
const createUser = (data) => axiosInstance.post('/api/users', data)

export default {
  getUsers,
  getUserById,
  createUser
}
