<template>
  <div id="Listting">
    <el-button style="float: left" @click="addListting = true">新增记录</el-button>
    <el-dialog title="新增记录/编辑"  :visible.sync="addListting" style="width: auto; height: auto" @closed="closeDialog">

      <el-form :model="form"  label-width="80px" :label-position="labelPosition" >

        <input hidden type="number" v-model="form.listingEventId"></input>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="产品型号:">
              <span>{{this.$store.state.product.productModelNumber}}</span>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="账号:">
              <el-select  placeholder="请选择账号" v-model="form.seller">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="国家:">
              <el-select  placeholder="请选择账号" v-model="form.country">
                <el-option label="1" value="1">账号UK</el-option>
                <el-option label="2" value="2">账号USA</el-option>
                <el-option label="3" value="3">账号USA</el-option>
                <el-option label="4" value="4">账号USA</el-option>
                <el-option label="5" value="5">账号USA</el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>


        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="时间:">
              <el-date-picker
                v-model="form.eventTime"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00" >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="事件:">
              <el-input style=" width: 580px" value="事件描述" v-model="form.listtingEvent"></el-input>
            </el-form-item>
          </el-col>
        </el-row>



        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="处理记录:">
              <el-input  type="textarea"  :autosize="{ minRows: 3, maxRows: 6}" value="事件描述" v-model="form.processingRecord" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addListting = false">取 消</el-button>
        <el-button type="primary" @click="submitListting">确 定</el-button>
      </div>

    </el-dialog>

    <el-table name="showTable" border="border" height="250px" style="width: 100%" :data="ListtingList" @cell-click="editListting">
      <el-table-column prop="productListingEventId"  ></el-table-column>
      <el-table-column prop="sellerId" label="账号" ></el-table-column>
      <el-table-column prop="countryId" label="国家" ></el-table-column>
      <el-table-column prop="modelNumber" label="产品型号" ></el-table-column>
      <el-table-column prop="productListingEventDescription" label="事件" ></el-table-column>
      <el-table-column prop="productListingEventTime" label="时间" ></el-table-column>
      <el-table-column prop="productListingEventProcessingRecord" label="处理记录" ></el-table-column>
      <el-table-column prop="productListingEventRecordUser" label="记录人" ></el-table-column>
      <el-table-column prop="uTime" label="更新时间" ></el-table-column>
      <el-table-column  label="编辑" ><el-button @click="addListting = true">编辑</el-button></el-table-column>
    </el-table>
  </div>
    
</template>

<script>
    export default {
        name: "Listting",


      data(){
          return{
            labelPosition:'left',
            formLabelAlign: {
              name: '',
              region: '',
              type: ''
            },
            ListtingList: [
              /*{seller:'aaa',country:'UK',modelNumber:'SW-01',event:'事件名称',eventTime:'2019-3-11',processingRecord:"事件详细处理记录---",recordUser:'xxx',uTime:'2019-3-19'},
              {seller:'aaa',country:'UK',modelNumber:'SW-01',event:'事件名称',eventTime:'2019-3-11',processingRecord:"事件详细处理记录---",recordUser:'xxx',uTime:'2019-3-19'},*/
            ],
            addListting: false,
            form:{
              listingEventId:'',
              seller:'',
              country:'',
              eventTime:'',
              listtingEvent:'',
              processingRecord:'',

            }

            }
      },
      mounted(){
      },
      methods:{
          init(){
            console.log("----")
            this.searchListting(this.$store.state.product.productId)
          },
        searchListting(productId){
          console.log("===searchListting")

          if(productId == null || productId == ''){
            this.$message("请先选择产品")
            return false
          }

          console.log(productId)
            var url = this.HOST + "/productListingEvent/findByProductId/" +productId
            var method = "get"
          this.axios({
              method: method,
              url:url,

          }).then(res => {
            if(res.data.code == 200){
              console.log(res.data.data)
              this.ListtingList = res.data.data
            }
          }).catch(error => {
            console.log(error)
          })

        },
        submitListting(){

          var listingEventId  = this.form.listingEventId
          var method = "post"
          var url = this.HOST
          if(listingEventId != null && listingEventId != 0 ){

            console.log("update")
            method = 'put'
            url+= "/productListingEvent/update/"+ listingEventId


          }else {
            url +=  "/productListingEvent/add"
            console.log("增加")

          }

          var data = {
            // countryId: 1,
            // productId: this.form.product,
            // sellerId:  1,
            productListingEventId: listingEventId,
            countryId: this.form.country,
            productId: this.$store.state.product.productId,
            sellerId:  this.form.seller,
            productListingEventDescription: this.form.listtingEvent,
            productListingEventTime: this.form.eventTime,
            productListingEventProcessingRecord: this.form.processingRecord,
            productListingEventRecordUser: "当前用户",}


          console.log(method)
          console.log(url)
          console.log(data)
          this.axios({
             method: method,
              url:   url,
              data:  data

          }).then(res => {
              if(res.data.code == "200"){
                this.$message(res.data.data.msg);

              }

            }).catch(error => {
                console.log(error)
          })

          this.addListting = false


        },editListting(row,cell){
          console.log(cell.label)
          console.log(row.productListingEventId)

          if(cell.label != "编辑"){
                return false
          }

          this.addListting = true
          this.form.listingEventId = row.productListingEventId
          this.form.country = row.countryId
          this.form.productId = row.productId
          this.form.seller = row.sellerId
          this.form.listtingEvent = row.productListingEventDescription
          this.form.eventTime = row.productListingEventTime
          this.form.processingRecord = row.productListingEventProcessingRecord
          this.form.recordUser = row.productListingEventRecordUser
           // this.form.uTime = row.cTime

        },closeDialog(){
            console.log("closeDialog 关闭回调")
          this.form = {
            listingEventId:'',
            seller:'',
            country:'',
            eventTime:'',
            listtingEvent:'',
            processingRecord:'',

          }
        }


      }
    }
</script>

<style scoped>

</style>
