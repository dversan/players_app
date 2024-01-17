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

interface GSInputCustomProps extends PropsWithChildren<TextInputProps> {
  label?: string
  error?: string
  type?: string
}

export default function Input(props: GSInputCustomProps) {
  return (
    <FormControl w={'100%'} isInvalid={props.error !== undefined}>
      {props.label && (
        <FormControlLabelText color={colors.backgroundLight500}>
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
            bg: colors.backgroundDark300
          }
        }}
      >
        <InputField
          type={props.type}
          onChangeText={props.onChangeText}
          selectionColor={'white'}
          color={'white'}
          style={{ fontWeight: 'bold' }}
        />
      </GSInput>
      {props.error && (
        <FormControlErrorText>{props.error}</FormControlErrorText>
      )}
    </FormControl>
  )
}
