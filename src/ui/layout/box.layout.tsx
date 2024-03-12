import React, { PropsWithChildren } from 'react'
import { Box as GSBox } from '@gluestack-ui/themed'
import { ViewProps } from 'react-native'

export interface BoxProps extends PropsWithChildren<ViewProps> {}

const BoxLayout = (props: BoxProps) => {
  return <GSBox {...props}>{props.children}</GSBox>
}

export default BoxLayout
