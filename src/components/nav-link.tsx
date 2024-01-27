import { useMemo } from 'react'

import { Link } from '@chakra-ui/react'

import { Link as RouterLink, LinkProps, useLocation } from 'react-router-dom'

export const NavLink = ({ children, to, ...rest }: LinkProps) => {
  /*
   * Hooks
   */
  const { pathname } = useLocation()

  const isCurrent = useMemo(() => pathname === to, [pathname, to])

  return (
    <Link
      {...rest}
      as={RouterLink}
      to={to}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingY="2"
      paddingX="4"
      borderRadius="md"
      backgroundColor={isCurrent ? 'cyan.600' : 'white'}
      color={isCurrent ? 'gray.50' : 'inherit'}
      fontWeight="semibold"
      _hover={{
        textDecoration: 'none',
        filter: 'brightness(0.9)',
      }}
    >
      {children}
    </Link>
  )
}
