import { Flex, Icon, Text } from '@chakra-ui/react'

import { FaCarCrash } from 'react-icons/fa'

export const Logo = () => (
  <Flex align="center" gap="3" fontSize="lg" fontWeight="medium">
    <Icon as={FaCarCrash} w="5" h="5" />

    <Text as="span" fontWeight="semibold">
      reserva
      <Text as="span" textColor="cyan.600">
        .bp
      </Text>
    </Text>
  </Flex>
)
