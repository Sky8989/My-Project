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
        <el-col :span="1"><el-button>查找</el-button></el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
      data(){
          return{
            searchfield:'',
            fieldValue:'',
            BU:'',
            model:'',
            productCategory:"",



          }
      },methods:{

      }
    }
</script>

<style scoped>

</style>
