// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import router from './router'

//导入ElementUI
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

//解决跨域
Vue.prototype.HOST = '/api'

Vue.config.productionTip = false
//vue 加入ElementUI
Vue.use(ElementUI);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})





/*


new Vue({
  el: '#app',
  render: h => h(App)
});
*/
