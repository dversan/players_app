import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnboardingFirstStepScreen from './screens/onboarding-firstStep.screen'

const AuthStack = createNativeStackNavigator()

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
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name={'OnboardingFirstStep'}
        component={OnboardingFirstStepScreen}
        initialParams={{ onboardingLayoutProps }}
      />
    </AuthStack.Navigator>
  )
}
