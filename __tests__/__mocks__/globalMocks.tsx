import { jest } from '@jest/globals'

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')

jest.mock('@react-native-firebase/app', () => ({}))
jest.mock('@react-native-firebase/auth', () => ({}))
jest.mock('@react-native-firebase/firestore', () => ({}))
// jest.mock('@react-native-firebase/crashlytics', () => ({}))
// jest.mock('@react-native-firebase/functions', () => ({}))
// jest.mock('@react-native-firebase/messaging', () => {
//   return () => {
//     return {
//       getInitialNotification: jest.fn(() => Promise.resolve()),
//       onMessage: jest.fn(() => Promise.resolve()),
//       onNotificationOpenedApp: jest.fn(() => Promise.resolve())
//     }
//   }
// })
// jest.mock('@react-native-firebase/analytics', () => {
//   return () => {
//     return {
//       logEvent: jest.fn(() => Promise.resolve())
//     }
//   }
// })

const mockedDispatch = jest.fn()
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    addListener: jest.fn(),
    goBack: jest.fn(),
    dispatch: mockedDispatch
  })
}))

jest.mock('i18next', () => ({
  ...jest.requireActual('i18next'),
  t: jest.fn(key => key)
}))

jest.mock('react-native-splash-screen', () => ({
  show: jest.fn(),
  hide: jest.fn()
}))

jest.mock('../../src/lib/auth/auth.context', () => ({
  ...jest.requireActual('../../src/lib/auth/auth.context'),
  __esModule: true,
  default: jest.fn(() => null),
  useAuth: jest.fn(() => ({
    // Mock return values of useAuth
    user: { email: '', playerData: { playerNickname: '' } },
    initializing: false
  }))
}))

jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('React')
  const RealComponent = jest.requireActual(
    '@react-native-community/datetimepicker'
  )

  class Picker extends React.Component<any, any> {
    static propTypes: any
    render() {
      return React.createElement('Picker', this.props, this.props.children)
    }
  }

  Picker.propTypes = RealComponent.propTypes
  return Picker
})

jest.mock('../../src/lib/api/users.api', () => ({
  savePlayerData: jest.fn(() => Promise.resolve({ data: {} }))
}))

// jest.mock('@react-native-firebase/storage', () => ({}))
// jest.mock('react-native-share', () => ({}))
// jest.mock('react-native-compass-heading', () => ({}))
// jest.mock('react-native-view-shot', () => ({}))

// jest.mock('react-native-device-info', () => {
//   return {
//     isLocationEnabled: jest.fn(() => Promise.resolve(true))
//   }
// })

// jest.mock('@react-native-async-storage/async-storage', () =>
//   require('@react-native-async-storage/async-storage/jest/async-storage-mock')
// )

export default {}
