import { api } from '../lib/axios'

export interface GetAppointmentsServiceResponse {
  data: Array<{
    id: string
    starts_at: string
    ends_at: string
    customer: {
      id: string
      name: string
      email: string
      role: string
    }
    broker: {
      id: string
      name: string
      email: string
      role: string
    }
  }>
}

export async function getAppointmentsService() {
  const result = await api.get<GetAppointmentsServiceResponse>('/appointments')
  return result.data.data
}
