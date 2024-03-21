import { HStack as GSHStack } from '@gluestack-ui/themed'
import { ViewProps } from 'react-native'

interface GSHStackProps extends ViewProps {
  alignSelf?: 'left' | 'center' | 'right'
  justifyContent?: 'top' | 'center' | 'bottom'
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}

const HStackLayout = (props: GSHStackProps) => {
  return <GSHStack {...props}>{props.children}</GSHStack>
}

export default HStackLayout
