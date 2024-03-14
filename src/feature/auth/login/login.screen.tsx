import React, { useState } from 'react'
import { useAuth } from '@lib/auth/auth.context'
import ScreenLayout from '../../../ui/layout/screen.layout'
import VStackLayout from '../../../ui/layout/vstack.layout'
import Text from '../../../ui/components/text'
import Link from '../../../ui/components/link'
import Input from '../../../ui/components/input'
import HStackLayout from '../../../ui/layout/hstack.layout'
import ScrollViewLayout from '../../../ui/layout/scrollview.layout'
import Button from '../../../ui/components/button'
import { Center, Image } from '@gluestack-ui/themed'
import { t } from 'i18next'
import { loginFormValidation } from '@lib/data/helpers'

const LoginScreen = ({ route, navigation }: any) => {
  const { signInWithEmail } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<{ [id: string]: string }>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { authLayoutProps } = route.params

  const onSubmit = () => {
    if (loginFormValidation(formData).validationOk) {
      setIsLoading(true)
      const { email, password } = formData
      signInWithEmail(email, password).catch(reason => {
        setIsLoading(false)
        setErrors({ email: reason })
      })
    } else {
      setErrors(loginFormValidation(formData).validationErrors)
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
              source={require('../../../ui/images/players_logo.jpeg')}
              alt={'players logo'}
            />
          </Center>
          <VStackLayout space={'3xl'}>
            <Center>
              <Text size={'2xl'} bold>
                {t('loginScreen.title')}
              </Text>
            </Center>
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
              <Input
                type={'password'}
                label={t('loginScreen.form.password') as string}
                onChangeText={value =>
                  setFormData({ ...formData, password: value.trim() })
                }
                error={errors.password}
                isDisabled={isLoading}
              />
            </VStackLayout>
            <Link
              alignSelf={'center'}
              onPress={() => navigation.navigate('PasswordScreen')}
            >
              {t('loginScreen.forgotPassword')}
            </Link>
            <Button size={'xl'} isLoading={isLoading} onPress={onSubmit}>
              {t('loginScreen.form.signUp')}
            </Button>
          </VStackLayout>
          <HStackLayout alignSelf={'center'} flexWrap={'wrap'}>
            <Text>{t('loginScreen.noAccount')}</Text>
            <Link onPress={() => navigation.navigate('RegisterScreen')}>
              {t('loginScreen.signUp')}
            </Link>
          </HStackLayout>
        </VStackLayout>
      </ScrollViewLayout>
    </ScreenLayout>
  )
}

export default LoginScreen
