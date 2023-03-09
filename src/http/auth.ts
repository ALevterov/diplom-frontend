import $host from '../utils/axios'

export interface ILogin {
  username: string
  password: string
}
export type Role = 'Admin' | 'User'

interface IResponseData {
  access: string
  refresh: string
  user: {
    username: string
    roles: Role[]
  }
}

export async function loginReq(
  formData: FormData
): Promise<{ data: IResponseData }> {
  const response = await $host.post('/auth/login', formData)
  return response
}
export async function registerReq(
  formData: FormData
): Promise<{ data: IResponseData }> {
  const response = await $host.post('/auth/register', formData)
  return response
}
