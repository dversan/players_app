import {
  Alert as GSAlert,
  AlertIcon,
  AlertText,
  InfoIcon
} from '@gluestack-ui/themed'
import { ViewProps } from 'react-native'
import { PropsWithChildren } from 'react'

interface GSAlertProps extends PropsWithChildren<ViewProps> {
  action: 'error' | 'warning' | 'success' | 'info' | 'muted'
  variant: 'solid' | 'outline' | 'accent'
}

export default function Alert(props: GSAlertProps) {
  return (
    <GSAlert {...props}>
      <AlertIcon as={InfoIcon} mr={8} />
      <AlertText>{props.children}</AlertText>
    </GSAlert>
  )
}
