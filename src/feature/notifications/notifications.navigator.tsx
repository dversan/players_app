import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NotificationsScreen from './screens/notifications.screen'

const Contents = createNativeStackNavigator()

interface OnboardingLayoutProps {
  padding: number
  mainSpacing: string
  logoH: number
  logoW: number
}

export default function NotificationsNavigator() {
  const onboardingLayoutProps: OnboardingLayoutProps = {
    padding: 16,
    mainSpacing: '4xl',
    logoH: 55,
    logoW: 55
  }

  return (
    <Contents.Navigator screenOptions={{ headerShown: false }}>
      <Contents.Screen
        name={'NotificationsScreen'}
        component={NotificationsScreen}
        initialParams={{ onboardingLayoutProps }}
      />
    </Contents.Navigator>
  )
}
