import HStackLayout from '@ui/layout/hstack.layout'
import Input from '@ui/components/input'
import { t } from 'i18next'
import {
  OnboardingSteps,
  ParametersFormData,
  PlayerData,
  ValidationFields
} from '@lib/data/models'
import VStackLayout from '@ui/layout/vstack.layout'
import React, { useRef, useState } from 'react'
import Text from '@ui/components/text'
import { calculateFitnessParameter } from '@lib/data/calculators'
import Button from '@ui/components/button'
import { OnboardingParametersStepValidation } from 'src/feature/onboarding/onboarding-form.validations'

interface OnboardingFormParametersProps {
  onSetFormData: (formData, step: OnboardingSteps, stepToOpen: null) => void
  calculationInputs: PlayerData
}

const OnboardingParametersForm = ({
  onSetFormData,
  calculationInputs
}: OnboardingFormParametersProps) => {
  useState<boolean>(false)
  const [errors, setErrors] = useState<{
    [key: keyof ValidationFields]: string
  }>({})

  const parametersFormDataRef = useRef<ParametersFormData>({
    attack: 0,
    defense: 0,
    fitness: 0,
    goal: 0,
    pass: 0,
    teamWork: 0
  })

  const fitnessParameterValue = calculateFitnessParameter(
    calculationInputs.playerHeight,
    calculationInputs.playerWeight,
    calculationInputs.birthday,
    calculationInputs.gamesPerYearIndex,
    calculationInputs.competitionGamesIndex
  )

  const setFormDataRef = (fieldName, fieldValue) => {
    parametersFormDataRef.current = {
      ...parametersFormDataRef.current,
      fitness: fitnessParameterValue,
      [fieldName]: fieldValue
    }
  }

  const confirmStepButtonHandler = () => {
    if (
      OnboardingParametersStepValidation(parametersFormDataRef.current)[
        `${OnboardingSteps.PARAMETERS}ValidationOk`
      ]
    ) {
      setErrors({})
      onSetFormData(
        parametersFormDataRef.current,
        OnboardingSteps.PARAMETERS,
        null
      )
    } else {
      setErrors(
        OnboardingParametersStepValidation(parametersFormDataRef.current)[
          `${OnboardingSteps.PARAMETERS}ValidationErrors`
        ]
      )
    }
  }

  return (
    <VStackLayout space={'lg'}>
      <Text>{t('onboardingScreen.totalParametersInfo')}</Text>
      <HStackLayout space={'lg'}>
        <Input
          label={t('onboardingScreen.attack')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => setFormDataRef('attack', Number(value))}
          error={errors.attack}
        />
        <Input
          label={t('onboardingScreen.defense')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => setFormDataRef('defense', Number(value))}
          error={errors.defense}
        />
        <Input
          label={t('onboardingScreen.fitness')}
          flex={1}
          formType={'onboarding'}
          value={fitnessParameterValue.toString()}
          error={errors.fitness}
          isReadOnly
        />
      </HStackLayout>
      <HStackLayout space={'lg'}>
        <Input
          label={t('onboardingScreen.goal')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => setFormDataRef('goal', Number(value))}
          error={errors.goal}
        />
        <Input
          label={t('onboardingScreen.pass')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => setFormDataRef('pass', Number(value))}
          error={errors.pass}
        />
        <Input
          label={t('onboardingScreen.teamWork')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => setFormDataRef('teamWork', Number(value))}
          error={errors.teamWork}
        />
      </HStackLayout>
      {Object.keys(errors).length > 0 && (
        <Text color={'red'}>{Object.values(errors)[0]}</Text>
      )}
      <Button
        testID={'parametersStepButton'}
        size={'lg'}
        mt={32}
        alignSelf={'center'}
        onPress={confirmStepButtonHandler}
      >
        {t('onboardingScreen.confirmStep')}
      </Button>
    </VStackLayout>
  )
}

export default OnboardingParametersForm
