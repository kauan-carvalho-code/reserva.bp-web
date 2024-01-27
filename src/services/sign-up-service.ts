import { api } from '../lib/axios'

export interface SignUpServiceRequest {
  name: string
  email: string
  password: string
  role: 'broker' | 'customer'
}

export interface SignUpServiceResponse {
  data: {
    id: string
    name: string
    email: string
    role: 'broker' | 'customer'
  }
}

export async function signUpService(request: SignUpServiceRequest) {
  const response = await api.post<SignUpServiceResponse>(
    '/auth/sign-up',
    request,
  )

  return response.data.data
}
