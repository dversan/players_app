import { Accordion as GSAccordion } from '@gluestack-ui/themed'
import React, { PropsWithChildren } from 'react'
import { ViewProps } from 'react-native'

interface GSAccordionProps extends PropsWithChildren<ViewProps> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'filled' | 'unfilled'
  type?: 'single' | 'multiple'
  disabled?: boolean
}

export default function Accordion(props: GSAccordionProps) {
  return <GSAccordion {...props}>{props.children}</GSAccordion>
}
