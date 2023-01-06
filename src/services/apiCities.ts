import axios, { AxiosError } from "axios"
import { parseCookies } from "nookies"

import { signOut } from "@contexts/AuthContext"

export const apiCities = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_GERENCIADOR_DE_LOCALIDADES_URL ??
    "http://localhost:3001"
})

apiCities.interceptors.request.use((config) => {
  const cookies = parseCookies()
  const token = cookies["schedula.token"]

  if (config && config?.headers && token)
    config.headers.Authorization = `Bearer ${token}`

  return config
})

apiCities.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      if (typeof window !== undefined) {
        signOut()
      }
    } else {
      return Promise.reject(error)
    }
  }
)
