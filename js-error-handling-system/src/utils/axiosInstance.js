import ERROR_MESSAGES from '../config/customErrors'
import axios from 'axios'
import { toast } from 'react-toastify'

const axiosInstance = axios.create({
  // TODO: environmet variable for baseURL
  baseURL: 'https://fakestoreapi.com/products',
  headers: { 'Content-type': 'application/json' }
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
    let notificationType = 'error'

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
    // toast.error(message)
    toast[notificationType](message)

    //TODO: Handle unathorized access by redireting to login
    if (status === 401) console.log('TODO: Redirection to login')

    return Promise.reject(error)
  }
)

export default axiosInstance
