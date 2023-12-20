import { Button as GSButton, ButtonText } from '@gluestack-ui/themed'

export default function Button(props) {
  return (
    <GSButton {...props}>
      <ButtonText>{props.children}</ButtonText>
    </GSButton>
  )
}
