import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import VueCookies  from 'vue-cookies'

createApp(App).use(router).use(createPinia()).use(VueCookies).mount('#app')
import 'bootstrap/dist/js/bootstrap.js'