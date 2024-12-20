import productService from '../services/productService'
import { toast } from 'react-toastify'
import useApi from '../hooks/useApi'
import { useEffect } from 'react'

const ProductList = () => {
  const { data, loading, error, request } = useApi(
    productService.getProducts,
    false
  )

  useEffect(() => {
    request({ page: 1, limit: 10 })
  }, [request])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  if (loading) return <p>Loading products...</p>

  interface Product {
    id: number
    image: string
    title: string
    price: number
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      {data?.map((product: Product) => (
        <div key={product.id} className="border rounded p-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover mb-4"
          />
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-700">${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductList
