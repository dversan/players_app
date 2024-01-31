import React, { useState } from 'react'
import ScreenLayout from '../../../ui/layout/screen.layout'
import Text from '../../../ui/components/text'
import ScrollViewLayout from '../../../ui/layout/scrollview.layout'
import VStackLayout from '../../../ui/layout/vstack.layout'
import Button from '../../../ui/components/button'
import Accordion from '../../../ui/components/accordion'
import AccordionItem from '../../../ui/components/accordionItem'
import { Center } from '@gluestack-ui/themed'
import { t } from 'i18next'
import { customColors as colors } from '../../../ui/ui-theme.provider'
import HStackLayout from '../../../ui/layout/hstack.layout'
import Input, { inputStyle } from '../../../ui/components/input'
import Select from '../../../ui/components/select'
import { loginFormValidation } from '../../../lib/data/helpers'
import { Positions } from '../../../lib/data/models'
import SelectItem from '../../../ui/components/selectItem'

interface PositionValuesProps {
  mainPosition: boolean
  secondPosition: boolean
}

export default function OnboardingPlayerScreen({ route, navigation }: any) {
  const [formData, setFormData] = useState({
    playerNumber: '',
    playerNickname: '',
    mainPosition: '',
    secondPosition: ''
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<{ [id: string]: string }>({})
  const [focusPositionSelect, setFocusPositionSelect] = useState<boolean>(false)
  const [focusSecondPosSelect, setFocusSecondPosSelect] =
    useState<boolean>(false)
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

          <Accordion collapsable={true} style={{ maxWidth: 400 }}>
            <AccordionItem
              value={'firstItem'}
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
                  w={'fitContent'}
                  mt={16}
                  alignSelf={'center'}
                  isLoading={isLoading}
                  onPress={onSubmit}
                >
                  {t('onboardingScreen.confirmStep')}
                </Button>
              </VStackLayout>
            </AccordionItem>
            <AccordionItem
              value={'secondItem'}
              margin={{ mt: 24 }}
              backgroundColor={colors.backgroundDark800}
            ></AccordionItem>
            <AccordionItem
              value={'thirdItem'}
              margin={{ mt: 24 }}
              backgroundColor={colors.backgroundDark800}
            ></AccordionItem>
          </Accordion>
          <Button onPress={() => navigation.navigate('OnboardingClubScreen')}>
            {'GO TO STEP2'}
          </Button>
        </VStackLayout>
      </ScrollViewLayout>
    </ScreenLayout>
  )
}
