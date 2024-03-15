import HStackLayout from '../../ui/layout/hstack.layout'
import Input, { inputStyle } from '../../ui/components/input'
import { t } from 'i18next'
import Select from '../../ui/components/select'
import {
  CompetitionGamesOptions,
  FitnessFormData,
  GamesPerYearOptions,
  OnboardingSteps,
  ValidationFields
} from '@lib/data/models'
import SelectItem from '../../ui/components/select-item'
import VStackLayout from '../../ui/layout/vstack.layout'
import React, { useRef, useState } from 'react'
import Text from '../../ui/components/text'
import { createNumericEnumKeys } from '@lib/data/helpers'
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native'
import DatePicker from '../../ui/components/datepicker'
import Button from '../../ui/components/button'
import BoxLayout from '../../ui/layout/box.layout'
import { customColors as colors } from '../../ui/ui-theme.provider'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { OnboardingFitnessStepValidation } from 'src/feature/onboarding/onboarding-form.validations'

interface OnboardingFormFitnessProps {
  onSetFormData: (
    formData,
    step: OnboardingSteps,
    stepToOpen?: OnboardingSteps
  ) => void
}

const OnboardingFitnessForm = ({
  onSetFormData
}: OnboardingFormFitnessProps) => {
  const [focusPositionSelect, setFocusPositionSelect] = useState<boolean>(false)
  const [focusSecondPosSelect, setFocusSecondPosSelect] =
    useState<boolean>(false)
  const [errors, setErrors] = useState<{
    [key: keyof ValidationFields]: string
  }>({})
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
  const [date, setDate] = useState<Date | undefined>()
  const [previousDate, setPreviousDate] = useState<Date | undefined>()

  const fitnessFormDataRef = useRef<FitnessFormData>({
    playerHeight: 0,
    playerWeight: 0,
    birthday: '',
    gamesPerYearIndex: 0,
    competitionGamesIndex: 0
  })

  const hasValue = {
    birthday: !!fitnessFormDataRef.current.birthday,
    gamesPerYearIndex: !!fitnessFormDataRef.current.gamesPerYearIndex,
    competitionGamesIndex: !!fitnessFormDataRef.current.competitionGamesIndex
  }

  const setFormDataRef = (fieldName, fieldValue) => {
    fitnessFormDataRef.current = {
      ...fitnessFormDataRef.current,
      [fieldName]: fieldValue
    }
  }

  const iosDatePickerButtonsHandler = (type: 'ok' | 'cancel') => {
    setShowDatePicker(false)
    setPreviousDate(date)

    type === 'cancel'
      ? setDate(previousDate)
      : setFormDataRef('birthday', date || '')
  }

  const datePickerOnChangeHandler = (
    e: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (Platform.OS === 'android' && (e.type === 'dismissed' || 'set')) {
      setShowDatePicker(false)
      setDate(selectedDate)
      setFormDataRef(
        'birthday',
        selectedDate ? selectedDate.toLocaleDateString() : ''
      )
    }
    setDate(selectedDate)
  }

  const confirmStepButtonHandler = () => {
    if (
      OnboardingFitnessStepValidation(fitnessFormDataRef.current)[
        `${OnboardingSteps.FITNESS}ValidationOk`
      ]
    ) {
      onSetFormData(
        fitnessFormDataRef.current,
        OnboardingSteps.FITNESS,
        OnboardingSteps.PARAMETERS
      )
      setErrors({})
    } else {
      setErrors(
        OnboardingFitnessStepValidation(fitnessFormDataRef.current)[
          `${OnboardingSteps.FITNESS}ValidationErrors`
        ]
      )
    }
  }

  return (
    <VStackLayout space={'lg'}>
      <HStackLayout space={'lg'}>
        <Input
          label={t('onboardingScreen.height')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => setFormDataRef('playerHeight', Number(value))}
          error={errors.playerHeight?.toString()}
        />
        <Input
          label={t('onboardingScreen.weight')}
          flex={1}
          formType={'onboarding'}
          onChangeText={value => setFormDataRef('playerWeight', Number(value))}
          error={errors.playerWeight?.toString()}
        />
      </HStackLayout>
      <HStackLayout w={'100%'}>
        <VStackLayout flex={1}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <Input
              readOnly={Platform.OS === 'ios'}
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
              error={errors.birthday}
            />
          </TouchableWithoutFeedback>
          {showDatePicker && (
            <BoxLayout
              style={Platform.OS === 'ios' ? iOSDatePickerContainerStyle : {}}
            >
              <DatePicker
                testID={'datePicker'}
                value={date ? new Date(date) : new Date()}
                onChange={(e, selectedDate) =>
                  datePickerOnChangeHandler(e, selectedDate)
                }
                display={'spinner'}
                themeVariant={'dark'}
              />
              {Platform.OS === 'ios' && (
                <HStackLayout space={'lg'} alignSelf={'center'}>
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
          isInvalid={Object.entries(errors).some(
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
            setFormDataRef('gamesPerYearIndex', Number(value))
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
          isInvalid={Object.entries(errors).some(
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
            setFormDataRef('competitionGamesIndex', Number(value))
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
      {Object.keys(errors).length > 0 && (
        <Text color={'red'}>{Object.values(errors)[0]}</Text>
      )}
      <Button
        testID={'fitnessStepButton'}
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

const iOSDatePickerContainerStyle = {
  borderWidth: 2,
  borderRadius: 8,
  borderBottomColor: colors.primary500,
  borderLeftColor: colors.primary500,
  borderRightColor: colors.primary500,
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0
}

export default OnboardingFitnessForm
