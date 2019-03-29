<template>
    <div id="SearchBar">
      <el-row :gutter="10" id="search">
        <el-col :span="3">
          <el-select  placeholder="Model/ASIN/SKU" v-model="searchfield">
            <el-option label="Model" value="model"></el-option>
            <el-option label="ASIN" value="asin"></el-option>
            <el-option label="SKU" value="sku"></el-option>
          </el-select>
        </el-col>
        &nbsp;&nbsp;
        <el-col :span="2"> <el-input value="aaa" v-model="fieldValue"  style="display:inline-block; width: 150px"  /></el-col>
        &nbsp;&nbsp;
        <el-col :span="3"><el-select v-model="BU"  placeholder="BU" > </el-select></el-col>
        &nbsp;
        <el-col :span="3"><el-select v-model="productCategory"  placeholder="系列" > </el-select></el-col>
        &nbsp;
        <el-col :span="3"><el-select v-model="model"  placeholder="Model" > </el-select></el-col>
        &nbsp;
        <el-col :span="1"><el-button @click="searchProduct" >查找</el-button></el-col>
      </el-row>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "SearchBar",
      data(){
          return{
            searchfield:'',
            fieldValue:'',
            BU:'',
            model:'',
            productCategory:"",
            product:{
              brandId: 0,
              businessUnitId: 0,
              cTime: null,
              productCategoryId: 0,
              productCertification: "",
              productDescriptionChs: "",
              productDescriptionEn: "",
              productGrossweight: 0.0,
              productHeight: 0.0,
              productId: 0,
              productLong: 0.0,
              productMaterial: "",
              productModelNumber: "",
              productNetweight: 0.0,
              productPackageContains: "",
              productWidth: 0.0,
              status: 0,
              userId: 0,
            }



          }
      },methods:{
        searchProduct(){



          var searchfield = this.searchfield;
          var fieldValue = this.fieldValue;
          var url = ""

          if(searchfield === "model"){
            console.log(searchfield)
            url = "/findProduct/findProductByModelNumber/";
          }else if(searchfield === 'sku'){
            url = "/findProduct/findProductBySku/";
            console.log(searchfield)
          }else if(searchfield == 'asin'){
            url = "/findProduct/findProductByAsin/";
            console.log(searchfield)
          }

          url += fieldValue
          axios.get(this.HOST+url,{

          })
            .then(result => {
            console.log(result.data)
            console.log(result.data.data)
              this.product = result.data.data
              this.$emit("sendSearchResult", this.product)
          })
            .catch(error =>{
              console.log(error)
            })
        }
      }
    }
</script>

<style scoped>

</style>
