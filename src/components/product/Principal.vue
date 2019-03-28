<template>
    <div id="Principal">
      <el-button style="float: left" @click="addPrincipal = true">新增</el-button>
      <el-dialog title="新增记录/编辑"  :visible.sync="addPrincipal" style="width: auto; height: auto">
        <el-form :model="form" label-width="100px" :label-position="labelPosition">

          <el-row >
            <el-col :span="6">
              <el-form-item label="产品型号:">
                <el-input value="SW-01" v-model="form.modelNumber" ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="运营组别:">
                <el-input  value="A" v-model="form.deptName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :span="6">
              <el-form-item label="所属BU:">
                <el-input  value="BU" v-model="form.BU"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="运营负责人:">
                <el-input  value="XXX" v-model="form.deptUser"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row >

            <el-col :span="6">
              <el-form-item label="产品系列:">
                <el-input  value="LC" v-model="form.productCategory"></el-input>
              </el-form-item>
            </el-col>

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
              <el-form-item label="ASIN:">
                <el-select  placeholder="请选择ASIN" v-model="form.asin">
                  <el-option label="1" value="UK"></el-option>
                  <el-option label="2" value="USA"></el-option>
                  <el-option label="3" value="USA"></el-option>
                  <el-option label="4" value="USA"></el-option>
                  <el-option label="5" value="USA"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="addPrincipal = false">取 消</el-button>
          <el-button type="primary" @click="submitPrincipal">确 定</el-button>
        </div>

      </el-dialog>

      <el-table name="showTable" border="border" height="250px" style="width: 100%" :data="principalList">
        <el-table-column prop="country" label="国家" ></el-table-column>
        <el-table-column prop="modelNumber" label="产品型号" ></el-table-column>
        <el-table-column prop="asin" label="ASIN" ></el-table-column>
        <el-table-column prop="productCategory" label="产品系列" ></el-table-column>
        <el-table-column prop="BU" label="所属BU" ></el-table-column>
        <el-table-column prop="dept" label="运营组别" ></el-table-column>
        <el-table-column prop="deptUser" label="运营负责人" ></el-table-column>
        <el-table-column prop="recordUser" label="记录人" ></el-table-column>
        <el-table-column prop="uTime" label="更新时间" ></el-table-column>
        <el-table-column prop="remark" label="备注" ></el-table-column>
        <el-table-column  label="编辑" ><el-button @click="addPrincipal = true">编辑</el-button></el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "Principal",
      data(){
          return{
            labelPosition:'right',
            addPrincipal:false,
            principalList:[
              {country:'US',modelNumber:'SW-01',asin:'xxxxxx',productCategory:'LC',BU:'SY',dept:'A',deptUser:'XXX',recordUser:"XXX",uTime:'2019-3-19',remark:"备注"},
              {country:'US',modelNumber:'SW-01',asin:'xxxxxx',productCategory:'LC',BU:'SY',dept:'A',deptUser:'XXX',recordUser:"XXX",uTime:'2019-3-19',remark:"备注"},
              {country:'US',modelNumber:'SW-01',asin:'xxxxxx',productCategory:'LC',BU:'SY',dept:'A',deptUser:'XXX',recordUser:"XXX",uTime:'2019-3-19',remark:"备注"},
              {country:'US',modelNumber:'SW-01',asin:'xxxxxx',productCategory:'LC',BU:'SY',dept:'A',deptUser:'XXX',recordUser:"XXX",uTime:'2019-3-19',remark:"备注"},
              {country:'US',modelNumber:'SW-01',asin:'xxxxxx',productCategory:'LC',BU:'SY',dept:'A',deptUser:'XXX',recordUser:"XXX",uTime:'2019-3-19',remark:"备注"},
              {country:'US',modelNumber:'SW-01',asin:'xxxxxx',productCategory:'LC',BU:'SY',dept:'A',deptUser:'XXX',recordUser:"XXX",uTime:'2019-3-19',remark:"备注"},
              {country:'US',modelNumber:'SW-01',asin:'xxxxxx',productCategory:'LC',BU:'SY',dept:'A',deptUser:'XXX',recordUser:"XXX",uTime:'2019-3-19',remark:"备注"},
              {country:'US',modelNumber:'SW-01',asin:'xxxxxx',productCategory:'LC',BU:'SY',dept:'A',deptUser:'XXX',recordUser:"XXX",uTime:'2019-3-19',remark:"备注"},
              {country:'US',modelNumber:'SW-01',asin:'xxxxxx',productCategory:'LC',BU:'SY',dept:'A',deptUser:'XXX',recordUser:"XXX",uTime:'2019-3-19',remark:"备注"},
              {country:'US',modelNumber:'SW-01',asin:'xxxxxx',productCategory:'LC',BU:'SY',dept:'A',deptUser:'XXX',recordUser:"XXX",uTime:'2019-3-19',remark:"备注"},
              {country:'US',modelNumber:'SW-01',asin:'xxxxxx',productCategory:'LC',BU:'SY',dept:'A',deptUser:'XXX',recordUser:"XXX",uTime:'2019-3-19',remark:"备注"}],
              form:{
                modelNumber:'',
                deptName:'',
                BU:'',
                deptUser:'',
                productCategory:'',
                country:'',
                asin:'',


              }
          }
      },
      methods:{
        submitPrincipal(){
          this.addPrincipal = false
          console.log("增加产品负责人")
        }
      }
    }
</script>

<style scoped>

</style>
