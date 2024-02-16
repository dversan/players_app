/** @type {import('ts-jest').JestConfigWithTsJest} */

const tsconfig = require('./tsconfig.json')
const rawAlias = tsconfig.compilerOptions.paths
const alias = {}

for (const x in rawAlias) {
  alias[x.replace('/*', '')] = rawAlias[x].map(p => p.replace('/*', ''))
}

module.exports = function (api) {
  api.cache(true)

  return {
    presets: [
      'module:metro-react-native-babel-preset',
      '@babel/preset-typescript'
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.ts',
            '.tsx',
            '.json',
            '.svg'
          ],
          alias
        }
      ]
    ]
  }
}
