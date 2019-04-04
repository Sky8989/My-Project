<template>
    <div id="CodedInfo">

      <el-row >
        <el-col :span="4">
          <el-button style="float: left" @click="addCodedInfo = true">新增+</el-button>
        </el-col>
      </el-row>

      <el-dialog title="新增/编辑" :visible.sync="addCodedInfo" style="width: auto; height: auto;">

        <el-form label-width="100px" :model="form" :label-position="LabelPosition">
          <el-row >
            <el-col :span="6">
              <el-form-item label="Model No:">
                <el-input v-model="form.model"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Part No:">
                <el-input v-model="form.partNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="国家:">
                <el-select  placeholder="请选择国家" v-model="form.country">
                  <el-option label="UK" value="UK"></el-option>
                  <el-option label="USA" value="USA"></el-option>
                  <el-option label="JP" value="USA"></el-option>
                  <el-option label="CH" value="USA"></el-option>
                  <el-option label="DE" value="USA"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="账号:">
                <el-select  placeholder="请选择账号" v-model="form.seller">
                  <el-option label="UK1" value="UK1"></el-option>
                  <el-option label="USA2" value="USA2"></el-option>
                  <el-option label="JP3" value="USA3"></el-option>
                  <el-option label="CH4" value="USA4"></el-option>
                  <el-option label="DE5" value="USA5"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="ASIN:">
                <el-select  placeholder="ASIN" v-model="form.asin">
                  <el-option label="xxx" value="xxx"></el-option>
                  <el-option label="aaa" value="aaa"></el-option>

                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="UPC:">
                <el-input v-model="form.UPC"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row >
            <el-col :span="6">
              <el-form-item label="发货方式:">
                <el-select placeholder="发货方式"  v-model="form.transportType">
                  <el-option value="FBA">FBA</el-option>
                  <el-option value="自发货">自发货</el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="SKU/FNSKU:">
                <el-select placeholder="SKU/FNSKU" filterable  v-model="form.skuOrFnsku">
                  <el-option value="111">111</el-option>
                  <el-option value="222">222</el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="addCodedInfo = false">取 消</el-button>
          <el-button type="primary" @click="submitCodedInfo">确 定</el-button>
        </div>

      </el-dialog>

        <!--搜索编码信息-->
      <el-form :model="searchCodedInfo"  >
        <el-form-item style="float: left">
          <el-row :gutter="10">
            <el-col :span="3">
              <el-select placeholder="ASIN"  v-model="searchCodedInfo.asin" >
                <el-option value="1">1</el-option>
                <el-option value="2">2</el-option>
                <el-option value="3">3</el-option>
              </el-select>
            </el-col>

            <el-col :span="3">
              <el-select placeholder="SKU"  v-model="searchCodedInfo.sku" >
                <el-option value="1">1</el-option>
                <el-option value="2">2</el-option>
                <el-option value="3">3</el-option>
              </el-select>
            </el-col>

            <el-col :span="3">
              <el-select placeholder="FNSKU"  v-model="searchCodedInfo.fnsku" >
                <el-option value="1">1</el-option>
                <el-option value="2">2</el-option>
                <el-option value="3">3</el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-select placeholder="UPC" v-model="searchCodedInfo.upc" >
                <el-option value="1">1</el-option>
                <el-option value="2">2</el-option>
                <el-option value="3">3</el-option>
              </el-select>
            </el-col>

            <el-col :span="3">
              <el-button @click="search">搜索</el-button>
            </el-col>
          </el-row>
        </el-form-item>

      </el-form>

      <el-table name="SupplierList" :data="codedInfoList" height="250px" border="border">

<!--        :filter-method="filter_select_model" label="model" :filters="[{text:'1',value:'1'},{text:'2',value:'2'}]"-->
        <el-table-column prop="model" label="model" filter-method="filter_select_model" :filters="[{text:'1',value:'1'},{text:'2',value:'2'}]">
          <!--<template slot="header" slot-scope="scope">
          <el-select placeholder="Model" size="small" v-model="select_model" >
            <el-option value="1">1</el-option>
            <el-option value="2">2</el-option>
            <el-option value="3">3</el-option>
          </el-select>
          </template>-->
        </el-table-column>

        <el-table-column prop="seller" label="账号" :filters="sellerList"  :filter-method="filterSeller">


        </el-table-column>

        <el-table-column prop="partNo" label="Part NO" :filters="partNoList" :filter-method="filterPartNo">
          <!--<template slot="header" slot-scope="scope">
          <el-select placeholder="Part NO" size="small" v-model="select_partNo">
            <el-option value="partNo1">partNo1</el-option>
            <el-option value="partNo2">partNo2</el-option>
            <el-option value="partNo3">partNo3</el-option>
          </el-select>
          </template>-->
        </el-table-column>

        <el-table-column prop="country" label="国家" :filters="countryList" :filter-method="filterCountry">
          <!--<template slot="header" slot-scope="scope">
          <el-select placeholder="国家" size="small" v-model="select_country">
            <el-option value="CH">CH</el-option>
            <el-option value="UK">UK</el-option>
            <el-option value="USA">USA</el-option>
          </el-select>
          </template>-->
        </el-table-column>

        <el-table-column prop="asin" label="ASIN">
          <!--<template slot="header" slot-scope="scope">
          <el-select placeholder="ASIN" size="small" v-model="select_asin">
            <el-option value="asin1">asin1</el-option>
            <el-option value="asin2"> asin2</el-option>
            <el-option value="asin3">asin3</el-option>
          </el-select>
          </template>-->
        </el-table-column>

        <el-table-column prop="sku" label="SKU">
          <!--<template slot="header" slot-scope="scope">
          <el-select placeholder="SKU" size="small" v-model="select_sku">
            <el-option value="sku1">sku1</el-option>
            <el-option value="sku2">sku2</el-option>
            <el-option value="sku3">sku3</el-option>
          </el-select>
          </template>-->
        </el-table-column>

        <el-table-column prop="fnsku" label="FNSKU">
          <!--<template slot="header" slot-scope="scope">
          <el-select placeholder="FNSKU" size="small" v-model="select_fnsku">
            <el-option value="fnsku1">fnsku1</el-option>
            <el-option value="fnsku2">fnsku2</el-option>
            <el-option value="fnsku3">fnsku3</el-option>
          </el-select>
          </template>-->
        </el-table-column>

        <el-table-column prop="UPC" label="UPC">
          <!--<template slot="header" slot-scope="scope">
          <el-select placeholder="UPC" size="small" v-model="select_UPC">
            <el-option value="upc1">upc1</el-option>
            <el-option value="upc2">upc2</el-option>
            <el-option value="upc3">upc3</el-option>
          </el-select>
          </template>-->
        </el-table-column>

        <el-table-column prop="transportType" label="发货方式" :filters="transportTypeList" :filter-method="FilterTransportType">
          <!--<template slot="header" slot-scope="scope">
          <el-select placeholder="发货方式" size="small" v-model="select_transportType">
            <el-option value="FBA">FBA</el-option>
            <el-option value="自发货">自发货</el-option>
          </el-select>
          </template>-->
        </el-table-column>

        <el-table-column prop="recordUser" label="记录人" ></el-table-column>

        <el-table-column prop="edit" label="编辑" ><el-button @click="addCodedInfo = true">编辑</el-button></el-table-column>

      </el-table>


    </div>
