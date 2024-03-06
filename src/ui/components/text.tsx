import React, { PropsWithChildren } from 'react'
import { Text as GSText } from '@gluestack-ui/themed'
import { ViewProps } from 'react-native'

interface GSTestProps extends PropsWithChildren<ViewProps> {
  isTruncated?: boolean
  bold?: boolean
  underline?: boolean
  strikeThrough?: boolean
  sub?: boolean
  italic?: boolean
  highlight?: boolean
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
}

export default function Text(props: GSTestProps) {
  return (
    <GSText color={'white'} {...props}>
      {props.children}
    </GSText>
  )
}
