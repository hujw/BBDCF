/*
  需要安裝的套件
  "vue-eslint-parser": "7.11.0"
  "eslint": "^6.7.2",
  "eslint-config-prettier": "6.15.0",
  "eslint-plugin-prettier": "3.4.1",
  "eslint-plugin-vue": "^6.2.2", (7.0.0以上版本支持Vue3 ； 6.x以下版本主要用於Vue2)
  "@vue/cli-plugin-eslint": "^4.5.11",
  "@vue/eslint-config-prettier": "6.0.0",
  "babel-eslint": "^10.1.0",
  "prettier": "2.8.8",
*/

module.exports = {
  root: true,
  env: {
    browser: true,
    amd: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  // extends: ['@indielayer/eslint-config-vue'],
  extends: ['eslint:recommended', 'plugin:vue/recommended', '@vue/eslint-config-prettier'],
  rules: {
    'vue/multi-word-component-names': 'off', // 強制Vue元件名稱必須是多個單字
    'comma-dangle': 'off', // 控制最後一個元素後是否允許有尾隨逗號 'off' 代表禁用尾隨逗號的檢查
    'vue/max-attributes-per-line': 'off',
    // 'vue/singleline-html-element-content-newline': 'off',
    'no-unused-vars': 'warn', // 未使用的變數顯示黃色警告
    'no-await-in-loop': 'off',
    // indent: [2, 2, { SwitchCase: 1 }], //縮進,縮兩格
    indent: 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'arrow-parens': ['error', 'always']
  }
};
