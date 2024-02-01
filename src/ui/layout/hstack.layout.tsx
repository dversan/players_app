import { HStack as GSHStack } from '@gluestack-ui/themed'
import { ViewProps } from 'react-native'

export default function HStackLayout(props: ViewProps) {
  return <GSHStack {...props}>{props.children}</GSHStack>
}
