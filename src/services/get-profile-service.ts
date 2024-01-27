import { api } from '../lib/axios'

export interface GetProfileServiceResponse {
  data: {
    id: string
    name: string
    email: string
    role: 'broker' | 'customer'
  }
}

export async function getProfileService() {
  const response = await api.get<GetProfileServiceResponse>('/users')
  return response.data.data
}
