import axios, { AxiosError, CancelTokenSource } from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'

interface UseApiReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
  request: (...args: unknown[]) => Promise<void>
}

interface ApiFunc<T> {
  (...args: unknown[]): Promise<{ data: T }>
}

const useApi = <T>(apiFunc: ApiFunc<T>, immediate = false): UseApiReturn<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(immediate)
  const [error, setError] = useState<string | null>(null)
  const cancelTokenSource = useRef<CancelTokenSource | null>(null)

  const request = useCallback(
    async (...args: unknown[]) => {
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
          console.log('Request canceled:', (err as AxiosError).message)
        } else {
          setError((err as Error).message)
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
