import HStackLayout from '../../ui/layout/hstack.layout'
import Input from '../../ui/components/input'
import { t } from 'i18next'
import { PlayerData } from '../../lib/data/models'
import VStackLayout from '../../ui/layout/vstack.layout'
import React from 'react'
import Text from '../../ui/components/text'
import { ValidationFields } from '../../lib/data/helpers'

interface OnboardingFormParametersProps {
  onSetFormData: (
    fieldName: keyof PlayerData,
    fieldValue: string | number | Date
  ) => void
  validation: { [key: keyof ValidationFields]: string }
}

export default function OnboardingParametersForm({
  onSetFormData,
  validation
}: OnboardingFormParametersProps) {
  return (
    <VStackLayout space={'lg'}>
      <HStackLayout space={'lg'}>
        <Input
          label={t('onboardingScreen.attack')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => onSetFormData('attack', Number(value))}
          error={validation.attack}
        />
        <Input
          label={t('onboardingScreen.defense')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => onSetFormData('defense', Number(value))}
          error={validation.defense}
        />
        <Input
          label={t('onboardingScreen.fitness')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => onSetFormData('fitness', Number(value))}
          error={validation.fitness}
        />
      </HStackLayout>
      <HStackLayout space={'lg'}>
        <Input
          label={t('onboardingScreen.goal')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => onSetFormData('goal', Number(value))}
          error={validation.goal}
        />
        <Input
          label={t('onboardingScreen.pass')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => onSetFormData('pass', Number(value))}
          error={validation.pass}
        />
        <Input
          label={t('onboardingScreen.teamWork')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => onSetFormData('teamWork', Number(value))}
          error={validation.teamWork}
        />
      </HStackLayout>

      {Object.keys(validation).length > 0 && (
        <Text color={'red'}>{Object.values(validation)[0]}</Text>
      )}
    </VStackLayout>
  )
}
