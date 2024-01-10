import React, { PropsWithChildren } from 'react'
import {
  FormControl,
  FormControlErrorText,
  FormControlLabelText,
  Input as GSInput,
  InputField
} from '@gluestack-ui/themed'
import { colors } from '../ui-theme.provider'

interface GSInputCustomProps extends PropsWithChildren {
  label?: string
  error?: string
  onChangeText: (event: string) => void
  type?: string
}

export default function Input(props: GSInputCustomProps) {
  return (
    <FormControl w={'100%'} isInvalid={props.error !== undefined}>
      {props.label && (
        <FormControlLabelText>{props.label}</FormControlLabelText>
      )}

      <GSInput
        {...props}
        isInvalid={props.error !== undefined}
        borderColor={colors.text.base}
        borderRadius={4}
        placeholderTextColor={colors.action.base}
      >
        <InputField type={props.type} onChangeText={props.onChangeText} />
      </GSInput>
      {props.error && (
        <FormControlErrorText>{props.error}</FormControlErrorText>
      )}
    </FormControl>
  )
}
