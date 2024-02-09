import {
  Button as GSButton,
  ButtonSpinner,
  ButtonText
} from '@gluestack-ui/themed'
import { PressableProps } from 'react-native'
import { customColors as colors } from '../ui-theme.provider'
import { PropsWithChildren } from 'react'

interface GSButtonProps extends PropsWithChildren<PressableProps> {
  isLoading?: boolean
  variant?: 'link' | 'outline' | 'solid'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  textColor?: string
}

export default function Button(props: GSButtonProps) {
  return (
    <GSButton
      {...props}
      isDisabled={props.isLoading || props.disabled}
      sx={{
        ':active': {
          bg: colors.primary300
        },
        _text: {
          color: props.textColor || colors.backgroundLight400
        }
      }}
    >
      {props.isLoading && <ButtonSpinner mr={8} color={'white'} />}
      <ButtonText>{props.children}</ButtonText>
    </GSButton>
  )
}
