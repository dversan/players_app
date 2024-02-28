import React from 'react'
import ScreenLayout from '@ui/layout/screen.layout'
import ScrollViewLayout from '@ui/layout/scrollview.layout'
import VStackLayout from '@ui/layout/vstack.layout'
import ButtonCard from '@ui/components/button-card'
import { t } from 'i18next'
import { Center, Image } from '@gluestack-ui/themed'
import Text from '@ui/components/text'
import { useAuth } from '@lib/auth/auth.context'

export default function OnboardingPlayerOptionsScreen({ route }: any) {
  const { onboardingLayoutProps } = route.params
  const { user } = useAuth()

  return (
    <ScreenLayout>
      <ScrollViewLayout fullHeight>
        <VStackLayout
          p={16}
          pt={onboardingLayoutProps.paddingTop}
          space={'3xl'}
        >
          <Center>
            <Image
              height={onboardingLayoutProps.logoH}
              width={onboardingLayoutProps.logoW}
              source={require('../../../ui/images/players_logo.jpeg')}
              alt={'players logo'}
            />
          </Center>
          <VStackLayout space={'lg'} alignItems={'center'}>
            <Text size={'3xl'} bold>
              {t('onboardingPlayerOptions.title', { name: user.name })}
            </Text>
            <Text>{t('onboardingPlayerOptions.description')}</Text>
          </VStackLayout>
          <VStackLayout flex={1} space={'lg'}>
            <ButtonCard
              title={t('onboardingPlayerOptions.goToProfile')}
              text={t('onboardingPlayerOptions.goToProfileDescription')}
              imageUrl={require('../../../ui/images/goToProfile.png')}
            />
            <ButtonCard
              title={t('onboardingPlayerOptions.joinClub')}
              text={t('onboardingPlayerOptions.joinClubDescription')}
              imageUrl={require('../../../ui/images/joinClub.png')}
            />
            <ButtonCard
              title={t('onboardingPlayerOptions.createNewClub')}
              text={t('onboardingPlayerOptions.createNewClubDescription')}
              imageUrl={require('../../../ui/images/createNewClub.png')}
            />
          </VStackLayout>
        </VStackLayout>
      </ScrollViewLayout>
    </ScreenLayout>
  )
}
