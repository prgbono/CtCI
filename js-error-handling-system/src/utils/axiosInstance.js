import ERROR_MESSAGES from '../config/customErrors'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { toast } from 'react-toastify'
// import Router from 'next/router'

const axiosInstance = axios.create({
  // TODO:
  baseURL: process.env.NEXT_PUBLIC_API_ASE_URL || ' ',
  headers: { 'Content-type': 'application/json' }
})

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000, //Exponential backoff
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.response.status === 500
    )
  },
  onRetry: (retryCount, error, requestConfig) => {
    console.log(`Retrying request to ${requestConfig.url} (${retryCount}/3)`)
  }
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error(ERROR_MESSAGES.NEWTOWK_ERROR)
      return Promise.reject(error)
    }

    const { status, data } = error.response
    let message = ERROR_MESSAGES[status] || ERROR_MESSAGES.GENERIC_ERROR
    let notificationType = 'error' // default notification type

    // Customization for specific error types
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
    // toast.error(message)
    toast[notificationType](message)

    //TODO: Handle unathorized access by redireting to login
    if (status === 401) console.log('TODO Redirection to login')
    //if (status === 401) Router.push('/login')

    return Promise.reject(error)
  }
)

export default axiosInstance
