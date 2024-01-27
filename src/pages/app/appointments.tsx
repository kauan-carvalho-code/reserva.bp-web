import {
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

import { useQuery } from '@tanstack/react-query'

import { getAppointmentsService } from '../../services/get-appointments-service'

import { formatDate } from '../../utils/formatDate'

export const Appointments = () => {
  /*
   * Hooks
   */
  const { data: appointments } = useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointmentsService,
  })

  return (
    <Box
      maxWidth="1280px"
      width="100%"
      borderWidth="1px"
      borderRadius="lg"
      padding="8"
    >
      <Flex direction="column" justifyContent="center" gap="4" marginX="auto">
        <Flex direction="column" gap="2">
          <Heading fontSize="x-large" fontWeight="semibold">
            Meus agendamentos
          </Heading>
        </Flex>
      </Flex>

      <TableContainer mt="6">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Cliente</Th>
              <Th>Corretor</Th>
              <Th>Data de início</Th>
              <Th>Data de término</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointments
              ? appointments.map((appointment) => (
                  <Tr key={appointment.id}>
                    <Td>{appointment.customer.name}</Td>
                    <Td>{appointment.broker.name}</Td>
                    <Td>{formatDate(appointment.starts_at)}</Td>
                    <Td>{formatDate(appointment.ends_at)}</Td>
                  </Tr>
                ))
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
