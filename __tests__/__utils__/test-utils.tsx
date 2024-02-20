// https://testing-library.com/docs/react-testing-library/setup#custom-render
import React, { ReactElement } from 'react'
import { render as rtlRender } from '@testing-library/react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GluestackUIStyledProvider } from '@gluestack-ui/themed'
import gluestackCustomUIConfig from '../../src/ui/ui-theme.provider'

const GluestackUIProviderWrapper = ({ children }: any) => (
  <SafeAreaProvider
    initialMetrics={{
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 }
    }}
  >
    <GluestackUIStyledProvider config={gluestackCustomUIConfig}>
      {children}
    </GluestackUIStyledProvider>
  </SafeAreaProvider>
)

const customRender = (ui: ReactElement, options?: Omit<any, 'wrapper'>) =>
  rtlRender(ui, { wrapper: GluestackUIProviderWrapper, ...options })

export * from '@testing-library/react-native'
export { customRender as render }
