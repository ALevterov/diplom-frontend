import $host from '../utils/axios'

export interface ILogin {
  username: string
  password: string
}
export async function loginReq(formData: FormData) {
  const response = await $host.post('/auth/login', formData)
  return response
}
export async function registerReq(formData: FormData) {
  const response = await $host.post('/auth/register', formData)
  return response
}
