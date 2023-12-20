import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './login/login.screen'
import RegisterScreen from './register/register.screen'
import WelcomeScreen from './register/welcome.screen'
// import PasswordScreen from './login/password.screen'

const AuthStack = createNativeStackNavigator()

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={'WelcomeScreen'} component={WelcomeScreen} />
      <AuthStack.Screen name={'RegisterScreen'} component={RegisterScreen} />
      <AuthStack.Screen name={'LoginScreen'} component={LoginScreen} />
      {/*<AuthStack.Screen name={'PasswordScreen'} component={PasswordScreen} />*/}
    </AuthStack.Navigator>
  )
}
