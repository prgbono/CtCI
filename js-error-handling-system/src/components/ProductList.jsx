import React, { useEffect } from 'react'

import productService from '../services/productService'
import { toast } from 'react-toastify'
import useApi from '../hooks/useApi'

const ProductList = () => {
  // Initialize useApi with the getProducts service function
  const { data, loading, error, request } = useApi(
    productService.getProducts,
    false
  )

  // Trigger the API request when the component mounts
  useEffect(() => {
    request({ page: 1, limit: 10 })
  }, [request])

  // Display error notification if an error occurs
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  // Show loading state
  if (loading) return <p>Loading products...</p>

  // Render the list of products
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data?.data.map((product) => (
        <div key={product._id} className="border rounded p-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover mb-4"
          />
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-700">${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductList
