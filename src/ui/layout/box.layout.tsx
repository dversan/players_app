import React from 'react'
import { Box as GSBox } from '@gluestack-ui/themed'

export default function BoxLayout(props) {
  return <GSBox {...props}>{props.children}</GSBox>
}
