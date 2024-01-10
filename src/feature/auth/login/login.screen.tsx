import React, { useState } from 'react'
import { useAuth } from '../../../lib/auth/auth.context'
import ScreenLayout from '../../../ui/layout/screen.layout'
import BoxLayout from '../../../ui/layout/box.layout'
import VStackLayout from '../../../ui/layout/vstack.layout'
import Text from '../../../ui/components/text'
import Link from '../../../ui/components/link'
import { colors } from '../../../ui/ui-theme.provider'
import Input from '../../../ui/components/input'
import HStackLayout from '../../../ui/layout/hstack.layout'
import ScrollViewLayout from '../../../ui/layout/scrollview.layout'
import Button from '../../../ui/components/button'
import { CloseCircleIcon, Icon, Center } from '@gluestack-ui/themed'
import { t } from 'i18next'

export default function LoginScreen({ navigation }: any) {
  const { signInWithEmail, user } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<{ [id: string]: string }>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function validate() {
    let errorsValidation = {}
    if (formData.email.trim().length === 0) {
      errorsValidation = {
        ...errorsValidation,
        email: t('common.error.requiredField', {
          field: t('registerScreen.form.email')
        })
      }
    }
    if (formData.password.trim().length < 6) {
      errorsValidation = {
        ...errorsValidation,
        password: t('common.error.minLengthField', {
          field: t('registerScreen.form.password'),
          number: 6
        })
      }
    }

    setErrors(errorsValidation)

    return Object.keys(errorsValidation).length === 0
  }

  function onSubmit() {
    if (validate()) {
      setIsLoading(true)
      const { email, password } = formData
      signInWithEmail(email, password)
        .then(res => console.log(res))
        .catch(reason => {
          setIsLoading(false)
          setErrors({ email: reason })
        })
    }
  }

  console.log(user)

  return (
    <ScreenLayout backgroundColor={colors.backgrounds.base}>
      <ScrollViewLayout fullHeight>
        <VStackLayout flex={1} p={5} space={8} justifyContent={'space-between'}>
          <VStackLayout p={10} space={'xl'}>
            <BoxLayout alignSelf={'center'} mt={3} mb={5}>
              <Icon as={CloseCircleIcon} size={'xl'} />
            </BoxLayout>
            <Center>
              <Text size={'lg'}>{'Players'}</Text>
            </Center>
            <VStackLayout space={'md'}>
              <Input
                isRequired
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
                isRequired
                label={t('loginScreen.form.password') as string}
                onChangeText={value =>
                  setFormData({ ...formData, password: value })
                }
                error={errors.password}
                isDisabled={isLoading}
              />
            </VStackLayout>
            <Link
              alignSelf={'center'}
              onPress={() => navigation.navigate('PasswordScreen')}
            >
              {<Text>{t('loginScreen.forgotPassword')}</Text>}
            </Link>
          </VStackLayout>
          <VStackLayout space={8} safeArea>
            <Button
              variant={'solid'}
              bg={colors.action.base}
              isLoading={isLoading}
              // _loading={{ bg: colors.action.base }}
              // _pressed={{ bg: colors.action.base }}
              onPress={onSubmit}
            >
              {t('loginScreen.form.signUp')}
            </Button>
            <HStackLayout alignSelf={'center'} flexWrap={'wrap'}>
              <Text size={'sm'}>{t('loginScreen.noAccount')}</Text>
              <Link onPress={() => navigation.navigate('RegisterScreen')}>
                {<Text>{t('loginScreen.signUp')}</Text>}
              </Link>
            </HStackLayout>
          </VStackLayout>
        </VStackLayout>
      </ScrollViewLayout>
    </ScreenLayout>
  )
}
