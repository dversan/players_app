import React, { PropsWithChildren } from 'react'
import { ScrollView as GSScrollView } from '@gluestack-ui/themed'
import { ScrollViewProps } from 'react-native'

interface GSScrollViewProps extends PropsWithChildren<ScrollViewProps> {
  fullHeight?: boolean
}

export default function ScrollViewLayout(props: GSScrollViewProps) {
  return (
    <GSScrollView
      contentContainerStyle={{ flexGrow: props.fullHeight ? 1 : 0 }}
      {...props}
    >
      {props.children}
    </GSScrollView>
  )
}
