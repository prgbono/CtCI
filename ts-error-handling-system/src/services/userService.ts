import axiosInstance from '../utils/axiosInstance'

interface User {
  id: number
  name: string
  email: string
}

const getUsers = (params: User) =>
  axiosInstance.get<User[]>('/api/users', { params })
const getUserById = (id: number) => axiosInstance.get(`/api/users/${id}`)
const createUser = (data: unknown) => axiosInstance.post('/api/users', data)

export default {
  getUsers,
  getUserById,
  createUser
}
