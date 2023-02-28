import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'

const app = createApp(App)
app.provide('$axios', axios)//全局引入axios
app.mount('#app')
