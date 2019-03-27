import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ImageUpload from '@/components/Image'
import Document from '@/components/Document'
import Principal from '@/components/Principal'
import Listting from '@/components/Listting'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/imageUpload',
      name:'ImageUpload',
      component:ImageUpload
    },
    {
      path:'/document',
      name:'Document',
      component:Document
    },
    {
      path:'/principal',
      name:'Principal',
      component:Principal
    },
    {
      path:'/listting',
      name:'Listting',
      component:Listting
    }

  ]



})
