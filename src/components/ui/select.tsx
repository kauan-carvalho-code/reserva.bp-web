import { forwardRef } from 'react'

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/react'

export interface SelectError {
  exists: boolean
  message?: string
}

export interface SelectProps extends ChakraSelectProps {
  label: string
  error: SelectError
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  ({ children, label, error, ...rest }, ref) => (
    <FormControl isInvalid={error.exists}>
      <FormLabel>{label}</FormLabel>

      <ChakraSelect ref={ref} {...rest}>
        {children}
      </ChakraSelect>

      {error.message ? (
        <FormErrorMessage>{error.message}</FormErrorMessage>
      ) : null}
    </FormControl>
  ),
)

Select.displayName = 'Select'
