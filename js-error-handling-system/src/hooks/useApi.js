import { useCallback, useEffect, useRef, useState } from 'react'

import axios from 'axios'

const useApi = (apiFunc, immediate = false) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)
  const cancelTokenSource = useRef(null)

  const request = useCallback(
    async (...args) => {
      setLoading(true)
      setError(null)

      // Cancel any previous request
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel(
          'Operation canceled due to new request.'
        )
      }

      cancelTokenSource.current = axios.CancelToken.source()

      try {
        const result = await apiFunc(...args, {
          cancelToken: cancelTokenSource.current.token
        })
        setData(result.data)
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message)
        } else {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    },
    [apiFunc]
  )

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel('Component unmounted')
      }
    }
  }, [])

  return { data, loading, error, request }
}

export default useApi
