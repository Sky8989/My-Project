import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//创建一个store仓库

export default new Vuex.Store({
    state:{
      product:{}
    }
    ,mutations:{
      setProduct(state,data){
        // console.log("---setProduct")
        state.product = data
      }
  }
})


