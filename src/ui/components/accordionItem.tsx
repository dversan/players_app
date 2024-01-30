import {
  AccordionItem as GSAccordionItem,
  AccordionContent,
  AccordionHeader,
  AccordionTitleText,
  AccordionTrigger
} from '@gluestack-ui/themed'
import React, { PropsWithChildren } from 'react'
import { ViewProps } from 'react-native'
import { customColors as colors } from '../../ui/ui-theme.provider'

interface GSAccordionProps extends PropsWithChildren<ViewProps> {
  headerTitle?: string
  titleColor?: string
  value?: string
  isDisabled?: boolean
  borderRadius?: number
  backgroundColor?: string
  margin?:
    | {
        mt?: 8 | 16 | 24
        mb?: 8 | 16 | 24
        ml?: 8 | 16 | 24
        mr?: 8 | 16 | 24
      }
    | number
}

export default function AccordionItem(props: GSAccordionProps) {
  return (
    <GSAccordionItem
      {...props}
      borderRadius={8}
      shadowColor={'transparent'}
      sx={props.margin}
    >
      <AccordionHeader>
        <AccordionTrigger>
          <AccordionTitleText color={props.titleColor}>
            {props.headerTitle}
          </AccordionTitleText>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent
        borderTopWidth={8}
        borderColor={colors.backgroundDark500}
        paddingTop={16}
      >
        {props.children}
      </AccordionContent>
    </GSAccordionItem>
  )
}
