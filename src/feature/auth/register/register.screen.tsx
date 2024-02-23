import * as React from 'react'
import { useState } from 'react'
import ScreenLayout from '../../../ui/layout/screen.layout'
import KeyboardAvoidingView from '../../../ui/components/keyboard-avoiding-view'
import ScrollViewLayout from '../../../ui/layout/scrollview.layout'
import VStackLayout from '../../../ui/layout/vstack.layout'
import { Center, Image } from '@gluestack-ui/themed'
import Text from '../../../ui/components/text'
import Input from '../../../ui/components/input'
import HStackLayout from '../../../ui/layout/hstack.layout'
import Link from '../../../ui/components/link'
import Button from '../../../ui/components/button'
import { registerFormValidation } from '../../../lib/data/helpers'
import { useAuth } from '../../../lib/auth/auth.context'
import { t } from 'i18next'
import { Linking } from 'react-native'
import { links } from '../../../lib/data/links.data'
import { RegisterFormFields } from '@lib/data/models'

export default function RegisterScreen({ route, navigation }) {
  const { signUp } = useAuth()
  const [formData, setFormData] = useState<RegisterFormFields>({
    email: '',
    name: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<{ [id: string]: string }>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { authLayoutProps } = route.params

  function onSubmit() {
    if (registerFormValidation(formData).validationOk) {
      setIsLoading(true)
      const { email, name, lastName, password } = formData
      signUp(email, name, lastName, password).catch(reason => {
        setIsLoading(false)
        setErrors({ email: reason.message })
      })
    } else {
      setErrors(registerFormValidation(formData).validationErrors)
    }
  }

  return (
    <ScreenLayout>
      <KeyboardAvoidingView>
        <ScrollViewLayout>
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
                  {t('registerScreen.title')}
                </Text>
              </Center>
              <VStackLayout space={'md'}>
                <Input
                  label={t('registerScreen.form.email') as string}
                  onChangeText={value =>
                    setFormData({ ...formData, email: value.trim() })
                  }
                  error={errors.email}
                  isDisabled={isLoading}
                  autoCapitalize={'none'}
                />
                <Input
                  label={t('registerScreen.form.name') as string}
                  onChangeText={value =>
                    setFormData({ ...formData, name: value.trim() })
                  }
                  error={errors.name}
                  isDisabled={isLoading}
                  autoCapitalize={'none'}
                />
                <Input
                  label={t('registerScreen.form.lastName') as string}
                  onChangeText={value =>
                    setFormData({ ...formData, lastName: value.trim() })
                  }
                  error={errors.lastName}
                  isDisabled={isLoading}
                  autoCapitalize={'none'}
                />
                <Input
                  type={'password'}
                  label={t('registerScreen.form.password') as string}
                  onChangeText={value =>
                    setFormData({ ...formData, password: value.trim() })
                  }
                  error={errors.password}
                  isDisabled={isLoading}
                  autoCapitalize={'none'}
                />
                <Input
                  type={'password'}
                  label={t('registerScreen.form.confirmPassword') as string}
                  onChangeText={value =>
                    setFormData({ ...formData, confirmPassword: value.trim() })
                  }
                  error={errors.confirmPassword}
                  isDisabled={isLoading}
                  autoCapitalize={'none'}
                />
              </VStackLayout>
              <HStackLayout flexWrap={'wrap'}>
                <Text size={'sm'}>{t('registerScreen.termsAndPrivacy')}</Text>
                <Link size={'sm'} onPress={() => Linking.openURL(links.terms)}>
                  {t('registerScreen.terms')}
                </Link>
                <Text size={'sm'}>{t('registerScreen.and')}</Text>
                <Link
                  size={'sm'}
                  color={'white'}
                  onPress={() => Linking.openURL(links.privacy)}
                >
                  {t('registerScreen.privacy')}
                </Link>
              </HStackLayout>
              <Button
                size={'xl'}
                isLoading={isLoading}
                disabled={isLoading}
                onPress={onSubmit}
              >
                {t('registerScreen.form.signUp')}
              </Button>
            </VStackLayout>
            <HStackLayout alignSelf={'center'} flexWrap={'wrap'}>
              <Text>{t('registerScreen.alreadyAccount')}</Text>
              <Link
                color={'white'}
                onPress={() => navigation.navigate('LoginScreen')}
              >
                {t('registerScreen.signIn')}
              </Link>
            </HStackLayout>
          </VStackLayout>
        </ScrollViewLayout>
      </KeyboardAvoidingView>
    </ScreenLayout>
  )
}
