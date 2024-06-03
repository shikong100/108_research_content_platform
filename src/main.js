import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus' //为vue3项目特别更新的版本
import 'element-plus/dist/index.css'
// import axios from 'axios' //网络
import 'element-plus/dist/index.css';

import router from './router/index'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
