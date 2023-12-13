import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from '../feature/auth/register/welcome.screen'

const MainStack = createNativeStackNavigator()

function MainNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name={'Welcome'} component={WelcomeScreen} />
    </MainStack.Navigator>
  )
}

export default MainNavigator
