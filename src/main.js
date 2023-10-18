import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import mitt from 'mitt'
import config from '../formkit.config'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const emitter = mitt()

app.use(router)
app.use(plugin, defaultConfig(config))
// Accede al objeto $router proporcionado 
app.config.globalProperties.$router = router
app.config.globalProperties.emitter = emitter
app.mount('#app')
