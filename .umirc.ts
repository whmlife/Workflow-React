import { defineConfig } from 'umi'
import theme from './theme'

export default defineConfig({
  hash: true,
  runtimePublicPath: true,
  title: false,
  nodeModulesTransform: {
    type: 'none'
  },
  targets: { ie: 11 },
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'zh-CN',
    antd: true
  },
  dynamicImport: {},
  theme,
  fastRefresh: {},
  mock: {
    exclude: ['mock/**/_*.[jt]s']
  },
})
