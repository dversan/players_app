import { VStack as GSVStack } from '@gluestack-ui/themed'
import { ViewProps } from 'react-native'

interface GSVStackProps extends ViewProps {
  alignItems?: 'left' | 'center' | 'right'
  justifyContent?: 'top' | 'center' | 'bottom'
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}

const VStackLayout = (props: GSVStackProps) => {
  return <GSVStack {...props}>{props.children}</GSVStack>
}

export default VStackLayout
