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
  headerTitle: string
  itemValue: string
  isDisabled?: boolean
  borderRadius?: number
  backgroundColor: string
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
      value={props.itemValue}
      backgroundColor={props.backgroundColor}
      borderRadius={8}
      shadowColor={'transparent'}
      sx={props.margin}
    >
      <AccordionHeader>
        <AccordionTrigger>
          {() => {
            return <AccordionTitleText>{props.headerTitle}</AccordionTitleText>
          }}
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent borderTopWidth={1} borderColor='black' paddingTop={16}>
        {props.children}
      </AccordionContent>
    </GSAccordionItem>
  )
}
