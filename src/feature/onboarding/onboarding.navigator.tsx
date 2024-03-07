import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnboardingPlayerScreen from './screens/onboarding-player.screen'
import OnboardingClubScreen from './screens/onboarding-club.screen'
import OnboardingPlayerOptionsScreen from './screens/onboarding-player-options.screen'

const Onboarding = createNativeStackNavigator()

interface OnboardingLayoutProps {
  padding: number
  mainSpacing: string
  logoH: number
  logoW: number
}

export default function OnboardingNavigator() {
  const onboardingLayoutProps: OnboardingLayoutProps = {
    padding: 16,
    mainSpacing: 'xl',
    logoH: 55,
    logoW: 55
  }

  return (
    <Onboarding.Navigator screenOptions={{ headerShown: false }}>
      <Onboarding.Screen
        name={'OnboardingPlayerScreen'}
        component={OnboardingPlayerScreen}
        initialParams={{ onboardingLayoutProps }}
      />
      <Onboarding.Screen
        name={'OnboardingPlayerOptionsScreen'}
        component={OnboardingPlayerOptionsScreen}
        initialParams={{ onboardingLayoutProps }}
      />
      <Onboarding.Screen
        name={'OnboardingClubScreen'}
        component={OnboardingClubScreen}
        initialParams={{ onboardingLayoutProps }}
      />
    </Onboarding.Navigator>
  )
}
