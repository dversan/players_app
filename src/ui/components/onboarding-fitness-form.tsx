import HStackLayout from '../../ui/layout/hstack.layout'
import Input, { inputStyle } from '../../ui/components/input'
import { t } from 'i18next'
import Select from '../../ui/components/select'
import {
  OnboardingFormData,
  Positions,
  PositionValuesProps
} from '../../lib/data/models'
import SelectItem from '../../ui/components/select-item'
import VStackLayout from '../../ui/layout/vstack.layout'
import React, { useState } from 'react'
import Text from '../../ui/components/text'
import { ValidationFields } from '@lib/data/helpers'

interface OnboardingFormFitnessProps {
  onSetFormData: (
    fieldName: keyof OnboardingFormData,
    fieldValue: string | number | Date
  ) => void
  hasValue: PositionValuesProps
  validation: { [key: keyof ValidationFields]: string }
}

export default function OnboardingFitnessForm({
  onSetFormData,
  hasValue,
  validation
}: OnboardingFormFitnessProps) {
  const [focusPositionSelect, setFocusPositionSelect] = useState<boolean>(false)
  const [focusSecondPosSelect, setFocusSecondPosSelect] =
    useState<boolean>(false)
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
  const [date, setDate] = useState<Date>()

  const someFormFieldEmpty = Object.values(validation).some(
    r =>
      r.toString().includes('obligatorio') || r.toString().includes('required')
  )

  return (
    <VStackLayout space={'lg'}>
      <HStackLayout space={'lg'}>
        <Input
          label={t('onboardingScreen.height')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => onSetFormData('playerHeight', value.trim())}
          // error={validation.playerHeight?.toString()}
        />
        <Input
          label={t('onboardingScreen.weight')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => onSetFormData('playerWeight', value.trim())}
          // error={validation.playerWeight}
        />
      </HStackLayout>
      <HStackLayout w={'100%'}>
        <VStackLayout flex={1}>
          <Input
            label={t('onboardingScreen.birthdayLabel')}
            flex={1}
            formType={'onboarding'}
            placeholder={t('common.text.selectOption')}
            placeholderStyle={
              hasValue.birthday ? inputStyle.onboarding.text : { fontSize: 20 }
            }
            onPressIn={() => setShowDatePicker(true)}
            caretHidden
            // value={date.toLocaleDateString()}
            // error={validation.playerWeight}
          ></Input>
        </VStackLayout>
      </HStackLayout>
      <HStackLayout w={'100%'}>
        <Select
          label={t('onboardingScreen.mainPosition')}
          variant={'outline'}
          formType={'onboarding'}
          size={'xl'}
          isInvalid={Object.entries(validation).some(
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
          isInvalid={Object.entries(validation).some(
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
