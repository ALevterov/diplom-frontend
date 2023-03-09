import axios from 'axios'
import { verifyToken } from '../components/AuthProvider'
import refreshToken from './refreshToken'

const RE_AUTH = 'RE_AUTH'

let baseURL: string =
  import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PREFIX

const $host = axios.create({
  baseURL,
})
const authInterceptor = (config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access')}`
  return config
}
$host.interceptors.request.use(authInterceptor)
$host.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    console.log(error.response.status)
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      const refresh_token = localStorage.getItem('refresh')
      if (!verifyToken(refresh_token)) {
        return Promise.reject(new Error(RE_AUTH))
      }
      originalRequest._retry = true
      const access_token = await refreshToken()
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
      return $host(originalRequest)
    }
    return Promise.reject(error)
  }
)

export default $host
