import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/home.screen'

const Contents = createNativeStackNavigator()

interface ContentsLayoutProps {
  padding: number
  mainSpacing: string
  logoH: number
  logoW: number
}

const ContentsNavigator = () => {
  const contentsLayoutProps: ContentsLayoutProps = {
    padding: 16,
    mainSpacing: '4xl',
    logoH: 55,
    logoW: 55
  }

  return (
    <Contents.Navigator screenOptions={{ headerShown: false }}>
      <Contents.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        initialParams={{ contentsLayoutProps }}
      />
    </Contents.Navigator>
  )
}

export default ContentsNavigator
