import { VStack as GSVStack } from '@gluestack-ui/themed'
import { ViewProps } from 'react-native'

export default function VStackLayout(props: ViewProps) {
  return <GSVStack {...props}>{props.children}</GSVStack>
}
