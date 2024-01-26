import React from 'react'
import ScreenLayout from '../../../ui/layout/screen.layout'
import Text from '../../../ui/components/text'
import ScrollViewLayout from '../../../ui/layout/scrollview.layout'
import VStackLayout from '../../../ui/layout/vstack.layout'
import Button from '../../../ui/components/button'

export default function OnboardingFirstStepScreen({ route, navigation }: any) {
  const { onboardingLayoutProps } = route.params

  return (
    <ScreenLayout>
      <ScrollViewLayout fullHeight>
        <VStackLayout
          p={onboardingLayoutProps.padding}
          pt={onboardingLayoutProps.paddingTop}
          space={onboardingLayoutProps.mainSpacing}
        >
          <Text>{'ONBOARDING STEP 1'}</Text>
          <Button
            onPress={() => navigation.navigate('OnboardingSecondStepScreen')}
          >
            {'GO TO STEP2'}
          </Button>
        </VStackLayout>
      </ScrollViewLayout>
    </ScreenLayout>
  )
}
