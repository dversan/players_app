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
import OnboardingFitnessForm from '../../../ui/components/onboarding-fitness-form'
import {
  OnboardingStepsValidation,
  ValidationFields
} from '../../../lib/data/helpers'

export default function OnboardingPlayerScreen({ route, navigation }: any) {
  const [formData, setFormData] = useState<OnboardingFormData>({
    playerNumber: 0,
    playerNickname: '',
    mainPosition: '',
    secondPosition: '',
    playerHeight: 0,
    playerWeight: 0,
    birthday: '',
    gamesPerYearIndex: 0,
    competitionGamesIndex: 0
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<{
    [key: keyof ValidationFields]: string
  }>({})
  const [stepToShow, setStepToShow] = useState<OnboardingSteps>(
    OnboardingSteps.FITNESS
  )
  const [stepsCompleted, setStepsCompleted] = useState<string[]>([])

  const hasValue: PositionValuesProps = {
    inMainPosition: !!formData.mainPosition,
    inSecondPosition: !!formData.secondPosition,
    birthday: !!formData.birthday,
    gamesPerYearIndex: !!formData.gamesPerYearIndex,
    competitionGamesIndex: !!formData.competitionGamesIndex
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
    if (OnboardingStepsValidation(formData)[`${step}ValidationOk`]) {
      if (!stepsCompleted.includes(step)) {
        const currentStepsCompleted = stepsCompleted.concat(step)
        setStepsCompleted(currentStepsCompleted)
      }
      setErrors({})
      setStepToShow(stepToOpen)
    } else {
      setErrors(OnboardingStepsValidation(formData)[`${step}ValidationErrors`])
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
                `onboardingScreen.${OnboardingSteps.POSITION}Title`
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
                  mt={32}
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
              headerTitle={`${t(
                `onboardingScreen.${OnboardingSteps.FITNESS}Title`
              )}`.toUpperCase()}
              titleColor={'white'}
              borderRadius={8}
              stepsCompleted={stepsCompleted}
            >
              <OnboardingFitnessForm
                onSetFormData={onSetFormData}
                isLoading={isLoading}
                hasValue={hasValue}
                onSetAccordionToOpen={onSetAccordionToOpen}
                validation={errors}
              />
              <Button
                size={'lg'}
                mt={32}
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
              headerTitle={`${t(
                `onboardingScreen.${OnboardingSteps.PARAMETERS}Title`
              )}`.toUpperCase()}
              titleColor={'white'}
              borderRadius={8}
              stepsCompleted={stepsCompleted}
            >
              <Button
                size={'lg'}
                mt={32}
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
