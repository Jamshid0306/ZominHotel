export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const withBaseUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${API_BASE_URL}${path}`
}

export const getCookie = (name) => {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${escapedName}=([^;]*)`)
  )
  return match ? decodeURIComponent(match[1]) : ''
}

export const setCookie = (name, value, minutes) => {
  const encodedValue = encodeURIComponent(value)
  let cookie = `${name}=${encodedValue}; Path=/; SameSite=Lax`
  if (typeof minutes === 'number') {
    cookie += `; Max-Age=${minutes * 60}`
  }
  document.cookie = cookie
}

export const deleteCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`
}
