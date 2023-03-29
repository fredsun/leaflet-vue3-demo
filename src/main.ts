import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import toast from './components/qx-ui/qx-toast/indexxx'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.provide('$axios', axios)//全局引入axios
app.provide('$toast', toast)//全局引入axios
// app.config.globalProperties.$toast = toast;
// app.config.globalProperties.$toast = Toast;//引入toast
// app.config.globalProperties.$toast = toast;
app.use(ElementPlus);
app.use(pinia);
app.mount('#app');
