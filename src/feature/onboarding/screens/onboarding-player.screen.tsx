import React, { useState } from 'react'
import ScreenLayout from '../../../ui/layout/screen.layout'
import Text from '../../../ui/components/text'
import ScrollViewLayout from '../../../ui/layout/scrollview.layout'
import VStackLayout from '../../../ui/layout/vstack.layout'
import Button from '../../../ui/components/button'
import Accordion from '../../../ui/components/accordion'
import AccordionItem from '../../../ui/components/accordion-item'
import { Center } from '@gluestack-ui/themed'
import { t } from 'i18next'
import { customColors as colors } from '../../../ui/ui-theme.provider'
import { OnboardingSteps } from '../../../lib/data/models'
import OnboardingFormPosition from '../../../ui/components/onboarding-form-position'

export interface PositionValuesProps {
  mainPosition: boolean
  secondPosition: boolean
}

interface OnbaordingFormData {
  playerNumber: number
  playerNickname: string
  mainPosition: string
  secondPosition: string
}

export default function OnboardingPlayerScreen({ route, navigation }: any) {
  const [formData, setFormData] = useState<OnbaordingFormData>({
    playerNumber: 0,
    playerNickname: '',
    mainPosition: '',
    secondPosition: ''
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [errors, setErrors] = useState<{ [id: string]: string }>({})
  const [stepToShow, setStepToShow] = useState<OnboardingSteps>(
    OnboardingSteps.POSITION
  )
  const [stepsCompleted, setStepsCompleted] = useState<string[]>([])

  const hasValue: PositionValuesProps = {
    mainPosition: !!formData.mainPosition,
    secondPosition: !!formData.secondPosition
  }
  const { onboardingLayoutProps } = route.params

  function onSubmit() {
    if (loginFormValidation(formData).validationOk) {
      console.log(formData)
    } else {
      setErrors(loginFormValidation(formData).validationErrors)
    }
  }

  return (
    <ScreenLayout>
      <ScrollViewLayout fullHeight>
        <VStackLayout
          p={onboardingLayoutProps.padding}
          pt={onboardingLayoutProps.paddingTop}
          space={onboardingLayoutProps.mainSpacing}
        >
          <Center>
            <Text size={'lg'} bold>
              {t('onboardingScreen.title').toUpperCase()}
            </Text>
          </Center>

          <Accordion
            collapsable={true}
            style={{ maxWidth: 400 }}
            value={accordionToOpen}
          >
            <AccordionItem
              value={OnboardingSteps.POSITION}
              backgroundColor={colors.backgroundDark800}
              headerTitle={`1 - ${t(
                'onboardingScreen.firstFormTitle'
              )}`.toUpperCase()}
              titleColor={'white'}
              borderRadius={8}
            >
              <VStackLayout space={'lg'}>
                <HStackLayout space={'lg'}>
                  <Input
                    label={t('onboardingScreen.playerNumber')}
                    flex={2}
                    formType={'onboarding'}
                    onChangeText={value =>
                      setFormData({ ...formData, playerNumber: value.trim() })
                    }
                  />
                  <Input
                    label={t('onboardingScreen.playerNickname')}
                    flex={6}
                    formType={'onboarding'}
                    onChangeText={value =>
                      setFormData({ ...formData, playerNickname: value.trim() })
                    }
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
                    onValueChange={value =>
                      setFormData({
                        ...formData,
                        mainPosition: value.trim()
                      })
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
                    onValueChange={value =>
                      setFormData({
                        ...formData,
                        secondPosition: value.trim()
                      })
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
                <Button
                  size={'lg'}
                  style={{ marginTop: 16, paddingHorizontal: 16 }}
                  alignSelf={'center'}
                  isLoading={isLoading}
                  onPress={() =>
                    stepHandler(
                      OnboardingSteps.FITNESS,
                      OnboardingSteps.POSITION
                    )
                  }
                >
                  {t('onboardingScreen.confirmStep')}
                </Button>
              </VStackLayout>
            </AccordionItem>
            <AccordionItem
              value={OnboardingSteps.FITNESS}
              margin={{ mt: 24 }}
              backgroundColor={colors.backgroundDark800}
            >
              <Button
                size={'lg'}
                style={{ marginTop: 34, paddingHorizontal: 16 }}
                alignSelf={'center'}
                isLoading={isLoading}
                onPress={() =>
                  stepHandler(
                    OnboardingSteps.PARAMETERS,
                    OnboardingSteps.FITNESS
                  )
                }
              >
                {' '}
                {t('onboardingScreen.confirmStep')}
              </Button>
            </AccordionItem>
            <AccordionItem
              value={OnboardingSteps.PARAMETERS}
              margin={{ mt: 24 }}
              backgroundColor={colors.backgroundDark800}
            >
              <Button
                size={'lg'}
                style={{ marginTop: 34, paddingHorizontal: 16 }}
                alignSelf={'center'}
                isLoading={isLoading}
                onPress={() =>
                  stepHandler(
                    OnboardingSteps.FITNESS,
                    OnboardingSteps.PARAMETERS
                  )
                }
              >
                {' '}
                {t('onboardingScreen.confirmStep')}
              </Button>
            </AccordionItem>
          </Accordion>
          <Button onPress={() => navigation.navigate('OnboardingClubScreen')}>
            {'GO TO STEP2'}
          </Button>
        </VStackLayout>
      </ScrollViewLayout>
    </ScreenLayout>
  )
}
