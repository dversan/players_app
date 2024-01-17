import * as React from 'react'
import { useState } from 'react'
import ScreenLayout from '../../../ui/layout/screen.layout'
import KeyboardAvoidingView from '../../../ui/components/keyboard-avoiding-view'
import ScrollViewLayout from '../../../ui/layout/scrollview.layout'
import VStackLayout from '../../../ui/layout/vstack.layout'
import { Center, Image } from '@gluestack-ui/themed'
import Text from '../../../ui/components/text'
import Input from '../../../ui/components/input'
import BoxLayout from '../../../ui/layout/box.layout'
import HStackLayout from '../../../ui/layout/hstack.layout'
import Link from '../../../ui/components/link'
import Button from '../../../ui/components/button'
import { validate } from '../../../lib/data/helpers'
import { useAuth } from '../../../lib/auth/auth.context'
import { t } from 'i18next'
import { Linking } from 'react-native'
import { links } from '../../../lib/data/links.data'

export default function RegisterScreen({ navigation }) {
  const { signUp } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<{ [id: string]: string }>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function onSubmit() {
    if (validate(formData).validationOk) {
      console.log('validation OK')
      setIsLoading(true)
      const { email, name, lastName, password } = formData
      signUp(email, name, lastName, password)
        .then(res => console.log(res))
        .catch(reason => {
          setIsLoading(false)
          setErrors({ email: reason.message })
        })
    } else {
      setErrors(validate(formData).validationErrors)
    }
  }

  console.log(errors)

  return (
    <ScreenLayout>
      <KeyboardAvoidingView>
        <ScrollViewLayout>
          <VStackLayout p={24} space={'md'}>
            <BoxLayout alignSelf={'center'} mb={5}>
              <Image
                height={45}
                width={45}
                source={require('../../../ui/images/players_logo.jpeg')}
                alt={'players logo'}
              />
            </BoxLayout>
            <VStackLayout space={'3xl'}>
              <Center>
                <Text size={'2xl'} bold>
                  {t('registerScreen.title')}
                </Text>
              </Center>
              <VStackLayout space={'md'}>
                <Input
                  isRequired
                  label={t('registerScreen.form.email') as string}
                  value={formData.email}
                  onChangeText={value =>
                    setFormData({ ...formData, email: value })
                  }
                  error={errors.email}
                  isDisabled={isLoading}
                  autoCapitalize={'none'}
                />
                <Input
                  isRequired
                  label={t('registerScreen.form.name') as string}
                  onChangeText={value =>
                    setFormData({ ...formData, name: value })
                  }
                  error={errors.name}
                  isDisabled={isLoading}
                  autoCapitalize={'none'}
                />
                <Input
                  isRequired
                  label={t('registerScreen.form.lastName') as string}
                  onChangeText={value =>
                    setFormData({ ...formData, lastName: value })
                  }
                  error={errors.lastName}
                  isDisabled={isLoading}
                  autoCapitalize={'none'}
                />
                <Input
                  type={'password'}
                  isRequired
                  label={t('registerScreen.form.password') as string}
                  onChangeText={value =>
                    setFormData({ ...formData, password: value })
                  }
                  error={errors.password}
                  isDisabled={isLoading}
                  autoCapitalize={'none'}
                />
                <Input
                  type={'password'}
                  isRequired
                  label={t('registerScreen.form.confirmPassword') as string}
                  onChangeText={value =>
                    setFormData({ ...formData, confirmPassword: value })
                  }
                  error={errors.confirmPassword}
                  isDisabled={isLoading}
                  autoCapitalize={'none'}
                />
              </VStackLayout>
              <HStackLayout flexWrap={'wrap'}>
                <Text size={'sm'}>{t('registerScreen.termsAndPrivacy')}</Text>
                <Link onPress={() => Linking.openURL(links.terms)}>
                  <Text underline size={'sm'}>
                    {t('registerScreen.terms')}
                  </Text>
                </Link>
                <Text size={'sm'}>{t('registerScreen.and')}</Text>
                <Link onPress={() => Linking.openURL(links.privacy)}>
                  <Text underline size={'sm'}>
                    {t('registerScreen.privacy')}
                  </Text>
                </Link>
              </HStackLayout>
              <Button size={'xl'} isLoading={isLoading} onPress={onSubmit}>
                {t('registerScreen.form.signUp')}
              </Button>
            </VStackLayout>
            <HStackLayout alignSelf={'center'} flexWrap={'wrap'}>
              <Text size={'md'}>{t('registerScreen.alreadyAccount')}</Text>
              <Link onPress={() => navigation.navigate('LoginScreen')}>
                <Text size={'md'} underline>
                  {t('registerScreen.signIn')}
                </Text>
              </Link>
            </HStackLayout>
          </VStackLayout>
        </ScrollViewLayout>
      </KeyboardAvoidingView>
    </ScreenLayout>
  )
}
