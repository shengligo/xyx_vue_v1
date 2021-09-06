import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
// axios.defaults.baseURL = "http://10.1.2.85:8091/"; // http://10.1.2.85:8091/essay
axios.defaults.headers.common["Content-Type"] ="application/json;charset=UTF-8";
axios.defaults.withCredentials = true // 表示跨域请求时是否需要使用凭证
Vue.prototype.$ajax = axios;
import ElementUI from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


