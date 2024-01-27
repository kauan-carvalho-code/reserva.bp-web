import { useLayoutEffect } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'

import { isAxiosError } from 'axios'

import { Flex } from '@chakra-ui/react'

import { Header } from '../components/header'

import { SideBar } from '../components/sidebar'

import { api } from '../lib/axios'

export const AppLayout = () => {
  /*
   * Hooks
   */
  const navigate = useNavigate()

  useLayoutEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status

          if (status === 401) {
            navigate('/sign-in', {
              replace: true,
            })
          }
        }

        return Promise.reject(error)
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <Flex flexDirection="column" minH="100vh">
      <Header />

      <Flex height="calc(100vh - 64px)">
        <SideBar />

        <Flex
          flex="1"
          flexDir="column"
          align="center"
          justify="center"
          paddingY="6"
          paddingX="8"
        >
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  )
}
