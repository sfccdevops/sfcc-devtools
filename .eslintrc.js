module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  globals: {
    browser: true,
    chrome: true,
    io: true
  },
  env: {
    browser: true
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  rules: {
    'quotes': [2, 'single', { allowTemplateLiterals: true }],
    'arrow-parens': 0,
    'no-prototype-builtins': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
