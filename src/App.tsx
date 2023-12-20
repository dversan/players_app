import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigator/main.navigator'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'

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
