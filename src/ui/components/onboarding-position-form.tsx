import HStackLayout from '../../ui/layout/hstack.layout'
import Input, { inputStyle } from '../../ui/components/input'
import { t } from 'i18next'
import Select from '../../ui/components/select'
import {
  OnboardingSteps,
  PositionFormData,
  Positions,
  ValidationFields
} from '@lib/data/models'
import SelectItem from '../../ui/components/select-item'
import VStackLayout from '../../ui/layout/vstack.layout'
import React, { useRef, useState } from 'react'
import Text from '../../ui/components/text'
import Button from '@ui/components/button'
import { OnboardingPositionStepValidation } from 'src/feature/onboarding/onboarding-form.validations'

interface OnboardingFormDorsalProps {
  onSetFormData: (
    formData,
    step: OnboardingSteps,
    stepToOpen?: OnboardingSteps
  ) => void
}

const OnboardingPositionForm = ({
  onSetFormData
}: OnboardingFormDorsalProps) => {
  const [focusPositionSelect, setFocusPositionSelect] = useState<boolean>(false)
  const [focusSecondPosSelect, setFocusSecondPosSelect] =
    useState<boolean>(false)
  const [errors, setErrors] = useState<{
    [key: keyof ValidationFields]: string
  }>({})

  const positionFormDataRef = useRef<PositionFormData>({
    playerNumber: 0,
    playerNickname: '',
    mainPosition: '',
    secondPosition: ''
  })

  const hasValue = {
    inMainPosition: !!positionFormDataRef.current.mainPosition,
    inSecondPosition: !!positionFormDataRef.current.secondPosition
  }

  const setFormDataRef = (fieldName, fieldValue) => {
    positionFormDataRef.current = {
      ...positionFormDataRef.current,
      [fieldName]: fieldValue
    }
  }

  const confirmStepButtonHandler = () => {
    if (
      OnboardingPositionStepValidation(positionFormDataRef.current)[
        `${OnboardingSteps.POSITION}ValidationOk`
      ]
    ) {
      onSetFormData(
        positionFormDataRef.current,
        OnboardingSteps.POSITION,
        OnboardingSteps.FITNESS
      )
      setErrors({})
    } else {
      setErrors(
        OnboardingPositionStepValidation(positionFormDataRef.current)[
          `${OnboardingSteps.POSITION}ValidationErrors`
        ]
      )
    }
  }

  return (
    <VStackLayout space={'lg'}>
      <HStackLayout space={'lg'}>
        <Input
          label={t('onboardingScreen.playerNumber')}
          flex={2}
          formType={'onboarding'}
          onChangeText={value => setFormDataRef('playerNumber', Number(value))}
          error={errors?.playerNumber?.toString()}
        />
        <Input
          label={t('onboardingScreen.playerNickname')}
          flex={6}
          formType={'onboarding'}
          onChangeText={value => setFormDataRef('playerNickname', value.trim())}
          error={errors?.playerNickname?.toString()}
        />
      </HStackLayout>
      <HStackLayout w={'100%'}>
        <Select
          label={t('onboardingScreen.mainPosition')}
          variant={'outline'}
          formType={'onboarding'}
          size={'xl'}
          isInvalid={Object.entries(errors).some(
            ([key, value]) => key === 'mainPosition' && value !== ''
          )}
          placeholder={t('common.text.selectOption')}
          placeholderStyle={
            hasValue.inMainPosition
              ? inputStyle.onboarding.text
              : { fontSize: 20 }
          }
          isFocused={focusPositionSelect}
          onOpen={() => setFocusPositionSelect(true)}
          onClose={() => setFocusPositionSelect(false)}
          onValueChange={value => setFormDataRef('mainPosition', value.trim())}
        >
          {Object.values(Positions).map(position => (
            <SelectItem
              key={position}
              label={t(`onboardingScreen.positions.${position}`)}
              value={position}
            />
          ))}
        </Select>
      </HStackLayout>
      <HStackLayout w={'100%'}>
        <Select
          label={t('onboardingScreen.secondPosition')}
          variant={'outline'}
          formType={'onboarding'}
          size={'xl'}
          isInvalid={Object.entries(errors).some(
            ([key, value]) => key === 'secondPosition' && value !== ''
          )}
          placeholder={t('common.text.selectOption')}
          placeholderStyle={
            hasValue.inSecondPosition
              ? inputStyle.onboarding.text
              : { fontSize: 20 }
          }
          isFocused={focusSecondPosSelect}
          onOpen={() => setFocusSecondPosSelect(true)}
          onClose={() => setFocusSecondPosSelect(false)}
          onValueChange={value =>
            setFormDataRef('secondPosition', value.trim())
          }
        >
          {Object.values(Positions).map(position => (
            <SelectItem
              key={position}
              label={t(`onboardingScreen.positions.${position}`)}
              value={position}
            />
          ))}
        </Select>
      </HStackLayout>
      {Object.keys(errors).length > 0 && (
        <Text color={'red'}>{Object.values(errors)[0]}</Text>
      )}
      <Button
        testID={'positionStepButton'}
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

export default OnboardingPositionForm
