import { config } from '@gluestack-ui/config'

export const customColors = {
  primary200: '#B5CC95',
  primary300: '#91B25F',
  primary400: '#86A94B',
  primary500: '#749240',
  primary600: '#405321',
  primary700: '#2d3a17',
  primary800: '#202a11',

  backgroundLight200: '#ffffff',
  backgroundLight400: '#f5f5f5',
  backgroundLight500: '#F8F8F8',

  backgroundDark300: '#595855',
  backgroundDark400: '#45433f',
  backgroundDark500: '#302E2A',
  backgroundDark600: '#252322',
  backgroundDark700: '#262522',
  backgroundDark800: '#1e1e1b'
}

const gluestackCustomUIConfig = {
  ...config,
  tokens: {
    ...config.tokens,
    colors: {
      ...config.tokens.colors,
      ...customColors
    }
  }
}

export default gluestackCustomUIConfig
