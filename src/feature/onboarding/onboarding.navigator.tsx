import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnboardingPlayerScreen from './screens/onboarding-player.screen'
import OnboardingClubScreen from './screens/onboarding-club.screen'

const Onboarding = createNativeStackNavigator()

interface OnboardingLayoutProps {
  padding: number
  paddingTop: number
  mainSpacing: string
  logoH: number
  logoW: number
}

export default function OnboardingNavigator() {
  const onboardingLayoutProps: OnboardingLayoutProps = {
    padding: 24,
    paddingTop: 8,
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
        name={'OnboardingClubScreen'}
        component={OnboardingClubScreen}
        initialParams={{ onboardingLayoutProps }}
      />
    </Onboarding.Navigator>
  )
}
