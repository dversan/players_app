import * as React from 'react'
import ScreenLayout from '@ui/layout/screen.layout'
import VStackLayout from '@ui/layout/vstack.layout'
import { Image } from '@gluestack-ui/themed'
import Button from '@ui/components/button'
import Text from '@ui/components/text'
import { t } from 'i18next'

const WelcomeScreen = ({ navigation }) => {
  return (
    <ScreenLayout>
      <VStackLayout
        flex={1}
        p={24}
        justifyContent={'space-between'}
        safeAreaBottomx
      >
        <VStackLayout
          flex={1}
          alignItems={'center'}
          maxHeight={550}
          space={'4xl'}
        >
          <Image
            height={185}
            width={185}
            source={require('@ui/images/players_logo.jpeg')}
            alt={'players logo'}
          />
          <VStackLayout flex={1} alignItems={'center'} space={'xl'} px={16}>
            <Text size={'2xl'} bold>
              {t('welcomeScreen.title')}
            </Text>
            <Text textAlign={'center'}>
              {t('welcomeScreen.appDescription')}
            </Text>
          </VStackLayout>
        </VStackLayout>
        <Button
          variant={'solid'}
          size={'xl'}
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          {t('welcomeScreen.createPlayer')}
        </Button>
      </VStackLayout>
    </ScreenLayout>
  )
}

export default WelcomeScreen
