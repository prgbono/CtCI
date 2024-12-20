import axiosInstance from '../utils/axiosInstance'

const getProducts = (params: unknown) => axiosInstance.get('/', { params }) //First param '/' will be concatenated to baseUrl value in axionsInstance = axios.create({...})
// const getProductById = (id) => axiosInstance.get(`/api/products/${id}`)
// const createProduct = (data) => axiosInstance.post('/api/products', data)

export default {
  getProducts
  // getProductById,
  // createProduct
}
