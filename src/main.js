// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import router from './router'


//导入ElementUI
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import axios from 'axios';
import qs from "qs"

import ImageUpload from './components/product/Image'
import Document from './components/product/Document'
import Principal from './components/product/Principal'
import Listting from './components/product/Listting'
import Supplier from './components/product/Supplier'
import CodedInfo from './components/product/CodedInfo'
import SearchBar from './components/product/SearchBar'
import ProductForm from './components/product/ProductForm'

import store from './store'

import Tabs from './components/product/Tabs'
import uploadFile from './components/uploadFile'

import $ from 'jquery'
Vue.prototype.$ = $;
//解决跨域
Vue.prototype.HOST = '/api'

Vue.prototype.axios = axios;
Vue.prototype.qs = qs;

Vue.config.productionTip = false
//vue 加入ElementUI
Vue.use(ElementUI);
//导入自定义组件
Vue.use(ImageUpload);
Vue.use(Document);
Vue.use(Principal);
Vue.use(Listting);
Vue.use(Supplier);
Vue.use(CodedInfo);
Vue.use(SearchBar);
Vue.use(ProductForm);
Vue.use(Tabs);
Vue.use(uploadFile);


//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/*axios.interceptors.request.use(function(config) {

  if (config.method == "post") {
    config.data = qs.stringify(config.data)
  }

  return config;
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});*/


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})






