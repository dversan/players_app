import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from './screens/profile.screen'

const Profile = createNativeStackNavigator()

interface OnboardingLayoutProps {
  padding: number
  mainSpacing: string
  logoH: number
  logoW: number
}

export default function ProfileNavigator() {
  const onboardingLayoutProps: OnboardingLayoutProps = {
    padding: 16,
    mainSpacing: '4xl',
    logoH: 55,
    logoW: 55
  }

  return (
    <Profile.Navigator screenOptions={{ headerShown: false }}>
      <Profile.Screen
        name={'ProfileScreen'}
        component={ProfileScreen}
        initialParams={{ onboardingLayoutProps }}
      />
    </Profile.Navigator>
  )
}
