import {
  ChevronDownIcon,
  FormControl,
  FormControlLabelText,
  Icon,
  Select as GSSelect,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectPortal,
  SelectTrigger
} from '@gluestack-ui/themed'
import { ViewProps } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { customColors as colors } from '../../ui/ui-theme.provider'
import { inputStyle } from '@ui/components/input'
import { FormType } from '@lib/data/models'

export interface PlaceholderStyleProps {
  textAlign?: string
  fontSize?: number
  fontWeight?: string
  color?: string
}

interface GSSelectProps extends PropsWithChildren<ViewProps> {
  size?: 'xl' | 'lg' | 'md' | 'sm'
  variant?: 'underlined' | 'outline' | 'rounded'
  label?: string
  placeholder?: string
  placeholderStyle?: PlaceholderStyleProps
  isFocused?: boolean
  onOpen?: () => void
  onClose?: () => void
  formType?: FormType
  onValueChange?: (value: any) => void
  isInvalid?: boolean
}

const Select = (props: GSSelectProps) => {
  return (
    <FormControl isRequired w={'100%'}>
      <FormControlLabelText color={colors.backgroundLight500}>
        {props.label}
      </FormControlLabelText>
      <GSSelect {...props}>
        <SelectTrigger
          size={props.size}
          variant={props.variant}
          sx={
            props.formType === 'onboarding'
              ? inputStyle.onboarding
              : inputStyle.register
          }
        >
          <SelectInput
            style={
              props.placeholderStyle
                ? { ...(props.style, props.placeholderStyle) }
                : { ...(props.style, inputStyle.onboarding.text) }
            }
            placeholder={props.placeholder}
            p={0}
          />
          <SelectIcon mr='$3'>
            <Icon as={ChevronDownIcon} color={'white'} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent py={34}>
            <SelectDragIndicatorWrapper mb={8}>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {props.children}
          </SelectContent>
        </SelectPortal>
      </GSSelect>
    </FormControl>
  )
}

export default Select
