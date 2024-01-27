import { Container, Flex } from '@chakra-ui/react'

import { Outlet } from 'react-router-dom'

import { Logo } from '../components/logo'

import Canudinho from '../assets/nomedela.png'

export const AuthLayout = () => (
  <Container
    minH="100vh"
    maxW="none"
    display="grid"
    gridTemplateColumns="repeat(2, 1fr)"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <Flex
      flexDir="column"
      borderRightWidth="1px"
      p="10"
      h="full"
      backgroundImage={Canudinho}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Logo />
    </Flex>

    <Flex minH="100vh" flexDir="column" align="center" justify="center">
      <Outlet />
    </Flex>
  </Container>
)
