import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URI
axios.defaults.timeout = 60000

const token = JSON.parse(localStorage.getItem('token') || 'null')

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

axios.interceptors.response.use(
  (res: any) => res,
  (error: any) => {
    const { status } = error.response
    const req = error.config
    if (status === 500) {
      throw error
    }
    if (status === 401) {
      window.location.href = '/auth/login'
    }
    throw error
  }
)

export default axios

