import { api } from '../lib/axios'

export interface CreateAppointmentServiceRequest {
  broker_id: string
  starts_at: Date
  ends_at: Date
}

export interface CreateAppointmentServiceResponse {
  data: {
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
  }
}

export interface CreateAppointmentServiceError {
  response: {
    data: {
      error: string
    }
  }
}

export async function createAppointmentService(
  request: CreateAppointmentServiceRequest,
) {
  const response = await api.post<CreateAppointmentServiceResponse>(
    '/appointments',
    request,
  )

  return response.data
}
