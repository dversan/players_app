/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const defaultSourceExts =
  require('metro-config/src/defaults/defaults').sourceExts

const defaultConfig = getDefaultConfig(__dirname)

const {
  resolver: { sourceExts, assetExts }
} = getDefaultConfig(__dirname)

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true
      }
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer')
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [
      ...(process.env.RN_SRC_EXT
        ? process.env.RN_SRC_EXT.split(',').concat(defaultSourceExts)
        : defaultSourceExts),
      ...sourceExts,
      'svg'
    ]
  }
}

module.exports = mergeConfig(defaultConfig, config)
