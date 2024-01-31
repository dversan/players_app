import { SelectItem as GSSelectItem } from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'
import { PressableProps } from 'react-native'

interface SelectItemProps extends PropsWithChildren<PressableProps> {
  label: string
  value: any
}

export default function SelectItem(props: SelectItemProps) {
  return <GSSelectItem {...props} sx={{ _text: { fontSize: 20 } }} />
}
