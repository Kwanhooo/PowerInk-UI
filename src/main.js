import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

import Toast, {POSITION} from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

const demoDeviceSN = 'b827eb1541ca'
sessionStorage.setItem('sn', demoDeviceSN)

app.use(createPinia())
app.use(router)
app.use(Toast, {
    position: POSITION.BOTTOM_CENTER,
    maxToasts: 3,
});
app.mount('#app')
