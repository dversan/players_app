import * as React from 'react'
import ScreenLayout from '../../../ui/layout/screen.layout'
import VStackLayout from '../../../ui/layout/vstack.layout'
import {
  Button,
  ButtonText,
  CloseCircleIcon,
  Icon,
  Image,
  Text
} from '@gluestack-ui/themed'
import { colors } from '../../../ui/ui-theme.provider'
import BoxLayout from '../../../ui/layout/box.layout'
import { t } from 'i18next'

export default function WelcomeScreen({ navigation }) {
  return (
    <ScreenLayout backgroundColor={colors.backgrounds.dark}>
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
          <Text color={colors.text.base} size={'3xl'}>
            Players App
          </Text>
          <Image
            size={'2xl'}
            borderRadius={'$none'}
            source={require('../../../ui/images/player_logo.png')}
            alt={'players welcome image'}
          />
        </VStackLayout>
        <Button
          backgroundColor={colors.action.base}
          variant={'solid'}
          size={'xl'}
          action={colors.action.base}
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          <ButtonText color={colors.text.base} size={'xl'}>
            {t('welcomeScreen.create-player')}
          </ButtonText>
        </Button>
      </VStackLayout>
    </ScreenLayout>
  )
}
