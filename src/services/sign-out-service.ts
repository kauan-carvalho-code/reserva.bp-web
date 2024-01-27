import { api } from '../lib/axios'

export interface SignOutServiceResponse {
  message: string
}

export async function signOutService() {
  const response = await api.get<SignOutServiceResponse>('/auth/sign-out')
  return response.data
}
