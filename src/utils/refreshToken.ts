import $host from './axios'

export default async function refreshToken() {
  const refresh = localStorage.getItem('refresh')
  try {
    const { data } = await $host.post('/auth/refresh', refresh)
    localStorage.setItem('access', data.access)
    return data.access
  } catch (e) {
    console.log(e)
  }
}
