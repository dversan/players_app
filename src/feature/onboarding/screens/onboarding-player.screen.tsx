import React, { useState } from 'react'
import ScreenLayout from '../../../ui/layout/screen.layout'
import Text from '../../../ui/components/text'
import ScrollViewLayout from '../../../ui/layout/scrollview.layout'
import VStackLayout from '../../../ui/layout/vstack.layout'
import Button from '../../../ui/components/button'
import Accordion from '../../../ui/components/accordion'
import AccordionItem from '../../../ui/components/accordion-item'
import { Center } from '@gluestack-ui/themed'
import { t } from 'i18next'
import { customColors as colors } from '../../../ui/ui-theme.provider'
import {
  OnboardingFormData,
  OnboardingSteps,
  PositionValuesProps
} from '../../../lib/data/models'
import OnboardingPositionForm from '../../../ui/components/onboarding-position-form'
import { OnboardingStepsValidation } from '../../../lib/data/helpers'

export default function OnboardingPlayerScreen({ route, navigation }: any) {
  const [formData, setFormData] = useState<OnboardingFormData>({
    playerNumber: 0,
    playerNickname: '',
    mainPosition: '',
    secondPosition: ''
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<{ [id: string]: string }>({})
  const [stepToShow, setStepToShow] = useState<OnboardingSteps>(
    OnboardingSteps.POSITION
  )
  const [stepsCompleted, setStepsCompleted] = useState<string[]>([])

  const hasValue: PositionValuesProps = {
    inMainPosition: !!formData.mainPosition,
    inSecondPosition: !!formData.secondPosition
  }
  const { onboardingLayoutProps } = route.params

  // function onSubmit() {
  //   if (loginFormValidation(formData).validationOk) {
  //     console.log(formData)
  //   } else {
  //     setErrors(loginFormValidation(formData).validationErrors)
  //   }
  // }

  function onSetAccordionToOpen(itemToOpen) {
    setStepToShow(itemToOpen)
  }

  function stepHandler(stepToOpen: OnboardingSteps, step: OnboardingSteps) {
    if (OnboardingStepsValidation(formData).validationOk) {
      if (!stepsCompleted.includes(step)) {
        const currentStepsCompleted = stepsCompleted.concat(step)
        setStepsCompleted(currentStepsCompleted)
      }
      setStepToShow(stepToOpen)
    } else {
      setErrors(OnboardingStepsValidation(formData).validationErrors)
    }
  }

  function onSetFormData(fieldName, fieldValue) {
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: fieldValue
    }))
  }

  return (
    <ScreenLayout>
      <ScrollViewLayout fullHeight>
        <VStackLayout
          p={onboardingLayoutProps.padding}
          pt={onboardingLayoutProps.paddingTop}
          space={onboardingLayoutProps.mainSpacing}
        >
          <Center>
            <Text size={'lg'} bold>
              {t('onboardingScreen.title').toUpperCase()}
            </Text>
          </Center>

          <Accordion
            collapsable={true}
            style={{ maxWidth: 400 }}
            value={stepToShow}
          >
            <AccordionItem
              value={OnboardingSteps.POSITION}
              backgroundColor={colors.backgroundDark800}
              headerTitle={`${t(
                'onboardingScreen.firstFormTitle'
              )}`.toUpperCase()}
              titleColor={'white'}
              borderRadius={8}
              stepsCompleted={stepsCompleted}
            >
              <>
                <OnboardingPositionForm
                  onSetFormData={onSetFormData}
                  isLoading={isLoading}
                  hasValue={hasValue}
                  onSetAccordionToOpen={onSetAccordionToOpen}
                  validation={errors}
                />
                <Button
                  size={'lg'}
                  style={{ marginTop: 34, paddingHorizontal: 16 }}
                  alignSelf={'center'}
                  isLoading={isLoading}
                  onPress={() =>
                    stepHandler(
                      OnboardingSteps.FITNESS,
                      OnboardingSteps.POSITION
                    )
                  }
                >
                  {t('onboardingScreen.confirmStep')}
                </Button>
              </>
            </AccordionItem>
            <AccordionItem
              value={OnboardingSteps.FITNESS}
              margin={{ mt: 24 }}
              backgroundColor={colors.backgroundDark800}
            >
              <Button
                size={'lg'}
                style={{ marginTop: 34, paddingHorizontal: 16 }}
                alignSelf={'center'}
                isLoading={isLoading}
                onPress={() =>
                  stepHandler(
                    OnboardingSteps.PARAMETERS,
                    OnboardingSteps.FITNESS
                  )
                }
              >
                {t('onboardingScreen.confirmStep')}
              </Button>
            </AccordionItem>
            <AccordionItem
              value={OnboardingSteps.PARAMETERS}
              margin={{ mt: 24 }}
              backgroundColor={colors.backgroundDark800}
            >
              <Button
                size={'lg'}
                style={{ marginTop: 34, paddingHorizontal: 16 }}
                alignSelf={'center'}
                isLoading={isLoading}
                onPress={() =>
                  stepHandler(
                    OnboardingSteps.FITNESS,
                    OnboardingSteps.PARAMETERS
                  )
                }
              >
                {t('onboardingScreen.confirmStep')}
              </Button>
            </AccordionItem>
          </Accordion>
          <Button onPress={() => navigation.navigate('OnboardingClubScreen')}>
            {'GO TO STEP2'}
          </Button>
        </VStackLayout>
      </ScrollViewLayout>
    </ScreenLayout>
  )
}
