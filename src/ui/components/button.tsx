import {
  Button as GSButton,
  ButtonSpinner,
  ButtonText
} from '@gluestack-ui/themed'
import { PressableProps } from 'react-native'
import { customColors as colors } from '../ui-theme.provider'
import { PropsWithChildren } from 'react'

interface GSButtonProps extends PropsWithChildren<PressableProps> {
  isLoading: boolean
}

export default function Button(props: GSButtonProps) {
  return (
    <GSButton
      disabled={props.isLoading || props.disabled}
      {...props}
      sx={{
        ':active': {
          bg: colors.primary300
        }
      }}
    >
      {props.isLoading && <ButtonSpinner mr={8} color={'white'} />}
      <ButtonText>{props.children}</ButtonText>
    </GSButton>
  )
}
