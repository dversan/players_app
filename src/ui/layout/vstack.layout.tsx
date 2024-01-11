import { VStack as GSVStack } from '@gluestack-ui/themed'

export default function VStackLayout(props) {
  return <GSVStack {...props}>{props.children}</GSVStack>
}
