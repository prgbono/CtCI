import axiosInstance from '../utils/axiosInstance'

const getProducts = (params) => axiosInstance.get('/api/products', { params })
const getProductById = (id) => axiosInstance.get(`/api/products/${id}`)
const createProduct = (data) => axiosInstance.post('/api/products', data)

export default {
  getProducts,
  getProductById,
  createProduct
}
