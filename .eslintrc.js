// TODO: figure out why import/no-unresolved doesn't work on windows...
const isWindows =
  process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE)

module.exports = {
  extends: ['kentcdodds', 'kentcdodds/jest'],
  root: true,
  rules: {
    'no-console': 'off',
    'import/no-cycle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'babel/new-cap': 'off',
    'require-await': 'warn',
    'no-nonoctal-decimal-escape': 'off',
    'import/no-unresolved': isWindows ? 'off' : 'error',
  },
  overrides: [
    {
      files: ['**/__tests__/**'],
      rules: {
        'jest/prefer-todo': 'off',
      },
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: require.resolve('./test/jest.config.final.js'),
          },
        },
      },
    },
  ],
}
