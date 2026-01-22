import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    rules: {
      // 关闭组件名称必须为多单词的检查
      'vue/multi-word-component-names': 'off',
      // 关闭 camelcase 规则
      'camelcase': 'off',
      // 针对 Vue 组件定义的命名风格
      'vue/component-definition-name-casing': 'off',
    },
  },
])
