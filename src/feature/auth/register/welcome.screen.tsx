import * as React from 'react'
import ScreenLayout from '../../../ui/layout/screen.layout'
import VStackLayout from '../../../ui/layout/vstack.layout'
import { CloseCircleIcon, Icon, Image } from '@gluestack-ui/themed'
import Button from '../../../ui/components/button'
import Text from '../../../ui/components/text'
import { dummyColors as colors } from '../../../ui/ui-theme.provider'
import BoxLayout from '../../../ui/layout/box.layout'
import { t } from 'i18next'

export default function WelcomeScreen({ navigation }) {
  return (
    <ScreenLayout>
      <VStackLayout
        flex={1}
        p={5}
        space={'8'}
        justifyContent={'space-between'}
        safeAreaBottomx
      >
        <VStackLayout
          flex={1}
          alignItems={'center'}
          maxHeight={550}
          justifyContent={'space-between'}
        >
          <BoxLayout alignSelf={'center'} mt={3}>
            <Icon as={CloseCircleIcon} size={'xl'} />
          </BoxLayout>
          <Text size={'3xl'}>{'Players App'}</Text>
          <Image
            size={'2xl'}
            borderRadius={'$none'}
            source={require('../../../ui/images/players_logo.jpeg')}
            alt={'players welcome image'}
          />
        </VStackLayout>
        <Button
          variant={'solid'}
          size={'xl'}
          action={colors.action.base}
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          {t('welcomeScreen.create-player')}
        </Button>
      </VStackLayout>
    </ScreenLayout>
  )
}
