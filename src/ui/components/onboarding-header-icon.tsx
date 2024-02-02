import { Icon, Center } from '@gluestack-ui/themed'
import { customColors as colors } from '../../ui/ui-theme.provider'
import { ViewProps } from 'react-native'

interface OnboardingHeaderIconProps extends ViewProps {
  label?: string
  iconSize?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  iconColor?: string
}

export default function OnboardingHeaderIcon(props: OnboardingHeaderIconProps) {
  return (
    <Center {...props} style={{ ...props.style, ...componentStyle }}>
      <Icon as={props.children} size={props.iconSize} color={props.iconColor} />
    </Center>
  )
}

const componentStyle = {
  height: 20,
  width: 20,
  borderRadius: 50,
  borderColor: colors.primary200,
  borderWidth: 1,
  marginRight: 8
}
