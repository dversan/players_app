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
import { PropsWithChildren } from 'react'
import { customColors as colors } from '../../ui/ui-theme.provider'

interface GSSelectProps extends PropsWithChildren<ViewProps> {
  size?: 'xl' | 'lg' | 'md' | 'sm'
  variant?: 'underlined' | 'outline' | 'rounded'
  label?: string
  placeholder?: string
  isFocused?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export default function Select(props: GSSelectProps) {
  return (
    <FormControl isRequired w={'100%'}>
      <FormControlLabelText color={colors.backgroundLight500}>
        {props.label}
      </FormControlLabelText>
      <GSSelect
        isFocused={props.isFocused}
        onOpen={props.onOpen}
        onClose={props.onClose}
      >
        <SelectTrigger
          size={props.size}
          variant={props.variant}
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
          <SelectInput
            placeholderTextColor={colors.backgroundDark300}
            placeholder={props.placeholder}
          />
          <SelectIcon mr='$3'>
            <Icon as={ChevronDownIcon} color={'white'} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {props.children}
          </SelectContent>
        </SelectPortal>
      </GSSelect>
    </FormControl>
  )
}
