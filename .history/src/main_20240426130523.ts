// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(router)

// app.mount('#app')


import './assets/main.css'
import { h, createApp } from 'vue'
import { vueBridge } from '@garfish/bridge-vue-v3'
import App from './App.vue'
import router, { newRouter } from './router'
import { createPinia } from 'pinia'

if (!window.__GARFISH__) {
  // 非微前端环境直接运行
  const app = createApp(App)
  app.config.devtools = false
  app.use(createPinia())
  app.use(router)
  app.mount('#app2')
}

export const provider = vueBridge({
  rootComponent: App,
  appOptions: ({ basename, dom, appName, props }) => {
    console.log(basename, dom, appName, props)
    return {
      el: '#app2',
      render: () => h(App)
    }
  },
  handleInstance: (vueInstance, { basename, dom, appName, props, appInfo }) => {
    console.log(basename, dom, appName, props, appInfo)
    vueInstance.use(newRouter(basename))
    // vueInstance.provide()
  }
})

// export const provider = vueBridge({
//   rootComponent: App,
//   // 可选，注册 vue-router或状态管理对象
//   appOptions: ({ basename, dom, appName, props }) => {
//     console.log('props: ', props)
//     console.log('appName: ', appName)
//     console.log('basename: ', basename)
//     const app = createApp(App)
//     app.use(newRouter(basename))
//     return app
//   }
// })
