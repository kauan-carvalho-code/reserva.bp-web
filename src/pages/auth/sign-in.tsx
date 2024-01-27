import { useForm } from 'react-hook-form'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

import {
  Link as ChakraLink,
  Grid,
  Box,
  Button,
  useToast,
  Text,
} from '@chakra-ui/react'

import { Input } from '../../components/ui/input'

import { signInService } from '../../services/sign-in-service'

import { useMutation } from '@tanstack/react-query'

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
})

type SignInSchema = yup.InferType<typeof signInSchema>

export const SignIn = () => {
  /*
   * Hooks
   */
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: signIn } = useMutation({
    mutationFn: signInService,
  })

  const navigate = useNavigate()

  const toast = useToast()

  const handleAuthenticate = async (data: SignInSchema) => {
    try {
      await signIn({
        email: data.email,
        password: data.password,
      })

      navigate('/')
    } catch (error) {
      toast({
        title: 'Erro ao criar conta',
        status: 'error',
      })
    }
  }

  return (
    <Box width="420px" borderWidth="1px" borderRadius="lg" padding="8">
      <Grid gap="6">
        <form onSubmit={handleSubmit(handleAuthenticate)}>
          <Grid gap="4">
            <Input
              {...register('email')}
              type="text"
              label="E-mail"
              error={{
                exists: Boolean(errors.email),
                message: errors.email?.message,
              }}
            />

            <Input
              {...register('password')}
              type="password"
              label="Senha"
              error={{
                exists: Boolean(errors.password),
                message: errors.password?.message,
              }}
            />

            <Button type="submit" isDisabled={isSubmitting}>
              Entrar
            </Button>
          </Grid>
        </form>

        <Text>
          Não tem uma conta?{' '}
          <ChakraLink fontSize="sm" href="/sign-up" textColor="cyan.600">
            Registre-se
          </ChakraLink>
        </Text>
      </Grid>
    </Box>
  )
}
