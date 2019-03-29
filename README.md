# my-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# test
# my-project


#自定义组件
  1:创建组件 /src/components 路径下 Image.vue
  
  2:main.js中注册
    
    import ImageUpload from './components/product/Image'
    //导入自定义组件
    Vue.use(ImageUpload);
    
   3:引用组件 HelloWorld.vue
      
       import ImageUpload from './Image'
        export default {
               name: "HelloWorld",
             //注册组件
             components: { ImageUpload}
             data(){
                return{
                
             }
         }
         
         使用:
          <!--引用 ImageUpload 组件 引用的名称小写多个字母用中划线分割(-)-->
             <ImageUpload ref="image-upload"></ImageUpload>
   
      
    
    
