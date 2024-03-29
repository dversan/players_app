import {
  AccordionContent,
  AccordionHeader,
  AccordionItem as GSAccordionItem,
  AccordionTitleText,
  AccordionTrigger,
  Center,
  Icon
} from '@gluestack-ui/themed'
import { CheckCircle } from 'lucide-react-native'
import React, { PropsWithChildren } from 'react'
import { ViewProps } from 'react-native'
import { OnboardingSteps } from '@lib/data/models'
import Text from '../../ui/components/text'
import { customColors as colors } from '../../ui/ui-theme.provider'

interface GSAccordionProps extends PropsWithChildren<ViewProps> {
  headerTitle?: string
  titleColor?: string
  showCheckIcon?: boolean
  value?: OnboardingSteps
  isDisabled?: boolean
}

const AccordionItem = (props: GSAccordionProps) => {
  const stepsName = Object.values(OnboardingSteps)

  return (
    <GSAccordionItem {...props} bg={colors.backgroundDark800}>
      <AccordionHeader>
        <AccordionTrigger>
          <>
            {props.showCheckIcon ? (
              <Center mr={8}>
                <Icon as={CheckCircle} size={24} color={colors.primary200} />
              </Center>
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

export default AccordionItem
