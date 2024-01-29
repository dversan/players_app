import React, { PropsWithChildren } from 'react'
import {
  FormControl,
  FormControlErrorText,
  FormControlLabelText,
  Input as GSInput,
  InputField
} from '@gluestack-ui/themed'
import { TextInputProps } from 'react-native'
import { customColors as colors } from '../ui-theme.provider'

interface GSInputProps extends PropsWithChildren<TextInputProps> {
  label?: string
  error?: string
  type?: string
  textColor?: string
  flex?: number
}

export default function Input(props: GSInputProps) {
  return (
    <FormControl flex={props.flex} isInvalid={props.error !== undefined}>
      {props.label && (
        <FormControlLabelText
          color={colors.backgroundLight500}
        >
          {props.label}
        </FormControlLabelText>
      )}
      <GSInput
        {...props}
        isInvalid={props.error !== undefined}
        borderRadius={4}
        size={'xl'}
        sx={{
          ':focus': {
            bg: colors.backgroundDark300,
            borderColor: colors.primary300,
            borderWidth: 2
          },
          ':invalid': {
            borderColor: 'red'
          }
        }}
      >
        <InputField
          value={props.value}
          type={props.type}
          onChangeText={props.onChangeText}
          selectionColor={'white'}
          color={props.textColor || 'white'}
          style={{ ...props.style }}
        />
      </GSInput>
      {props.error && (
        <FormControlErrorText color={'red'}>{props.error}</FormControlErrorText>
      )}
    </FormControl>
  )
}
