module.exports = {
  "settings": {
    "react": {
      "version": "16.0",
    }     
  },
  env: {
    es2021: true,
  },
  extends: [
      "plugin:react/recommended",
      'airbnb-base',
      'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
  ],
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'], 'allow': "as-needed" }],
    'import/no-named-as-default': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  },
};
