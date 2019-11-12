import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/indes.less'

Vue.config.productionTip = false
Vue.use(elementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
