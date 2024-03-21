import { Avatar as GSAvatar } from '@gluestack-ui/themed'
import React, { PropsWithChildren } from 'react'
import { ViewProps } from 'react-native'

interface GSAvatarProps extends PropsWithChildren<ViewProps> {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const Avatar = (props: GSAvatarProps) => {
  return <GSAvatar {...props}>{props.children}</GSAvatar>
}

export default Avatar
