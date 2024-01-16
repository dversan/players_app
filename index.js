/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
// import * as RNLocalize from 'react-native-localize'
import i18n from 'i18next'
import './src/lib/translations/i18n.config'

AppRegistry.registerComponent(appName, () => {
    // const locale = RNLocalize.getLocales()[0].languageCode
  i18n.changeLanguage('es')
  return App
})
