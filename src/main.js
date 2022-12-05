import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import http from '@/assets/js/http.js'
import VueParticles from 'vue-particles'
import api from '../src/api/api.js'
import md5 from "js-md5"

Vue.prototype.api = api;
Vue.prototype.$md5=md5
window.$ = $;
Vue.config.productionTip = false
Vue.use(VueParticles)
Vue.use(ElementUI)
Vue.prototype.$axios = axios;
Vue.prototype.$http = http;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
