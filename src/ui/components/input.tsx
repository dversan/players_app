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
}

export default function Input(props: GSInputCustomProps) {
  return (
    <FormControl w={'100%'} isInvalid={props.error !== undefined}>
      {props.label && (
        <FormControlLabelText
          _labelText={{
            fontSize: 12,
            fontWeight: 'normal',
            color: colors.text.base
          }}
        >
          {props.label}
        </FormControlLabelText>
      )}

      <GSInput
        {...props}
        isInvalid={props.error !== undefined}
        fontSize={14}
        borderColor={colors.text.base}
        borderRadius={4}
        color={colors.button.base}
        placeholderTextColor={colors.action.base}
      >
        <InputField type={'text'} />
      </GSInput>
      {props.error && (
        <FormControlErrorText>{props.error}</FormControlErrorText>
      )}
    </FormControl>
  )
}
