import React from 'react'
import { VStack } from '@gluestack-ui/themed'

export default function VStackLayout(props) {
  return <VStack {...props}>{props.children}</VStack>
}
