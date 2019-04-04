<template>
  <div id="app">
   <!-- <img src="./assets/logo.png">-->
    <router-view/>

  </div>
</template>


<script>
export default {
  name: 'App',
    data(){
    return{
      product:{
        brandId: 123,
        businessUnitId: 0,
        cTime: null,
        productCategoryId: 0,
        productCertification: "",
        productDescriptionChs: "",
        productDescriptionEn: "",
        productGrossweight: 0.0,
        productHeight: 0.0,
        businessUnit:'',
        businessUnitId:'',
        productId: 0,
        productLong: 0.0,
        productMaterial: "",
        productModelNumber: "",
        productNetweight: 0.0,
        productPackageContains: "",
        productVolume:0,
        productWidth: 0.0,
        status: 0,
        userId: 0,
        productU8Code: 0,
        productOrderDefect: 0.0,
      },
    }
    }
 /* data(){
    return{
      isRouterAlive:true
    }
  },
  provide(){
    return{
      reload: this.reload
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    },

  },
  inject: ['reload'],*/


}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
