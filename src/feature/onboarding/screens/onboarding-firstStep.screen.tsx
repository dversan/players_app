import React from 'react'
import ScreenLayout from '../../../ui/layout/screen.layout'
import Text from '../../../ui/components/text'
import ScrollViewLayout from '../../../ui/layout/scrollview.layout'
import { Center } from '@gluestack-ui/themed'

export default function OnboardingFirstStepScreen({ route, navigation }: any) {
  const { onboardingLayoutProps } = route.params

  return (
    <ScreenLayout>
      <ScrollViewLayout fullHeight>
        <Center
          p={onboardingLayoutProps.padding}
          pt={onboardingLayoutProps.paddingTop}
          space={onboardingLayoutProps.mainSpacing}
        >
          <Text>{'ONBOARDING'}</Text>
        </Center>
      </ScrollViewLayout>
    </ScreenLayout>
  )
}
