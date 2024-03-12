import { HStack as GSHStack } from '@gluestack-ui/themed'
import { ViewProps } from 'react-native'

const HStackLayout = (props: ViewProps) => {
  return <GSHStack {...props}>{props.children}</GSHStack>
}

export default HStackLayout
