import './assets/main.css'  

import { createApp, render } from 'vue'
import App from './App.vue'
// import router from './router/index.js'
import router from './router'
// import store from './store/index'

// createApp(App).mount('#app')

const app = createApp(App)
 app.use(router)
 app.mount('#app')

//  new Vue ({
//     el: '#app',
//     router,
//     render: h => h(App)
//  }).mount('#app')
