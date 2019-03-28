import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ImageUpload from '@/components/product/Image'
import Document from '@/components/product/Document'
import Principal from '@/components/product/Principal'
import Listting from '@/components/product/Listting'
import Supplier from '@/components/product/Supplier'
import CodedInfo from '@/components/product/CodedInfo'
import SearchBar from '@/components/product/SearchBar'
import ProductForm from '@/components/product/ProductForm'
import Tabs from '@/components/product/Tabs'


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
    },
    {
      path:'/supplier',
      name:'Supplier',
      component:Supplier
    },
    {
      path:'/codedInfo',
      name:'CodedInfo',
      component:CodedInfo
    },
    {
      path:'/searchBar',
      name:'SearchBar',
      component:SearchBar
    },
    {
      path:'/productForm',
      name:'ProductForm',
      component:ProductForm
    },
    {
      path:'/tabs',
      name:'Tabs',
      component:Tabs
    }

  ]



})
