import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

import { ChakraProvider, UseToastOptions } from '@chakra-ui/react'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from './lib/react-query'

const toastOptions: UseToastOptions = {
  position: 'top-right',
  duration: 5000,
  isClosable: true,
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider toastOptions={{ defaultOptions: toastOptions }}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
