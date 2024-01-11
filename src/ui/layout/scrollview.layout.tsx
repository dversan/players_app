import React, { PropsWithChildren } from 'react'
import { ScrollView as GSScrollView } from '@gluestack-ui/themed'

interface CustomProps extends PropsWithChildren {
  fullHeight?: boolean
}

export default function ScrollViewLayout({
  fullHeight,
  ...props
}: CustomProps) {
  return (
    <GSScrollView
      contentContainerStyle={{ flexGrow: fullHeight ? 1 : 0 }}
      {...props}
    >
      {props.children}
    </GSScrollView>
  )
}
