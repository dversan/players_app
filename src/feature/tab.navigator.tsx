import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../feature/contents/screens/home-screen'

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
        name={'HomeScreen'}
        component={HomeScreen}
        initialParams={{ onboardingLayoutProps }}
      />
    </Onboarding.Navigator>
  )
}
