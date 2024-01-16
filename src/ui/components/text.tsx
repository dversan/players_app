import React from 'react'
import { Text as GSText } from '@gluestack-ui/themed'

function Text(props) {
  return <GSText {...props}>{props.children}</GSText>
}

export default Text
