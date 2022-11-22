module.exports = {
  root: true, // 设置依赖查找目录为本项目根节点，不再查找父级目录
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'try-statement'
  ],
  rules: {
    'try-statement/add': ['warn', false]
  }
}
