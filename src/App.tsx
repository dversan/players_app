import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigator/main.navigator'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config' // Optional if you want to use default theme

function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </GluestackUIProvider>
  )
}

export default App
