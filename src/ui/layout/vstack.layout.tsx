import { VStack as GSVStack } from '@gluestack-ui/themed'
import { ViewProps } from 'react-native'

interface GSVStackProps extends ViewProps {
  alignItems?: 'left' | 'center' | 'right'
  space?: string
}

const VStackLayout = (props: GSVStackProps) => {
  return <GSVStack {...props}>{props.children}</GSVStack>
}

export default VStackLayout
