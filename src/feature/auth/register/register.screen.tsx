import * as React from 'react'
import ScreenLayout from '../../../ui/layout/screen.layout'
import { colors } from '../../../ui/ui-theme.provider'
import KeyboardAvoidingView from '../../../ui/components/keyboard-avoiding-view'
import ScrollViewLayout from '../../../ui/layout/scrollview.layout'
import VStackLayout from '../../../ui/layout/vstack.layout'
import { CloseCircleIcon, Icon, Text } from '@gluestack-ui/themed'
import Input from '../../../ui/components/input'
import BoxLayout from '../../../ui/layout/box.layout'
import HStackLayout from '../../../ui/layout/hstack.layout'
import Link from '../../../ui/components/link'
import Button from '../../../ui/components/button'
import { useState } from 'react'

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<{ [id: string]: string }>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <ScreenLayout backgroundColor={colors.backgrounds.dark}>
      <KeyboardAvoidingView>
        <ScrollViewLayout>
          <VStackLayout p={10} space={'xl'}>
            <BoxLayout alignSelf={'center'} mt={3} mb={5}>
              <Icon as={CloseCircleIcon} size={'xl'} />
            </BoxLayout>
            <Text size={'lg'}>{'Players'}</Text>
            <VStackLayout space={'md'}>
              <Input
                isRequired
                label={'Email'}
                value={formData.email}
                onChangeText={text =>
                  // setFormData({ ...formData, email: value.trim() })
                  console.log(text)
                }
                error={errors.email}
                isDisabled={isLoading}
                autoCapitalize={'none'}
              />
              <Input
                isRequired
                label={'Name'}
                onChangeText={value =>
                  // setFormData({ ...formData, email: value.trim() })
                  console.log('input onChange pressed')
                }
                // error={errors.email}
                // isDisabled={isLoading}
                autoCapitalize={'none'}
              />
              <Input
                isRequired
                label={'Last Name'}
                onChangeText={value =>
                  // setFormData({ ...formData, email: value.trim() })
                  console.log('input onChange pressed')
                }
                // error={errors.email}
                // isDisabled={isLoading}
                autoCapitalize={'none'}
              />
              <Input
                isRequired
                label={'Password'}
                onChangeText={value =>
                  // setFormData({ ...formData, email: value.trim() })
                  console.log('input onChange pressed')
                }
                // error={errors.email}
                // isDisabled={isLoading}
                autoCapitalize={'none'}
              />
              <Input
                isRequired
                label={'Confirm Password'}
                onChangeText={value =>
                  // setFormData({ ...formData, email: value.trim() })
                  console.log('input onChange pressed')
                }
                // error={errors.email}
                // isDisabled={isLoading}
                autoCapitalize={'none'}
              />
              <HStackLayout flexWrap={'wrap'}>
                <Text size={'sm'}>
                  {
                    'Creando esta cuenta estás aceptando nuestros términos y condiciones y política de privacidad'
                  }
                </Text>
                {/*<Link onPress={() => Linking.openURL(links.terms)}>*/}
                {/*  {i18n.t('registerScreen.terms')}*/}
                {/*</Link>*/}
                {/*<Text fontSize={'sm'}>{i18n.t('registerScreen.and')}</Text>*/}
                {/*<Link onPress={() => Linking.openURL(links.privacy)}>*/}
                {/*  {i18n.t('registerScreen.privacy')}*/}
                {/*</Link>*/}
              </HStackLayout>
            </VStackLayout>
            <Button
              variant={'solid'}
              bg={colors.action.base}
              // isLoading={isLoading}
              // _loading={{ bg: colors.blue.base }}
              // _pressed={{ bg: colors.blue.base }}
              onPress={console.log('onSubmit')}
            >
              {'Registrarse'}
            </Button>
            <HStackLayout alignSelf={'center'} flexWrap={'wrap'}>
              <Text size={'sm'}>{'Ya tienes una cuenta? '}</Text>
              <Link onPress={() => navigation.navigate('LoginScreen')}>
                <Text>{'Sign in'}</Text>
              </Link>
            </HStackLayout>
          </VStackLayout>
        </ScrollViewLayout>
      </KeyboardAvoidingView>
    </ScreenLayout>
  )
}
