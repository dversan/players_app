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
import { customColors as colors } from '../../../ui/ui-theme.provider'
import {
  OnboardingSteps,
  PlayerData,
  SelectValuesProps
} from '@lib/data/models'
import OnboardingPositionForm from '@ui/components/onboarding-position-form'
import OnboardingFitnessForm from '@ui/components/onboarding-fitness-form'
import OnboardingParametersForm from '@ui/components/onboarding-parameters-form'
import { OnboardingStepsValidation, ValidationFields } from '@lib/data/helpers'
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
  const [errors, setErrors] = useState<{
    [key: keyof ValidationFields]: string
  }>({})
  const [stepToShow, setStepToShow] = useState<OnboardingSteps | ''>(
    OnboardingSteps.POSITION
  )
  const [stepsCompleted, setStepsCompleted] = useState<string[]>([])
  const disableSubmitButton =
    stepsCompleted.length !== Object.keys(OnboardingSteps).length
  const hasValue: SelectValuesProps = {
    inMainPosition: !!formData.mainPosition,
    inSecondPosition: !!formData.secondPosition,
    birthday: !!formData.birthday,
    gamesPerYearIndex: !!formData.gamesPerYearIndex,
    competitionGamesIndex: !!formData.competitionGamesIndex
  }
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

  const stepHandler = (step: OnboardingSteps, stepToOpen?: OnboardingSteps) => {
    if (OnboardingStepsValidation(formData)[`${step}ValidationOk`]) {
      if (!stepsCompleted.includes(step)) {
        const currentStepsCompleted = stepsCompleted.concat(step)
        setStepsCompleted(currentStepsCompleted)
      }
      setErrors({})
      setStepToShow(stepToOpen || '')
    } else {
      setErrors(OnboardingStepsValidation(formData)[`${step}ValidationErrors`])
    }
  }

  const onSetFormData = (nestedFormData, step, stepToOpen) => {
    setFormData(prevState => ({
      ...prevState,
      ...nestedFormData
    }))
    stepHandler(step, stepToOpen)
  }

  console.log('formData: ', formData)

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
                onSetFormData={onSetFormData}
                isLoading={isLoading}
                hasValue={hasValue}
                onSetAccordionToOpen={onSetAccordionToOpen}
                validation={errors}
              />
            </AccordionItem>
            {/*<AccordionItem*/}
            {/*  value={OnboardingSteps.FITNESS}*/}
            {/*  margin={{ mt: 24 }}*/}
            {/*  backgroundColor={colors.backgroundDark800}*/}
            {/*  headerTitle={`${t(*/}
            {/*    `onboardingScreen.${OnboardingSteps.FITNESS}Title`*/}
            {/*  )}`.toUpperCase()}*/}
            {/*  titleColor={'white'}*/}
            {/*  borderRadius={8}*/}
            {/*  stepsCompleted={stepsCompleted}*/}
            {/*  showCheckIcon={stepsCompleted.includes(OnboardingSteps.FITNESS)}*/}
            {/*>*/}
            {/*  <OnboardingFitnessForm*/}
            {/*    onSetFormData={onSetFormData}*/}
            {/*    isLoading={isLoading}*/}
            {/*    hasValue={hasValue}*/}
            {/*    onSetAccordionToOpen={onSetAccordionToOpen}*/}
            {/*    validation={errors}*/}
            {/*  />*/}
            {/*  <Button*/}
            {/*    testID={'fitnessStepButton'}*/}
            {/*    size={'lg'}*/}
            {/*    mt={32}*/}
            {/*    alignSelf={'center'}*/}
            {/*    isLoading={isLoading}*/}
            {/*    onPress={() =>*/}
            {/*      stepHandler(*/}
            {/*        OnboardingSteps.FITNESS,*/}
            {/*        OnboardingSteps.PARAMETERS*/}
            {/*      )*/}
            {/*    }*/}
            {/*  >*/}
            {/*    {t('onboardingScreen.confirmStep')}*/}
            {/*  </Button>*/}
            {/*</AccordionItem>*/}
            {/*<AccordionItem*/}
            {/*  value={OnboardingSteps.PARAMETERS}*/}
            {/*  margin={{ mt: 24 }}*/}
            {/*  backgroundColor={colors.backgroundDark800}*/}
            {/*  headerTitle={`${t(*/}
            {/*    `onboardingScreen.${OnboardingSteps.PARAMETERS}Title`*/}
            {/*  )}`.toUpperCase()}*/}
            {/*  titleColor={'white'}*/}
            {/*  borderRadius={8}*/}
            {/*  stepsCompleted={stepsCompleted}*/}
            {/*  showCheckIcon={stepsCompleted.includes(*/}
            {/*    OnboardingSteps.PARAMETERS*/}
            {/*  )}*/}
            {/*>*/}
            {/*  <OnboardingParametersForm*/}
            {/*    onSetFormData={onSetFormData}*/}
            {/*    isLoading={isLoading}*/}
            {/*    validation={errors}*/}
            {/*    parametersData={formData}*/}
            {/*  />*/}
            {/*  <Button*/}
            {/*    testID={'parametersStepButton'}*/}
            {/*    size={'lg'}*/}
            {/*    mt={32}*/}
            {/*    alignSelf={'center'}*/}
            {/*    isLoading={isLoading}*/}
            {/*    onPress={() => stepHandler(OnboardingSteps.PARAMETERS)}*/}
            {/*  >*/}
            {/*    {t('onboardingScreen.confirmStep')}*/}
            {/*  </Button>*/}
            {/*</AccordionItem>*/}
          </Accordion>
          <VStackLayout flex={1} style={{ flexGrow: 1 }} />
          <Button size={'xl'} disabled={disableSubmitButton} onPress={onSubmit}>
            {t('onboardingScreen.createPlayerProfile')}
          </Button>
        </VStackLayout>
      </ScrollViewLayout>
    </ScreenLayout>
  )
}

export default OnboardingPlayerScreen
