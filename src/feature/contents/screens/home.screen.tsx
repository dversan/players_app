import React from 'react'
import ScreenLayout from '../../../ui/layout/screen.layout'
import ScrollViewLayout from '../../../ui/layout/scrollview.layout'
import VStackLayout from '../../../ui/layout/vstack.layout'
import { Center, Image } from '@gluestack-ui/themed'
import ButtonCard from '@ui/components/button-card'
import { t } from 'i18next'

type HomeScreenOptions = 'playerProfile' | 'matches' | 'trophies' | 'parameters'

const HomeScreen = ({ route }: any) => {
  const { contentsLayoutProps } = route.params
  const homeScreenOptions: HomeScreenOptions[] = [
    'playerProfile',
    'matches',
    'trophies',
    'parameters'
  ]

  const cardImage: { [id: HomeScreenOptions]: string } = {
    playerProfile: require('../../../ui/images/playerProfile.png'),
    matches: require('../../../ui/images/matches.png'),
    trophies: require('../../../ui/images/trophy.png'),
    parameters: require('../../../ui/images/parameters.png')
  }

  return (
    <ScreenLayout>
      <ScrollViewLayout fullHeight>
        <VStackLayout
          p={contentsLayoutProps.padding}
          space={contentsLayoutProps.mainSpacing}
        >
          <Center>
            <Image
              height={contentsLayoutProps.logoH}
              width={contentsLayoutProps.logoW}
              source={require('../../../ui/images/players_logo.jpeg')}
              alt={'players logo'}
            />
          </Center>
          <VStackLayout flex={1} space={'lg'}>
            {homeScreenOptions.map(option => {
              return (
                <ButtonCard
                  key={option}
                  title={t(`homeScreen.options.${option}`)}
                  imageUrl={cardImage[option]}
                  // onPress={() => setModalTopic(value)}
                />
              )
            })}
          </VStackLayout>
        </VStackLayout>
      </ScrollViewLayout>
    </ScreenLayout>
  )
}

export default HomeScreen
