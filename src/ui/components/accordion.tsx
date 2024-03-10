import { Accordion as GSAccordion } from '@gluestack-ui/themed'
import React, { PropsWithChildren } from 'react'
import { ViewProps } from 'react-native'
import { customColors as colors } from '@ui/ui-theme.provider'

interface GSAccordionProps extends PropsWithChildren<ViewProps> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'filled' | 'unfilled'
  type?: 'single' | 'multiple'
  disabled?: boolean
  defaultValue?: string
}

export default function Accordion(props: GSAccordionProps) {
  return (
    <GSAccordion bg={colors.backgroundDark500} {...props}>
      {props.children}
    </GSAccordion>
  )
}
