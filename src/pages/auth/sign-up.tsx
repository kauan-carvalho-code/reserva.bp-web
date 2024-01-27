import { useForm } from 'react-hook-form'

import { useNavigate } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

import {
  Link as ChakraLink,
  Grid,
  Box,
  Button,
  Flex,
  Heading,
  useToast,
} from '@chakra-ui/react'

import { Input } from '../../components/ui/input'

import { Select } from '../../components/ui/select'

import { signUpService } from '../../services/sign-up-service'

import { useMutation } from '@tanstack/react-query'

const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, 'O nome deve conter pelo menos 1 caractere')
    .max(255, 'O nome deve ter no máximo 255 caracteres')
    .required('O nome é obrigatório'),
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não coincidem'),
  role: yup
    .string()
    .oneOf(
      ['broker', 'customer'],
      "O cargo deve ser 'corretor de seguros' ou 'cliente'",
    )
    .required(),
})

type SignUpSchema = yup.InferType<typeof signUpSchema>

export const SignUp = () => {
  /*
   * Hooks
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(signUpSchema),
  })

  const { mutateAsync: signUp } = useMutation({
    mutationFn: signUpService,
  })

  const navigate = useNavigate()

  const toast = useToast()

  const handleRegister = async (data: SignUpSchema) => {
    try {
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      })

      toast({
        title: 'Cadastro concluído com sucesso',
        status: 'success',
      })

      navigate(`/sign-in?email=${data.email}`)
    } catch (error) {
      toast({
        title: 'Erro ao criar conta',
        status: 'error',
      })
    }
  }

  return (
    <Box width="420px" borderWidth="1px" borderRadius="lg" padding="8">
      <ChakraLink fontSize="sm" href="/sign-in" textColor="cyan.600">
        Voltar para login
      </ChakraLink>

      <Flex direction="column" justifyContent="center" gap="4" marginX="auto">
        <Flex direction="column" gap="2">
          <Heading fontSize="x-large" fontWeight="semibold">
            Crie sua conta
          </Heading>
        </Flex>

        <form onSubmit={handleSubmit(handleRegister)}>
          <Grid gap="4">
            <Input
              {...register('name')}
              type="text"
              label="Nome"
              error={{
                exists: Boolean(errors.name),
                message: errors.name?.message,
              }}
            />

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

            <Input
              {...register('password_confirmation')}
              type="password"
              label="Confirmar senha"
              error={{
                exists: Boolean(errors.password_confirmation),
                message: errors.password_confirmation?.message,
              }}
            />

            <Select
              {...register('role')}
              label="Escolha o seu cargo"
              error={{
                exists: Boolean(errors.role),
                message: errors.role?.message,
              }}
            >
              <option value="customer">Cliente</option>
              <option value="broker">Corretor de seguros</option>
            </Select>

            <Button type="submit" isDisabled={isSubmitting}>
              Finalizar cadastro
            </Button>
          </Grid>
        </form>
      </Flex>
    </Box>
  )
}
