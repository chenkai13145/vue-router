import Vue from 'vue'
import App from './App.vue'
// import Antd from 'ant-design-vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './antdesginvue'
Vue.config.productionTip = true

new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app')
