import ScreenLayout from '@ui/layout/screen.layout'
import ScrollViewLayout from '@ui/layout/scrollview.layout'
import VStackLayout from '@ui/layout/vstack.layout'
import Text from '@ui/components/text'
import { Center } from '@gluestack-ui/themed'
import { ArrowBigUp } from 'lucide-react-native'
import { t } from 'i18next'
import HStackLayout from '@ui/layout/hstack.layout'
import PlayerInfoChip from '@ui/components/player-info-chip'
import Avatar from '@ui/components/avatar'
import { useAuth } from '@lib/auth/auth.context'

const PlayerProfileScreen = ({ route }: any) => {
  const { contentsLayoutProps } = route.params
  const { user } = useAuth()

  return (
    <ScreenLayout>
      <ScrollViewLayout fullHeight>
        <VStackLayout
          p={contentsLayoutProps.padding}
          space={contentsLayoutProps.mainSpacing}
          flexGrow={1}
        >
          <Center pt={4}>
            <Text size={'2xl'} bold>
              {t('common.text.player')}
            </Text>
          </Center>
          <VStackLayout id={'playerInfoCard'} space={'md'}>
            <HStackLayout id={'avatarSection'} flex={1}>
              <VStackLayout
                id={'level'}
                flex={1}
                justifyContent={'center'}
                space={'sm'}
              >
                <PlayerInfoChip testID={'momentum'} w={64} alignSelf={'center'}>
                  <ArrowBigUp stroke={'white'} fill={'white'} size={32} />
                </PlayerInfoChip>
                <PlayerInfoChip testID={'level'}>
                  <HStackLayout space={'sm'} justifyContent={'top'}>
                    <Text lineHeight={20}>{'Nivel'}</Text>
                    <Text size={'2xl'} bold lineHeight={25}>
                      {'99'}
                    </Text>
                  </HStackLayout>
                </PlayerInfoChip>
              </VStackLayout>
              <VStackLayout id={'avatar'} flex={1} alignItems={'center'}>
                <Avatar size={'xl'}></Avatar>
              </VStackLayout>
              <VStackLayout
                id={'dorsalSection'}
                justifyContent={'center'}
                flex={1}
              >
                <PlayerInfoChip>
                  <Text>{'0 Medallas'}</Text>
                </PlayerInfoChip>
              </VStackLayout>
            </HStackLayout>
            <VStackLayout id={'nameAndNumber'} flex={1} space={'md'}>
              <Text
                testID={'playerNickName'}
                size={'3xl'}
                bold
                alignSelf={'center'}
              >
                {user.playerData.playerNickname}
              </Text>
              <HStackLayout id={'number'} flex={1} space={'3xl'}>
                <PlayerInfoChip testID={'mainPosition'} flex={1}>
                  <Text>
                    {t(
                      `onboardingScreen.positions.${user.playerData.mainPosition}`
                    ).toUpperCase()}
                  </Text>
                </PlayerInfoChip>
                <Text testID={'playerNumber'} lineHeight={48} size={'5xl'} bold>
                  {12}
                </Text>
                <PlayerInfoChip testID={'profile'} flex={1}>
                  <Text>{'PRO'}</Text>
                </PlayerInfoChip>
              </HStackLayout>
            </VStackLayout>
          </VStackLayout>
        </VStackLayout>
      </ScrollViewLayout>
    </ScreenLayout>
  )
}

export default PlayerProfileScreen
