<template>
    <div id="Supplier">
     <el-row>
       <el-col :span="4">
         <el-button style="float: left" @click="addSupplier = true">新增供应商+</el-button>
       </el-col>
     </el-row>

      <el-dialog title="新增供应商+" :visible.sync="addSupplier" style="width: auto; height: auto;">

        <el-form label-width="95px" :model="form" :label-position="LabelPosition">
          <el-row >
            <el-col :span="5">
              <el-form-item label="供应商:">
                <el-input v-model="form.supplier"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="联系人:">
                <el-input v-model="form.contact"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="联系电话:">
                <el-input v-model="form.contactPhone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="联系邮箱:">
                <el-input v-model="form.contactMail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="20">
              <el-form-item label="地址:">
                <el-input v-model="form.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row >
            <el-col :span="5">
              <el-form-item label="采购成本:">
                <el-input v-model="form.productionCosts"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="MOQ:">
                <el-input v-model="form.MOQ"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="产能:">
                <el-input v-model="form.capactity"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :span="5">
              <el-form-item label="交易货币:">
               <!-- <el-input v-model="form.transactionCurrency"></el-input>-->
                <el-select v-model="form.transactionCurrency" placeholder="请选择交易货币">
                  <el-option label="RMB" value="RMB"></el-option>
                  <el-option label="JPY" value="JPY"></el-option>
                  <el-option label="EUR" value="JPY"></el-option>
                  <el-option label="GBP" value="GBP"></el-option>
                  <el-option label="USD" value="USD"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="最小包:">
                <el-input v-model="form.minCartonQuantity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="采购负责人:">
               <!-- <el-input v-model="form.principalUser"></el-input>-->
                <el-select v-model="form.principalUser" placeholder="请选择采购负责人">
                  <el-option label="aaa" value="aaa"></el-option>
                  <el-option label="bbb" value="bbb"></el-option>
                  <el-option label="ccc" value="ccc"></el-option>
                  <el-option label="ddd" value="ddd"></el-option>
                  <el-option label="fff" value="fff"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="20">
              <el-form-item label="备注:">
                <el-input v-model="form.remake" type="textarea" :autosize="{minRows:4,maxRows:6}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="addSupplier = false">取 消</el-button>
          <el-button type="primary" @click="submitListting">确 定</el-button>
        </div>

      </el-dialog>


      <el-table name="SupplierList" :data="supplierList" height="250px" border="border">
        <el-table-column prop="supplier" label="供应商" ></el-table-column>
        <el-table-column prop="address" label="地址" ></el-table-column>
        <el-table-column prop="contact" label="联系人" ></el-table-column>
        <el-table-column prop="contactPhone" label="联系电话" ></el-table-column>
        <el-table-column prop="contactMail" label="联系邮箱" ></el-table-column>
        <el-table-column prop="productionCosts" label="采购成本" ></el-table-column>
        <el-table-column prop="MOQ" label="MOQ" ></el-table-column>
        <el-table-column prop="capactity" label="产能" ></el-table-column>
        <el-table-column prop="minCartonQuantity" label="最小包" ></el-table-column>
        <el-table-column prop="transactionCurrency" label="交易货币" ></el-table-column>
        <el-table-column prop="principalUser" label="采购负责人" ></el-table-column>
        <el-table-column prop="recordUser" label="记录人" ></el-table-column>
        <el-table-column prop="uTime" label="更新时间" ></el-table-column>
        <el-table-column prop="remake" label="备注" ></el-table-column>
        <el-table-column prop="edit" label="编辑" ><el-button @click="addSupplier = true">编辑</el-button></el-table-column>

      </el-table>



    </div>
</template>

<script>
    export default {
        name: "Supplier",
      data(){
          return {
            addSupplier:false,
            supplierList:[
              {supplier:'供应商A',address:'广东省深圳市',contact:'jack',contactPhone:'123456789',contactMail:'xxxxx@xx.com',productionCosts:'1000',MOQ:'1000',capactity:'1000',minCartonQuantity:'10',transactionCurrency:'RMB',principalUser:'xxx',recordUser:'xxx',uTime:'2019-3-12',remake:'备注'},
              {supplier:'供应商A',address:'广东省深圳市',contact:'jack',contactPhone:'123456789',contactMail:'xxxxx@xx.com',productionCosts:'1000',MOQ:'1000',capactity:'1000',minCartonQuantity:'10',transactionCurrency:'RMB',principalUser:'xxx',recordUser:'xxx',uTime:'2019-3-12',remake:'备注'},
              {supplier:'供应商A',address:'广东省深圳市',contact:'jack',contactPhone:'123456789',contactMail:'xxxxx@xx.com',productionCosts:'1000',MOQ:'1000',capactity:'1000',minCartonQuantity:'10',transactionCurrency:'RMB',principalUser:'xxx',recordUser:'xxx',uTime:'2019-3-12',remake:'备注'},
              {supplier:'供应商A',address:'广东省深圳市',contact:'jack',contactPhone:'123456789',contactMail:'xxxxx@xx.com',productionCosts:'1000',MOQ:'1000',capactity:'1000',minCartonQuantity:'10',transactionCurrency:'RMB',principalUser:'xxx',recordUser:'xxx',uTime:'2019-3-12',remake:'备注'},
              {supplier:'供应商A',address:'广东省深圳市',contact:'jack',contactPhone:'123456789',contactMail:'xxxxx@xx.com',productionCosts:'1000',MOQ:'1000',capactity:'1000',minCartonQuantity:'10',transactionCurrency:'RMB',principalUser:'xxx',recordUser:'xxx',uTime:'2019-3-12',remake:'备注'},
              {supplier:'供应商A',address:'广东省深圳市',contact:'jack',contactPhone:'123456789',contactMail:'xxxxx@xx.com',productionCosts:'1000',MOQ:'1000',capactity:'1000',minCartonQuantity:'10',transactionCurrency:'RMB',principalUser:'xxx',recordUser:'xxx',uTime:'2019-3-12',remake:'备注'},
              {supplier:'供应商A',address:'广东省深圳市',contact:'jack',contactPhone:'123456789',contactMail:'xxxxx@xx.com',productionCosts:'1000',MOQ:'1000',capactity:'1000',minCartonQuantity:'10',transactionCurrency:'RMB',principalUser:'xxx',recordUser:'xxx',uTime:'2019-3-12',remake:'备注'},
              {supplier:'供应商A',address:'广东省深圳市',contact:'jack',contactPhone:'123456789',contactMail:'xxxxx@xx.com',productionCosts:'1000',MOQ:'1000',capactity:'1000',minCartonQuantity:'10',transactionCurrency:'RMB',principalUser:'xxx',recordUser:'xxx',uTime:'2019-3-12',remake:'备注'},
              {supplier:'供应商A',address:'广东省深圳市',contact:'jack',contactPhone:'123456789',contactMail:'xxxxx@xx.com',productionCosts:'1000',MOQ:'1000',capactity:'1000',minCartonQuantity:'10',transactionCurrency:'RMB',principalUser:'xxx',recordUser:'xxx',uTime:'2019-3-12',remake:'备注'},
            ],
            form: {
              supplier:'',
              address:'',
              contact:'',
              contactPhone:'',
              contactMail:'',
              productionCosts:'',
              MOQ:'',
              capactity:'',
              minCartonQuantity:'',
              transactionCurrency:'',
              principalUser:'',
              recordUser:'',
              uTime:'',
              remake:''
            },
            LabelPosition: 'right'
          }

      },
      methods:{
        submitListting(){
          this.addSupplier = false
          console.log("添加供应商")
        }
      }
    }
</script>

<style scoped>

</style>
