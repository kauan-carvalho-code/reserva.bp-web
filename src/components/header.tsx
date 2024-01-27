import { Box, Flex } from '@chakra-ui/react'

import { Logo } from './logo'

import { AvatarMenu } from './avatar-menu'

export const Header = () => (
  <Box as="header" borderBottomWidth="1px">
    <Flex
      height="64px"
      alignItems="center"
      justifyContent="space-between"
      gap="6"
      paddingX="6"
    >
      <Logo />

      <AvatarMenu />
    </Flex>
  </Box>
)
