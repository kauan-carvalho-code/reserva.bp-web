import { useForm } from 'react-hook-form'

import * as yup from 'yup'

import { useMutation, useQuery } from '@tanstack/react-query'

import { yupResolver } from '@hookform/resolvers/yup'

import { Box, Button, Flex, Grid, Heading, useToast } from '@chakra-ui/react'

import { Input } from '../../components/ui/input'

import { Select } from '../../components/ui/select'

import { getBrokersService } from '../../services/get-brokers-service'

import {
  CreateAppointmentServiceError,
  createAppointmentService,
} from '../../services/create-appointment-service'

const scheduleSchema = yup.object().shape({
  broker_id: yup.string().required('Corretora de seguros é obrigatória'),

  starts_at: yup
    .date()
    .typeError('Por favor, selecione uma data válida')
    .required('A data de início é obrigatória'),

  ends_at: yup
    .date()
    .typeError('Por favor, selecione uma data válida')
    .required('A data de término é obrigatória')
    .min(
      yup.ref('starts_at'),
      'A data de término deve ser igual ou posterior à data de início',
    ),
})

type ScheculeSchema = yup.InferType<typeof scheduleSchema>

export const Schedule = () => {
  /*
   * Hooks
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ScheculeSchema>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(scheduleSchema),
  })

  const { data: brokers } = useQuery({
    queryKey: ['brokers'],
    queryFn: getBrokersService,
  })

  const { mutateAsync: createAppointment } = useMutation({
    mutationFn: createAppointmentService,
  })

  const toast = useToast()

  const handleCreateAppointment = async (data: ScheculeSchema) => {
    try {
      await createAppointment({
        broker_id: data.broker_id,
        starts_at: data.starts_at,
        ends_at: data.ends_at,
      })

      toast({
        title: 'Agendamento concluído com sucesso',
        status: 'success',
      })

      reset()
    } catch (error) {
      const { response } = error as CreateAppointmentServiceError

      toast({
        title: response.data.error ?? 'Unknown error',
        status: 'error',
      })
    }
  }

  return (
    <Box width="420px" borderWidth="1px" borderRadius="lg" padding="8">
      <Flex direction="column" justifyContent="center" gap="4" marginX="auto">
        <Flex direction="column" gap="2">
          <Heading fontSize="x-large" fontWeight="semibold">
            Novo agendamento
          </Heading>
        </Flex>

        <form onSubmit={handleSubmit(handleCreateAppointment)}>
          <Grid gap="4">
            <Select
              {...register('broker_id')}
              label="Escolha o seu corretor"
              error={{
                exists: Boolean(errors.broker_id),
                message: errors.broker_id?.message,
              }}
            >
              {brokers?.map((broker) => (
                <option key={broker.id} value={broker.id}>
                  {broker.name}
                </option>
              ))}
            </Select>

            <Input
              {...register('starts_at')}
              label="Data de início"
              type="datetime-local"
              error={{
                exists: Boolean(errors.starts_at),
                message: errors.starts_at?.message,
              }}
            />

            <Input
              {...register('ends_at')}
              label="Data de término"
              type="datetime-local"
              error={{
                exists: Boolean(errors.ends_at),
                message: errors.ends_at?.message,
              }}
            />

            <Button type="submit" isLoading={isSubmitting}>
              Agendar
            </Button>
          </Grid>
        </form>
      </Flex>
    </Box>
  )
}
