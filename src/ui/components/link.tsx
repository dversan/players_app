import { Link as GSLink } from '@gluestack-ui/themed'

export default function Link(props) {
  return <GSLink {...props}>{props.children}</GSLink>
}
