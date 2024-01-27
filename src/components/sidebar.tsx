import { Box, Flex } from '@chakra-ui/react'

import { GoClock } from 'react-icons/go'

import { FaCalendarAlt } from 'react-icons/fa'

import { NavLink } from './nav-link'

export const SideBar = () => (
  <Box as="aside" height="100%" width="260px" borderRightWidth="1px">
    <Flex
      as="nav"
      flexDirection="column"
      alignItems="flex-start"
      gap="6"
      padding="6"
    >
      <NavLink to="/">
        Meus agendamentos <FaCalendarAlt />
      </NavLink>

      <NavLink to="/schedule">
        Novo agendamento <GoClock />
      </NavLink>
    </Flex>
  </Box>
)
