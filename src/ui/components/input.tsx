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
import { FormType } from '../../lib/data/models'
import { PlaceholderStyleProps } from '@ui/components/select'

interface GSInputProps extends PropsWithChildren<TextInputProps> {
  label?: string
  error?: string
  type?: string
  flex?: number
  formType?: FormType
  placeholder?: string
  placeholderStyle?: PlaceholderStyleProps
}

export default function Input(props: GSInputProps) {
  return (
    <FormControl flex={props.flex} isInvalid={props.error !== undefined}>
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
        sx={
          props.formType !== 'onboarding'
            ? inputStyle.register
            : inputStyle.onboarding
        }
      >
        <InputField
          value={props.value}
          type={props.type}
          onChangeText={props.onChangeText}
          selectionColor={'white'}
          color={inputStyle.onboarding.text.color || 'white'}
          p={0}
          style={
            props.placeholderStyle
              ? { ...(props.style, props.placeholderStyle) }
              : { ...(props.style, inputStyle.onboarding.text) }
          }
          caretHidden={props.caretHidden}
          placeholder={props.placeholder}
          onPressIn={props.onPressIn}
        />
      </GSInput>
      {props.error && props.formType !== 'onboarding' && (
        <FormControlErrorText color={'red'}>{props.error}</FormControlErrorText>
      )}
    </FormControl>
  )
}

export const inputStyle = {
  register: {
    ':focus': {
      backgroundColor: colors.backgroundDark300,
      borderColor: colors.primary300,
      borderWidth: 2
    },
    ':invalid': {
      borderColor: 'red'
    }
  },
  onboarding: {
    ':focus': {
      backgroundColor: colors.backgroundDark800,
      borderColor: colors.primary300,
      borderWidth: 3
    },
    ':invalid': {
      borderColor: 'red'
    },
    text: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'semibold',
      color: 'white'
    }
  }
}
