import React, { useState } from 'react'
import ScreenLayout from '@ui/layout/screen.layout'
import Text from '@ui/components/text'
import ScrollViewLayout from '@ui/layout/scrollview.layout'
import VStackLayout from '@ui/layout/vstack.layout'
import Button from '@ui/components/button'
import Accordion from '@ui/components/accordion'
import AccordionItem from '@ui/components/accordion-item'
import { Center, Image } from '@gluestack-ui/themed'
import { t } from 'i18next'
import {
  PlayerData,
  PositionFormData,
  FitnessFormData,
  ParametersFormData,
  OnboardingSteps
} from '@lib/data/models'
import OnboardingPositionForm from '@ui/components/onboarding-position-form'
import OnboardingFitnessForm from '@ui/components/onboarding-fitness-form'
import OnboardingParametersForm from '@ui/components/onboarding-parameters-form'
import { savePlayerData } from '@lib/api/users.api'
import { useAuth } from '@lib/auth/auth.context'
import Alert from '@ui/components/alert'

const OnboardingPlayerScreen = ({ route, navigation }: any) => {
  const [formData, setFormData] = useState<PlayerData>({
    playerNumber: 0,
    playerNickname: '',
    mainPosition: '',
    secondPosition: '',
    playerHeight: 0,
    playerWeight: 0,
    birthday: '',
    gamesPerYearIndex: 0,
    competitionGamesIndex: 0,
    attack: 0,
    defense: 0,
    fitness: 0,
    goal: 0,
    pass: 0,
    teamWork: 0
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [stepToShow, setStepToShow] = useState<OnboardingSteps | ''>(
    OnboardingSteps.POSITION
  )
  const [stepsCompleted, setStepsCompleted] = useState<string[]>([])
  const disableSubmitButton =
    stepsCompleted.length !== Object.keys(OnboardingSteps).length
  const { onboardingLayoutProps } = route.params
  const firebaseUser = useAuth().user

  const onSubmit = () => {
    setIsLoading(true)
    savePlayerData(firebaseUser.id, formData)
      .then(() => {
        navigation.navigate('OnboardingPlayerOptionsScreen')
        setIsLoading(false)
      })
      .catch(e => (
        <Alert action={'error'} variant={'solid'}>
          {e.message}
        </Alert>
      ))
  }

  const onSetAccordionToOpen = itemToOpen => {
    setStepToShow(itemToOpen)
  }

  const confirmStepHandler = async (
    childFormData: PositionFormData | FitnessFormData | ParametersFormData,
    step: OnboardingSteps,
    stepToOpen: OnboardingSteps | null
  ) => {
    setFormData(prevState => ({
      ...prevState,
      ...childFormData
    }))

    if (!stepsCompleted.includes(step)) {
      const currentStepsCompleted = stepsCompleted.concat(step)
      setStepsCompleted(currentStepsCompleted)
    }
    setStepToShow(stepToOpen || '')
  }

  return (
    <ScreenLayout>
      <ScrollViewLayout fullHeight>
        <VStackLayout
          p={onboardingLayoutProps.padding}
          space={onboardingLayoutProps.mainSpacing}
          style={{ flexGrow: 1 }}
        >
          <Center>
            <Image
              height={onboardingLayoutProps.logoH}
              width={onboardingLayoutProps.logoW}
              source={require('../../../ui/images/players_logo.jpeg')}
              alt={'players logo'}
            />
          </Center>
          <VStackLayout space={'lg'} alignItems={'center'}>
            <Text size={'2xl'} bold>
              {t('onboardingScreen.title').toUpperCase()}
            </Text>
            <Text>{t('onboardingScreen.introText')}</Text>
          </VStackLayout>
          <Accordion collapsable={true} value={stepToShow || ''}>
            <AccordionItem
              value={OnboardingSteps.POSITION}
              headerTitle={`${t(
                `onboardingScreen.${OnboardingSteps.POSITION}Title`
              )}`.toUpperCase()}
              titleColor={'white'}
              borderRadius={8}
              stepsCompleted={stepsCompleted}
              showCheckIcon={stepsCompleted.includes(OnboardingSteps.POSITION)}
            >
              <OnboardingPositionForm
                onSetFormData={confirmStepHandler}
                onSetAccordionToOpen={onSetAccordionToOpen}
              />
            </AccordionItem>
            <AccordionItem
              value={OnboardingSteps.FITNESS}
              mt={24}
              headerTitle={`${t(
                `onboardingScreen.${OnboardingSteps.FITNESS}Title`
              )}`.toUpperCase()}
              titleColor={'white'}
              borderRadius={8}
              stepsCompleted={stepsCompleted}
              showCheckIcon={stepsCompleted.includes(OnboardingSteps.FITNESS)}
            >
              <OnboardingFitnessForm
                onSetFormData={confirmStepHandler}
                onSetAccordionToOpen={onSetAccordionToOpen}
              />
            </AccordionItem>
            <AccordionItem
              value={OnboardingSteps.PARAMETERS}
              mt={24}
              headerTitle={`${t(
                `onboardingScreen.${OnboardingSteps.PARAMETERS}Title`
              )}`.toUpperCase()}
              titleColor={'white'}
              borderRadius={8}
              stepsCompleted={stepsCompleted}
              showCheckIcon={stepsCompleted.includes(
                OnboardingSteps.PARAMETERS
              )}
            >
              <OnboardingParametersForm
                calculationInputs={formData}
                onSetFormData={confirmStepHandler}
              />
            </AccordionItem>
          </Accordion>
          <VStackLayout flex={1} style={{ flexGrow: 1 }} />
          <Button
            size={'xl'}
            disabled={disableSubmitButton}
            onPress={onSubmit}
            isLoading={isLoading}
          >
            {t('onboardingScreen.createPlayerProfile')}
          </Button>
        </VStackLayout>
      </ScrollViewLayout>
    </ScreenLayout>
  )
}

export default OnboardingPlayerScreen
