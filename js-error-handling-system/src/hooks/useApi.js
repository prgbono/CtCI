import { useCallback, useState } from 'react'

const useApi = (apiFunc, immediate = false) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const request = useCallback(
    async (...args) => {
      setLoading(true)
      setError(null)
      try {
        const result = await apiFunc(...args)

        setData(result.data)
      } catch (err) {
        setError(err.message || err)
      } finally {
        setLoading(false)
      }
    },
    [apiFunc]
  )
  return { data, loading, error, request }
}

export default useApi
