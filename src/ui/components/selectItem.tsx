import { SelectItem as GSSelectItem } from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'
import { PressableProps } from 'react-native'

interface SelectItemProps extends PropsWithChildren<PressableProps> {
  label: string
  value: any
}

export default function SelectItem(props: SelectItemProps) {
  return (
    <GSSelectItem
      label={props.label}
      value={props.value}
      isDisabled={props.disabled}
      style={props.style}
      sx={{ _text: { fontSize: 20 } }}
    />
  )
}