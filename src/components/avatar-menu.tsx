import {
  Avatar,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'

import { signOutService } from '../services/sign-out-service'

import { useMutation, useQuery } from '@tanstack/react-query'

import { LuLogOut } from 'react-icons/lu'

import { getProfileService } from '../services/get-profile-service'

export const AvatarMenu = () => {
  /*
   * Hooks
   */
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileService,
  })

  const navigate = useNavigate()

  const { mutateAsync: signOut } = useMutation({
    mutationFn: signOutService,
  })

  const handleSignOut = async () => {
    await signOut()
    navigate('/sign-in')
  }

  return (
    <Menu>
      <MenuButton>
        <Avatar size="md" name={profile ? profile.name : ''} bg="cyan.600" />
      </MenuButton>

      <MenuList>
        <MenuGroup title={profile ? profile.name : ''}>
          <MenuItem onClick={handleSignOut} icon={<LuLogOut />}>
            Sair
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
