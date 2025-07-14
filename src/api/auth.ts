import axios from 'axios'
import { get, post } from './http'
import { RegisterData, LoginData } from '@/contexts/types'

const domain = process.env.NEXT_PUBLIC_BACKEND_API || 'https://api.id.magiclab.space'

export const registerUser = async (userData: RegisterData) => {
  const res = await axios.post(`${domain}/v1/identity/register`, userData)
  return res.data
}

export const resetPassword = async (data: { email: string; code: string; password: string }) => {
  const res = await axios.post(`${domain}/v1/identity/reset`, data)
  return res.data
}

export const sendResetCode = async (email: string) => {
  const res = await axios.post(`${domain}/v1/identity/reset/send-code`, { email })
  return res.data
}

export const loginUser = async (data: LoginData) => {
  const res = await axios.post(`${domain}/v1/identity/login`, data)
  return res.data
}

export const logoutUser = async () => {
  const res = await post('/v1/identity/logout', {})
  return res.data
}

export const fetchUser = async () => {
  const res = await get('/v1/identity/profile')
  return res.data
}