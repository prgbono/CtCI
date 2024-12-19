import axios, { AxiosError } from 'axios'

import ERROR_MESSAGES from '../config/customErrors'
import axiosRetry from 'axios-retry'
import { toast } from 'react-toastify'

const axiosInstance = axios.create({
  // TODO: environmet variable for baseURL
  baseURL: 'https://fakestoreapi.com/products',
  headers: { 'Content-type': 'application/json' }
})

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (retryCount: number) => retryCount * 1000,
  retryCondition: (error: AxiosError): boolean | Promise<boolean> => {
    return !!(
      error.response &&
      (axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        error.response.status === 500)
    )
  },
  onRetry: (retryCount, error) => {
    console.log(`Retrying request to ${error.config?.url} (${retryCount}/3)`)
  }
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error(ERROR_MESSAGES.NETWORK_ERROR)
      return Promise.reject(error)
    }

    const { status, data } = error.response
    let message =
      ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES] ||
      ERROR_MESSAGES.GENERIC_ERROR
    let notificationType: 'error' | 'info' | 'warning' | 'success' = 'error'

    // Custom logic for customising errors types
    if (data?.type === 'validation') {
      message = `Validation error ${data.message}`
      notificationType = 'warning'
    } else if (data?.type === 'authentication') {
      message = `Authentication error ${data.message}`
      notificationType = 'error'
    } else if (status === 404) {
      message = 'ERROR_MESSAGES.NOT_FOUND'
      notificationType = 'info'
    }

    // Display error notification with appropriate severity
    toast[notificationType](message)

    //TODO: Handle unathorized access by redireting to login
    if (status === 401) console.log('TODO: Redirection to login')

    return Promise.reject(error)
  }
)

export default axiosInstance
