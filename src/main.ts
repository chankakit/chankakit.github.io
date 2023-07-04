import { createApp } from 'vue'
import '@/styles/index.css'
import '@/styles/style.css'
import '@/styles/my-animate.css'
// import 'animate.css'
import App from './App.vue'
import router from './router'



createApp(App)
.use(router)
.mount('#app')
