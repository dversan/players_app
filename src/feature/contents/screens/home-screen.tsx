import React from 'react'
import ScreenLayout from '../../../ui/layout/screen.layout'
import Text from '../../../ui/components/text'
import ScrollViewLayout from '../../../ui/layout/scrollview.layout'
import VStackLayout from '../../../ui/layout/vstack.layout'

export default function HomeScreen({ route }: any) {
  const { onboardingLayoutProps } = route.params

  return (
    <ScreenLayout>
      <ScrollViewLayout fullHeight>
        <VStackLayout
          p={onboardingLayoutProps.padding}
          pt={onboardingLayoutProps.paddingTop}
          space={onboardingLayoutProps.mainSpacing}
        >
            <Text>{'HOME SCREEN'}</Text>
        </VStackLayout>
      </ScrollViewLayout>
    </ScreenLayout>
  )
}
