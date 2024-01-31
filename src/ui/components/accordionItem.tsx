import {
  AccordionItem as GSAccordionItem,
  AccordionContent,
  AccordionHeader,
  AccordionTitleText,
  AccordionTrigger
} from '@gluestack-ui/themed'
import React, { PropsWithChildren } from 'react'
import { ViewProps } from 'react-native'

interface GSAccordionProps extends PropsWithChildren<ViewProps> {
  headerTitle?: string
  titleColor?: string
  value?: string
  isDisabled?: boolean
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
    <GSAccordionItem {...props} shadowColor={'transparent'} sx={props.margin}>
      <AccordionHeader>
        <AccordionTrigger>
          <AccordionTitleText color={props.titleColor} style={{ fontSize: 16 }}>
            {props.headerTitle}
          </AccordionTitleText>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent>{props.children}</AccordionContent>
    </GSAccordionItem>
  )
}
