// https://testing-library.com/docs/react-testing-library/setup#custom-render
import React, { ReactElement } from 'react'
import { render } from '@testing-library/react-native'
import { NativeBaseProvider } from 'native-base'

const NativeBaseProviderWrapper = ({ children }: any) => (
  <NativeBaseProvider
    initialWindowMetrics={{
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 }
    }}
    config={{ suppressColorAccessibilityWarning: true }}>
    {children}
  </NativeBaseProvider>
)

const customRender = (ui: ReactElement, options?: Omit<any, 'wrapper'>) =>
  render(ui, { wrapper: NativeBaseProviderWrapper, ...options })

export * from '@testing-library/react-native'
export { customRender as render }
