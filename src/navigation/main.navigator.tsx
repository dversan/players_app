import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthNavigator from '../feature/auth/auth.navigator'
import { useAuth } from '@lib/auth/auth.context'
import OnboardingNavigator from '../feature/onboarding/onboarding.navigator'
import SplashScreen from 'react-native-splash-screen'
import TabNavigator from '../feature/tab.navigator'

const MainStack = createNativeStackNavigator()

function MainNavigator() {
  const { user, initializing } = useAuth()

  if (initializing) {
    return null
  }

  SplashScreen.hide()

  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      {user?.playerData?.playerNickname ? (
        <>
          <MainStack.Screen name={'Main'} component={TabNavigator} />
        </>
      ) : (
        <>
          {user?.email ? (
            <MainStack.Screen
              name={'OnboardindNavigator'}
              component={OnboardingNavigator}
            />
          ) : (
            <MainStack.Screen
              name={'AuthNavigator'}
              component={AuthNavigator}
            />
          )}
        </>
      )}
    </MainStack.Navigator>
  )
}

export default MainNavigator
