import { HStack as GSHStack } from '@gluestack-ui/themed'

export default function HStackLayout(props) {
  return <GSHStack {...props}>{props.children}</GSHStack>
}
