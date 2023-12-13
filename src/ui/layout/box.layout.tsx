import React from 'react'
import { Box } from '@gluestack-ui/themed'

export default function BoxLayout(props) {
  return <Box {...props}>{props.children}</Box>
}
