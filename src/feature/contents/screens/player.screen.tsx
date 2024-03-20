import ScreenLayout from '@ui/layout/screen.layout'
import ScrollViewLayout from '@ui/layout/scrollview.layout'
import VStackLayout from '@ui/layout/vstack.layout'
import Text from '@ui/components/text'
import { Center } from '@gluestack-ui/themed'
import { t } from 'i18next'

const PlayerProfileScreen = ({ route }: any) => {
  const { contentsLayoutProps } = route.params

  return (
    <ScreenLayout>
      <ScrollViewLayout fullHeight>
        <VStackLayout
          p={contentsLayoutProps.padding}
          space={contentsLayoutProps.mainSpacing}
          style={{ flexGrow: 1 }}
        >
          <Center pt={4}>
            <Text size={'2xl'} bold>
              {t('common.text.player')}
            </Text>
          </Center>
        </VStackLayout>
      </ScrollViewLayout>
    </ScreenLayout>
  )
}

export default PlayerProfileScreen
