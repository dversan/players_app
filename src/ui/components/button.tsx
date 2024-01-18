import { Button as GSButton, ButtonText } from '@gluestack-ui/themed'
import { customColors as colors } from '../ui-theme.provider'

export default function Button(props) {
  return (
    <GSButton
      {...props}
      sx={{
        ':active': {
          bg: colors.primary300
        }
      }}
    >
      <ButtonText>{props.children}</ButtonText>
    </GSButton>
  )
}
