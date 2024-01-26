import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnboardingFirstStepScreen from './screens/onboarding-firstStep.screen'
import OnboardingSecondStepScreen from './screens/onboarding-secondStep.screen'

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
        name={'OnboardingFirstStepScreen'}
        component={OnboardingFirstStepScreen}
        initialParams={{ onboardingLayoutProps }}
      />
      <AuthStack.Screen
        name={'OnboardingSecondStepScreen'}
        component={OnboardingSecondStepScreen}
        initialParams={{ onboardingLayoutProps }}
      />
    </AuthStack.Navigator>
  )
}
