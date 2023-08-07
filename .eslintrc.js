module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        curly: 'off',
        'object-curly-newline': 'off',
        'react-hooks/exhaustive-deps': 'off',
        // note: must disable the base rule as it can report incorrect errors
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn', // or "error"
          {
            varsIgnorePattern: '^_',
          },
          ,
        ],
      },
    },
  ],
};
