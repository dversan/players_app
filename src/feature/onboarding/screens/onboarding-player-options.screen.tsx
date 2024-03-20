import React, { useState } from 'react'
import ScreenLayout from '@ui/layout/screen.layout'
import ScrollViewLayout from '@ui/layout/scrollview.layout'
import VStackLayout from '@ui/layout/vstack.layout'
import ButtonCard from '@ui/components/button-card'
import { t } from 'i18next'
import { Center, CheckIcon, Icon, Image } from '@gluestack-ui/themed'
import Text from '@ui/components/text'
import { useAuth } from '@lib/auth/auth.context'
import Modal from '@ui/components/modal'
import { OnboardingPlayerOptions } from '@lib/data/models'
import HStackLayout from '@ui/layout/hstack.layout'
import * as jsonCopies from '../../../lib/translations/es.json'

const OnboardingPlayerOptionsScreen = ({ route, navigation }: any) => {
  const [modalTopic, setModalTopic] = useState<string>('')
  const { onboardingLayoutProps } = route.params
  const { user } = useAuth()

  const cardImage: { [id: OnboardingPlayerOptions]: string } = {
    [OnboardingPlayerOptions.GO_TO_PROFILE]: require('../../../ui/images/playerProfile.png'),
    [OnboardingPlayerOptions.JOIN_A_CLUB]: require('../../../ui/images/joinClub.png'),
    [OnboardingPlayerOptions.CREATE_CLUB]: require('../../../ui/images/createNewClub.png')
  }

  const subTopicsKeyList = () => {
    let listItemsQty = 0
    const topicKey = modalTopic + 'ModalTopics'
    const subtopicsQty = Object.keys(
      jsonCopies.onboardingPlayerOptions[topicKey]
    ).length
    return Array.from({ length: subtopicsQty }, () => (listItemsQty += 1))
  }

  const onClickPrimaryHandler = () => {
    switch (modalTopic) {
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
    setModalTopic('')
  }

  return (
    <ScreenLayout hideBackButton>
      <ScrollViewLayout fullHeight>
        <VStackLayout
          p={onboardingLayoutProps.padding}
          space={onboardingLayoutProps.mainSpacing}
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
                  onPress={() => setModalTopic(value)}
                />
              )
            })}
          </VStackLayout>
        </VStackLayout>
      </ScrollViewLayout>
      {modalTopic && (
        <Modal
          size={'lg'}
          isOpen={!!modalTopic}
          headerTitle={t(`onboardingPlayerOptions.${modalTopic}`)}
          hideCloseButton={true}
          primaryButtonText={t('common.text.continue')}
          secondaryButtonText={t('common.text.goBack')}
          onClose={() => setModalTopic('')}
          onClickPrimaryButton={onClickPrimaryHandler}
        >
          <VStackLayout alignItems={'center'} space={'2xl'} my={8} px={16}>
            <Image source={cardImage[modalTopic]} alt={'Player option image'} />
            <VStackLayout space={'lg'}>
              {subTopicsKeyList().map(key => (
                <HStackLayout key={key} mr={16}>
                  <Icon as={CheckIcon} mr={8} size={'xl'} />
                  <Text bold color={'black'} numberOfLines={2}>
                    {t(
                      `onboardingPlayerOptions.${modalTopic}ModalTopics.${key}`
                    )}
                  </Text>
                </HStackLayout>
              ))}
            </VStackLayout>
          </VStackLayout>
        </Modal>
      )}
    </ScreenLayout>
  )
}

export default OnboardingPlayerOptionsScreen
