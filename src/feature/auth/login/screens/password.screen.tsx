import Text from '@ui/components/text'
import { Center, Image } from '@gluestack-ui/themed'
import Input from '@ui/components/input'
import React, { useState } from 'react'
import ScreenLayout from '@ui/layout/screen.layout'
import ScrollViewLayout from '@ui/layout/scrollview.layout'
import VStackLayout from '@ui/layout/vstack.layout'
import { t } from 'i18next'
import { useAuth } from '@lib/auth/auth.context'
import { Alert } from 'react-native'
import Button from '@ui/components/button'
import { resetPasswordFormValidation } from '../login-form.validations'

const PasswordScreen = ({ route, navigation }) => {
  const { recoverPassword } = useAuth()
  const [formData, setFormData] = useState({ email: '' })
  const [errors, setErrors] = useState<{ [id: string]: string }>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { authLayoutProps } = route.params

  const onSubmit = () => {
    if (resetPasswordFormValidation(formData.email).validationOk) {
      setIsLoading(true)
      const { email } = formData
      recoverPassword(email)
        .then(() => {
          navigation.goBack()
          Alert.alert(
            t('passwordScreen.alert.title'),
            t('passwordScreen.alert.message'),
            [{ text: t('common.text.ok') }]
          )
        })
        .catch(reason => {
          setIsLoading(false)
          setErrors({ email: reason })
        })
    } else {
      setErrors(resetPasswordFormValidation(formData.email).validationErrors)
    }
  }

  return (
    <ScreenLayout>
      <ScrollViewLayout fullHeight>
        <VStackLayout
          p={authLayoutProps.padding}
          pt={authLayoutProps.paddingTop}
          space={authLayoutProps.mainSpacing}
        >
          <Center>
            <Image
              height={authLayoutProps.logoH}
              width={authLayoutProps.logoW}
              source={require('@ui/images/players_logo.jpeg')}
              alt={'players logo'}
            />
          </Center>
          <VStackLayout space={'3xl'}>
            <Center>
              <Text size={'2xl'} bold>
                {t('passwordScreen.title')}
              </Text>
            </Center>
            <Text size={'lg'}>{t('passwordScreen.description')}</Text>
            <VStackLayout space={'md'}>
              <Input
                label={t('loginScreen.form.email') as string}
                onChangeText={value =>
                  setFormData({ ...formData, email: value.trim() })
                }
                error={errors.email}
                isDisabled={isLoading}
                autoCapitalize={'none'}
              />
            </VStackLayout>
            <Button size={'xl'} isLoading={isLoading} onPress={onSubmit}>
              {t('passwordScreen.cta')}
            </Button>
          </VStackLayout>
        </VStackLayout>
      </ScrollViewLayout>
    </ScreenLayout>
  )
}

export default PasswordScreen
