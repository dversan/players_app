import { VStack as GSVStack } from '@gluestack-ui/themed'
import { ViewProps } from 'react-native'

interface GSVStackProps extends ViewProps {
  alignItems?: 'left' | 'center' | 'right'
  space?: string
}

export default function VStackLayout(props: GSVStackProps) {
  return <GSVStack {...props}>{props.children}</GSVStack>
}
