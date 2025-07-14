import axios from 'axios'
import authConfig from '@/configs/auth'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API || 'https://api.id.magiclab.space',
})

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(authConfig.storageTokenKeyName)
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && window.location.pathname !== '/login') {
      localStorage.removeItem('access_token')
      localStorage.removeItem(authConfig.storageTokenKeyName)
      window.location.assign('/login')
    }
    throw err
  }
)

export const get = (url: string, params = {}) =>
  http.get(url, { params })

export const post = (url: string, data: any, params = {}) =>
  http.post(url, data, { params })

export const put = (url: string, data: any) =>
  http.put(url, data)

export const remove = (url: string, data: any, params = {}) =>
  http.delete(url, { params, data })

export const patch = (url: string, data: any) =>
  http.patch(url, data)

export default { http, get, post, put, remove, patch }