</template>

<script>
    export default {
        name: "CodedInfo",
      data(){
          return{
            LabelPosition:'right',
            addCodedInfo:false,
            searchCodedInfo:{asin:'',sku:'',fnsku:'',upc:''},
            codedInfoList:[
              {model:'1',seller:"seller1",partNo:'partNo1',country:'CH',asin:'asin1',sku:"sku1",fnsku:'fnsku1',UPC:'up1',transportType:'FNA'},
              {model:'2',seller:"seller2",partNo:'partNo2',country:'CH',asin:'asin2',sku:"sku1",fnsku:'fnsku1',UPC:'up3',transportType:'FNA'},
              {model:'2',seller:"seller2",partNo:'partNo2',country:'UK',asin:'asin1',sku:"sku3",fnsku:'fnsku2',UPC:'up2',transportType:'FNA'},
              {model:'2',seller:"seller2",partNo:'partNo2',country:'USA',asin:'asin3',sku:"sku2",fnsku:'fnsku3',UPC:'up3',transportType:'FNA'},
              {model:'3',seller:"seller2",partNo:'partNo2',country:'USA',asin:'asin1',sku:"sku3",fnsku:'fnsku1',UPC:'up3',transportType:'FNA'},
              {model:'1',seller:"seller3",partNo:'partNo3',country:'UK',asin:'asin3',sku:"sku1",fnsku:'fnsku2',UPC:'up1',transportType:'FNA'},
              {model:'3',seller:"seller1",partNo:'partNo1',country:'CH',asin:'asin1',sku:"sku2",fnsku:'fnsku1',UPC:'up1',transportType:'自发货'},
              {model:'3',seller:"seller1",partNo:'partNo1',country:'CH',asin:'asin1',sku:"sku2",fnsku:'fnsku1',UPC:'up1',transportType:'自发货'},
              {model:'1',seller:"seller1",partNo:'partNo3',country:'USA',asin:'asin2',sku:"sku2",fnsku:'fnsku1',UPC:'up2',transportType:'自发货'},
              {model:'2',seller:"seller2",partNo:'partNo2',country:'USA',asin:'asin2',sku:"sku2",fnsku:'fnsku3',UPC:'up3',transportType:'自发货'},
              {model:'1',seller:"seller1",partNo:'partNo2',country:'USA',asin:'asin2',sku:"sku1",fnsku:'fnsku2',UPC:'up2',transportType:'自发货'},
              {model:'3',seller:"seller3",partNo:'partNo1',country:'USA',asin:'asin3',sku:"sku3",fnsku:'fnsku3',UPC:'up2',transportType:'自发货'},
              {model:'3',seller:"seller3",partNo:'partNo3',country:'UK',asin:'asin1',sku:"sku1",fnsku:'fnsku1',UPC:'up1',transportType:'自发货'},
              ],
            select_model:'1',select_seller:"seller1",select_partNo:'partNo1',select_country:'CH',select_asin:'asin1',select_sku:"sku1",select_fnsku:'fnsku1',select_UPC:'up1',select_transportType:'FNA',
            form:{
              model: this.$store.state.product.productModelNumber,
              partNo:this.$store.state.product.p,
              country:'',
              seller:'',
              asin:'',
              UPC:'',
              transportType:'',
              skuOrFnsku:'',
            }

          }
      },methods:{
          init(){

          },

        filter_select_model(value,row,column){

          console.log(value)
          console.log(row)
          console.log(column)

          return row.model == value
        },
        change_select_seller(event){
          console.log(event)
        },submitCodedInfo(){
          this.addCodedInfo = false
          console.log("添加编码信息")
        },
        search(){
          console.log("提交搜索信息")
        },
      }
    }
</script>

<style scoped>

</style>
