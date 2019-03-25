import Vue from 'vue'
import Router from 'vue-router'
//import Elements_table from '@/components/Elements_table'
import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
