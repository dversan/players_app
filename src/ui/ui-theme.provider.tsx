import { config } from '@gluestack-ui/config'

export const dummyColors = {
  backgrounds: {
    base: '#fffffe',
    dark: '#eff0f3'
  },
  text: {
    base: '#0d0d0d'
  },
  action: {
    base: '#d9376e'
  },
  button: {
    base: '#ff8e3c'
  }
}

export const customColors = {
  primary200: '#B5CC95',
  primary300: '#91B25F',
  primary400: '#86A94B',
  primary500: '#749240',
  primary600: '#405321',
  primary700: '#2d3a17',
  primary800: '#202a11',

  backgroundLight400: '#f5f5f5',
  backgroundLight500: '#F8F8F8',
  backgroundLight200: '#ffffff',

  backgroundDark400: '#A3A3A3',
  backgroundDark500: '#302E2A',
  backgroundDark600: '#252322'
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
