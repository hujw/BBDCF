module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'plugin:prettier/recommended'],
  plugins: [],
  // add your custom rules here
  globals: {
    cy: true,
    Cypress: true
  },
  rules: {
    'no-console': 'off',
    // indent: [2, 2, { SwitchCase: 1 }], // 縮排風格,縮排兩格
    indent: 'off', // 縮排風格,縮排兩格
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'vue/multi-word-component-names': 'off', // 強制Vue元件名稱必須是多個單字
    'comma-dangle': 'off', // 控制最後一個元素後是否允許有尾隨逗號 'off' 代表禁用尾隨逗號的檢查
    'vue/max-attributes-per-line': 'off',
    'no-unused-vars': 'warn', // 未使用的變數顯示黃色警告
    'arrow-parens': ['error', 'always']
  }
};
