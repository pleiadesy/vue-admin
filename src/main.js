import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 配置elementIcon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 异步启动msw
async function prepareApp() {
  if(import.meta.env.DEV) { // 只在开发环境下运行
    const { worker } = await import('./mocks/browser.js')
    return worker.start({
      onUnhandledRequest: 'bypass' // 不拦截未定义的请求
    })
  }
  return Promise.resolve()
}
prepareApp().then(()=> {
  app.use(createPinia())
  app.use(router)
  app.mount('#app')
})




