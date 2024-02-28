import React, { useState } from 'react'
import ScreenLayout from '@ui/layout/screen.layout'
import ScrollViewLayout from '@ui/layout/scrollview.layout'
import VStackLayout from '@ui/layout/vstack.layout'
import ButtonCard from '@ui/components/button-card'
import { t } from 'i18next'
import { Center, Image } from '@gluestack-ui/themed'
import Text from '@ui/components/text'
import { useAuth } from '@lib/auth/auth.context'
import GSModal from '@ui/components/modal'
import { OnboardingPlayerOptions } from '@lib/data/models'
import { customColors } from '@ui/ui-theme.provider'

export default function OnboardingPlayerOptionsScreen({
  route,
  navigation
}: any) {
  const [showModalValue, setShowModalValue] = useState<string>('')
  const { onboardingLayoutProps } = route.params
  const { user } = useAuth()

  const cardImage: { [id: OnboardingPlayerOptions]: string } = {
    [OnboardingPlayerOptions.GO_TO_PROFILE]: require('../../../ui/images/goToProfile.png'),
    [OnboardingPlayerOptions.JOIN_A_CLUB]: require('../../../ui/images/joinClub.png'),
    [OnboardingPlayerOptions.CREATE_CLUB]: require('../../../ui/images/createNewClub.png')
  }

  const onClickPrimaryHandler = () => {
    switch (showModalValue) {
      case 'goToProfile':
        navigation.navigate('HomeScreen')
        break
      case 'joinClub':
        navigation.navigate('OnboardingOptionSelectClubScreen')
        break
      case 'createNewClub':
        navigation.navigate('OnboardingClubScreen')
        break
    }
    setShowModalValue('')
  }

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
            {Object.entries(OnboardingPlayerOptions).map(([key, value]) => {
              return (
                <ButtonCard
                  key={key}
                  title={t(`onboardingPlayerOptions.${value}`)}
                  text={t(`onboardingPlayerOptions.${value}Description`)}
                  imageUrl={cardImage[value]}
                  onPress={() => setShowModalValue(value)}
                />
              )
            })}
          </VStackLayout>
        </VStackLayout>
        {showModalValue && (
          <GSModal
            size={'lg'}
            isOpen={!!showModalValue}
            headerTitle={t(`onboardingPlayerOptions.${showModalValue}`)}
            hideCloseButton={true}
            primaryButtonText={t('Continue')}
            secondaryButtonText={t('Go Back')}
            onClose={() => setShowModalValue('')}
            onClickPrimaryButton={onClickPrimaryHandler}
          >
            <VStackLayout flex={1} alignItems={'center'} space={'lg'} mt={8}>
              <Image
                source={cardImage[showModalValue]}
                alt={'Player option image'}
              />
              <Text color={customColors.darkPrimaryText500}>
                {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n' +
                  '\n' +
                  'This text is used to fill spaces where actual content will be placed in the final product, allowing designers and developers to focus on layout and visual presentation without the distraction of meaningful text.'}
              </Text>
            </VStackLayout>
          </GSModal>
        )}
      </ScrollViewLayout>
    </ScreenLayout>
  )
}
