import { Link as GSLink, LinkText } from '@gluestack-ui/themed'
import { PressableProps } from 'react-native'
import { PropsWithChildren } from 'react'

interface GSLinkProps extends PropsWithChildren<PressableProps> {
  textColor?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Link(props: GSLinkProps) {
  return (
    <GSLink {...props}>
      <LinkText color={props.textColor || 'white'} size={props.size}>
        {props.children}
      </LinkText>
    </GSLink>
  )
}
