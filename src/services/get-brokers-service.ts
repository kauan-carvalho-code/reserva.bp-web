import { api } from '../lib/axios'

export interface GetBrokersServiceResponse {
  data: Array<{
    id: string
    name: string
    email: string
    role: 'broker' | 'customer'
  }>
}

export async function getBrokersService() {
  const response = await api.get<GetBrokersServiceResponse>('/users/brokers')
  return response.data.data
}
