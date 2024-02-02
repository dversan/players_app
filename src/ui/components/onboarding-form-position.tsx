import HStackLayout from '../../ui/layout/hstack.layout'
import Input, { inputStyle } from '../../ui/components/input'
import { t } from 'i18next'
import Select from '../../ui/components/select'
import { Positions } from '../../lib/data/models'
import SelectItem from '../../ui/components/select-item'
import VStackLayout from '../../ui/layout/vstack.layout'
import React, { useState } from 'react'
import { PositionValuesProps } from '../../feature/onboarding/screens/onboarding-player.screen'

interface OnboardingFormDorsalProps {
  onSetFormData: (fieldName: string, fieldValue: string | number) => void
  hasValue: PositionValuesProps
}

export default function OnboardingFormPosition({
  onSetFormData,
  hasValue
}: OnboardingFormDorsalProps) {
  const [focusPositionSelect, setFocusPositionSelect] = useState<boolean>(false)
  const [focusSecondPosSelect, setFocusSecondPosSelect] =
    useState<boolean>(false)

  return (
    <VStackLayout space={'lg'}>
      <HStackLayout space={'lg'}>
        <Input
          label={t('onboardingScreen.playerNumber')}
          flex={2}
          formType={'onboarding'}
          onChangeText={value => onSetFormData('playerNumber', value.trim())}
        />
        <Input
          label={t('onboardingScreen.playerNickname')}
          flex={6}
          formType={'onboarding'}
          onChangeText={value => onSetFormData('playerNickname', value.trim())}
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
    </VStackLayout>
  )
}
