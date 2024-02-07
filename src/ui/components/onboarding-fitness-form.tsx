import HStackLayout from '../../ui/layout/hstack.layout'
import Input, { inputStyle } from '../../ui/components/input'
import { t } from 'i18next'
import Select from '../../ui/components/select'
import {
  CompetitionGamesOptions,
  GamesPerYearOptions,
  OnboardingFormData,
  PositionValuesProps
} from '../../lib/data/models'
import SelectItem from '../../ui/components/select-item'
import VStackLayout from '../../ui/layout/vstack.layout'
import React, { useState } from 'react'
import Text from '../../ui/components/text'
import { createNumericEnumKeys, ValidationFields } from '../../lib/data/helpers'
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native'
import DatePicker from '../../ui/components/datepicker'
import Button from '../../ui/components/button'
import BoxLayout from '../../ui/layout/box.layout'
import { customColors as colors } from '../../ui/ui-theme.provider'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'

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
  const [date, setDate] = useState<Date | undefined>()
  const [previousDate, setPreviousDate] = useState<Date | undefined>()

  const someFormFieldEmpty = Object.values(validation).some(
    r =>
      r.toString().includes('obligatorio') || r.toString().includes('required')
  )

  const iosDatePickerButtonsHandler = (type: 'ok' | 'cancel') => {
    setShowDatePicker(false)
    setPreviousDate(date)

    type === 'cancel'
      ? setDate(previousDate)
      : onSetFormData('birthday', date ? date.toLocaleDateString() : '')
  }

  const datePickerOnChangeHandler = (
    e: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (Platform.OS === 'android' && (e.type === 'dismissed' || 'set')) {
      setShowDatePicker(false)
      setDate(selectedDate)
      onSetFormData(
        'birthday',
        selectedDate ? selectedDate.toLocaleDateString() : ''
      )
    }
    setDate(selectedDate)
  }

  return (
    <VStackLayout space={'lg'}>
      <HStackLayout space={'lg'}>
        <Input
          label={t('onboardingScreen.height')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => onSetFormData('playerHeight', value.trim())}
          error={validation.playerHeight?.toString()}
        />
        <Input
          label={t('onboardingScreen.weight')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => onSetFormData('playerWeight', value.trim())}
          error={validation.playerWeight?.toString()}
        />
      </HStackLayout>
      <HStackLayout w={'100%'}>
        <VStackLayout flex={1}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <Input
              label={t('onboardingScreen.birthdayLabel')}
              formType={'onboarding'}
              placeholder={t('onboardingScreen.birthdayPlaceholder')}
              placeholderStyle={
                hasValue.birthday
                  ? inputStyle.onboarding.text
                  : { fontSize: 20 }
              }
              onPressIn={() => setShowDatePicker(true)}
              caretHidden
              value={date && new Date(date).toLocaleDateString()}
              pb={!hasValue.birthday && Platform.OS === 'ios' ? 6 : 0}
              // error={validation.playerWeight}
            />
          </TouchableWithoutFeedback>
          {showDatePicker && (
            <BoxLayout
              style={Platform.OS === 'ios' ? iOSDatePickerContainerStyle : {}}
            >
              <DatePicker
                value={date ? new Date(date) : new Date()}
                onChange={(e, selectedDate) =>
                  datePickerOnChangeHandler(e, selectedDate)
                }
                display={'spinner'}
                themeVariant={'dark'}
              />
              {Platform.OS === 'ios' && (
                <HStackLayout space={'lg'} style={{ alignSelf: 'center' }}>
                  <Button
                    textColor={'white'}
                    size={'lg'}
                    variant={'link'}
                    onPress={() => iosDatePickerButtonsHandler('ok')}
                  >
                    {t('common.text.ok')}
                  </Button>
                  <Button
                    textColor={colors.backgroundLight500}
                    size={'lg'}
                    variant={'link'}
                    onPress={() => iosDatePickerButtonsHandler('cancel')}
                  >
                    {t('common.text.cancel')}
                  </Button>
                </HStackLayout>
              )}
            </BoxLayout>
          )}
        </VStackLayout>
      </HStackLayout>
      <HStackLayout w={'100%'}>
        <Select
          label={t('onboardingScreen.gamesLabel')}
          variant={'outline'}
          formType={'onboarding'}
          size={'xl'}
          isInvalid={Object.entries(validation).some(
            ([key, value]) => key === 'gamesPerYearIndex' && value !== ''
          )}
          placeholder={t('onboardingScreen.gamesPlaceholder')}
          placeholderStyle={
            hasValue.gamesPerYearIndex
              ? inputStyle.onboarding.text
              : { fontSize: 20 }
          }
          isFocused={focusPositionSelect}
          onOpen={() => setFocusPositionSelect(true)}
          onClose={() => setFocusPositionSelect(false)}
          onValueChange={value =>
            onSetFormData('gamesPerYearIndex', value.trim())
          }
        >
          {createNumericEnumKeys(GamesPerYearOptions).map(range => (
            <SelectItem
              key={range.label}
              label={t(
                `onboardingScreen.gamesRange.${range.label.toLowerCase()}`
              )}
              value={range.value}
            />
          ))}
        </Select>
      </HStackLayout>
      <HStackLayout w={'100%'}>
        <Select
          label={t('onboardingScreen.competitionGamesLabel')}
          variant={'outline'}
          formType={'onboarding'}
          size={'xl'}
          isInvalid={Object.entries(validation).some(
            ([key, value]) =>
              key === 'competitionGamesIndex' && value.toString() !== ''
          )}
          placeholder={t('onboardingScreen.competitionGamesPlaceholder')}
          placeholderStyle={
            hasValue.competitionGamesIndex
              ? inputStyle.onboarding.text
              : { fontSize: 20 }
          }
          isFocused={focusSecondPosSelect}
          onOpen={() => setFocusSecondPosSelect(true)}
          onClose={() => setFocusSecondPosSelect(false)}
          onValueChange={value =>
            onSetFormData('competitionGamesIndex', value.trim())
          }
        >
          {createNumericEnumKeys(CompetitionGamesOptions).map(range => (
            <SelectItem
              key={range.label}
              label={t(
                `onboardingScreen.gamesPercentage.${range.label.toLowerCase()}`
              )}
              value={range.value}
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

const iOSDatePickerContainerStyle = {
  borderWidth: 2,
  borderRadius: 8,
  borderBottomColor: colors.primary500,
  borderLeftColor: colors.primary500,
  borderRightColor: colors.primary500,
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0
}
