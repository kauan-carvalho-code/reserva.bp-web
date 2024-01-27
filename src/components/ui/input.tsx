import { forwardRef } from 'react'

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'

export interface InputError {
  exists: boolean
  message?: string
}

export interface InputProps extends ChakraInputProps {
  label: string
  error: InputError
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...rest }, ref) => (
    <FormControl isInvalid={error.exists}>
      <FormLabel>{label}</FormLabel>

      <ChakraInput ref={ref} {...rest} />

      {error.message ? (
        <FormErrorMessage>{error.message}</FormErrorMessage>
      ) : null}
    </FormControl>
  ),
)

Input.displayName = 'Input'
