import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './layouts/app'
import { AuthLayout } from './layouts/auth'

import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { NotFound } from './pages/404'

import { Schedule } from './pages/app/schedule'
import { Appointments } from './pages/app/appointments'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Appointments />,
      },
      {
        path: '/schedule',
        element: <Schedule />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
])
