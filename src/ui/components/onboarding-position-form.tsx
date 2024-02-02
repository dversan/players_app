import HStackLayout from '../../ui/layout/hstack.layout'
import Input, { inputStyle } from '../../ui/components/input'
import { t } from 'i18next'
import Select from '../../ui/components/select'
import { Positions } from '../../lib/data/models'
import SelectItem from '../../ui/components/select-item'
import VStackLayout from '../../ui/layout/vstack.layout'
import React, { useState } from 'react'
import { PositionValuesProps } from '../../feature/onboarding/screens/onboarding-player.screen'
import Text from '../../ui/components/text'

interface OnboardingFormDorsalProps {
  onSetFormData: (fieldName: string, fieldValue: string | number) => void
  hasValue: PositionValuesProps
  validation: { [id: string]: string }
}

export default function OnboardingPositionForm({
  onSetFormData,
  hasValue,
  validation
}: OnboardingFormDorsalProps) {
  const [focusPositionSelect, setFocusPositionSelect] = useState<boolean>(false)
  const [focusSecondPosSelect, setFocusSecondPosSelect] =
    useState<boolean>(false)

  const someFormFieldEmpty = Object.values(validation).some(
    val => val.includes('required') || val.includes('obligatorio')
  )

  return (
    <VStackLayout space={'lg'}>
      <HStackLayout space={'lg'}>
        <Input
          label={t('onboardingScreen.playerNumberField')}
          flex={2}
          formType={'onboarding'}
          onChangeText={value => onSetFormData('playerNumber', value.trim())}
          error={validation.number}
        />
        <Input
          label={t('onboardingScreen.playerNickname')}
          flex={6}
          formType={'onboarding'}
          onChangeText={value => onSetFormData('playerNickname', value.trim())}
          error={validation.nickName}
        />
      </HStackLayout>
      <HStackLayout w={'100%'}>
        <Select
          label={t('onboardingScreen.mainPosition')}
          variant={'outline'}
          formType={'onboarding'}
          size={'xl'}
          placeholder={t('common.text.selectOption')}
          placeholderStyle={
            hasValue.mainPosition
              ? inputStyle.onboarding.text
              : { fontSize: 20 }
          }
          isFocused={focusPositionSelect}
          onOpen={() => setFocusPositionSelect(true)}
          onClose={() => setFocusPositionSelect(false)}
          onValueChange={value => onSetFormData('mainPosition', value.trim())}
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
          label={t('onboardingScreen.alternativePosition')}
          variant={'outline'}
          formType={'onboarding'}
          size={'xl'}
          placeholder={t('common.text.selectOption')}
          placeholderStyle={
            hasValue.secondPosition
              ? inputStyle.onboarding.text
              : { fontSize: 20 }
          }
          isFocused={focusSecondPosSelect}
          onOpen={() => setFocusSecondPosSelect(true)}
          onClose={() => setFocusSecondPosSelect(false)}
          onValueChange={value => onSetFormData('secondPosition', value.trim())}
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
      {Object.keys(validation).length > 0 && (
        <Text color={'red'}>
          {someFormFieldEmpty
            ? t('common.error.allRequiredField')
            : Object.values(validation)[0]}
        </Text>
      )}
    </VStackLayout>
  )
}
