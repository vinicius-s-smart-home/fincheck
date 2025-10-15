import axios from 'axios'
import { localStorageKeys } from '../config/localStorageKeys'
import { sleep } from '../utils/sleep'

export const httpClient = axios.create({
  baseURL: `${(import.meta.env.VITE_USE_API === "true" ? import.meta.env.VITE_API_URL : window.location.origin + '/api')}`,
})

httpClient.interceptors.request.use(async config => {
  const acessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)

  if (acessToken) {
    config.headers.Authorization = `Bearer ${acessToken}`
  }

  return config
})

httpClient.interceptors.response.use(async data => {
  await sleep(500)

  return data
})
