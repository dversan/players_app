import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthNavigator from '../feature/auth/auth.navigator'

const MainStack = createNativeStackNavigator()

function MainNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name={'AuthNavigator'} component={AuthNavigator} />
    </MainStack.Navigator>
  )
}

export default MainNavigator
