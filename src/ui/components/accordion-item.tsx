import {
  AccordionContent,
  AccordionHeader,
  AccordionItem as GSAccordionItem,
  AccordionTitleText,
  AccordionTrigger,
  Center,
  CheckIcon
} from '@gluestack-ui/themed'
import React, { PropsWithChildren } from 'react'
import { ViewProps } from 'react-native'
import OnboardingHeaderIcon from '../../ui/components/onboarding-header-icon'
import { OnboardingSteps } from '../../lib/data/models'
import Text from '../../ui/components/text'

interface GSAccordionProps extends PropsWithChildren<ViewProps> {
  headerTitle?: string
  titleColor?: string
  showCheckIcon?: boolean
  value?: OnboardingSteps
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
  const stepsName = Object.values(OnboardingSteps)

  return (
    <GSAccordionItem {...props} shadowColor={'transparent'} sx={props.margin}>
      <AccordionHeader>
        <AccordionTrigger>
          <>
            {props.showCheckIcon ? (
              <OnboardingHeaderIcon>{CheckIcon}</OnboardingHeaderIcon>
            ) : (
              <Center mr={8}>
                <Text bold>{`${
                  stepsName.indexOf(props.value as OnboardingSteps) + 1
                }.`}</Text>
              </Center>
            )}
            <AccordionTitleText
              color={props.titleColor}
              style={{ fontSize: 16 }}
            >
              {props.headerTitle}
            </AccordionTitleText>
          </>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent>{props.children}</AccordionContent>
    </GSAccordionItem>
  )
}