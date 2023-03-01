import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import toast from '../src/components/qx-ui/qx-toast/index.js'

const app = createApp(App)
app.provide('$axios', axios)//全局引入axios
app.provide('$toast', toast)//全局引入axios
// app.config.globalProperties.$toast = Toast;//引入toast
// app.config.globalProperties.$toast = toast;
app.mount('#app')
