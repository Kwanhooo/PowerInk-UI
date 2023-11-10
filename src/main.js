import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

sessionStorage.setItem('sn','b827eb1541ca')

app.use(createPinia())
app.use(router)

app.mount('#app')
