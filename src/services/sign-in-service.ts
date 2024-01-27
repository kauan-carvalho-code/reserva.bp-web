import { api } from '../lib/axios'

export interface SignInServiceRequest {
  email: string
  password: string
}

export interface SignInServiceResponse {
  message: string
}

export async function signInService(request: SignInServiceRequest) {
  const response = await api.post<SignInServiceResponse>(
    '/auth/sign-in',
    request,
  )

  return response.data
}
