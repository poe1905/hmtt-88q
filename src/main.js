import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入nprogress  路由加载条插件
import '../node_modules/nprogress/nprogress.css'
import './assets/css/indes.less'
import axios from 'axios'
import wysiwyg from 'vue-wysiwyg' // 可选配置信息
// import '~vue-wysiwyg/dist/vueWysiwyg.css'
import '../node_modules/vue-wysiwyg/dist/vueWysiwyg.css'
Vue.use(wysiwyg, { })
// 给axios 请求添加一个defaults 固定的基础地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 将axios 挂载到vue 的原型对象上面, 这样可以整个项目中使用这个 $axios 请求, 就不需要在 每一个组件引入axios
Vue.prototype.$axios = axios

//  axios  请求拦截器 所有的请求都会通过这里发送出去, 在这里检验,在这里整理
axios.interceptors.request.use(config => {
  console.log('请求拦截器', config)
  const tokens = window.localStorage.getItem('token')
  //  这里是以对象的方式吧需要添加的属性和 方法,通过点 的方法吧属性添加到发送请求对象上去
  if (tokens) { config.headers.Authorization = `Bearer ${tokens}` }

  //  把操作完的 config 返回出去
  return config
}, (arr) => {
  // 如果报错就把错误信息返回出去
  return Promise.reject(arr)
})

Vue.config.productionTip = false
Vue.use(elementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
