<template>
  <div id="Listting">
    <el-button style="float: left" @click="addListting = true">新增记录</el-button>
    <el-dialog title="新增记录/编辑"  :visible.sync="addListting" style="width: auto; height: auto">
      <el-form :model="form"  label-width="80px" :label-position="labelPosition" >



        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="产品型号:">
              <el-input  value="SW-01" v-model="form.modelNumber"  ></el-input>
            </el-form-item>

          </el-col>
          <!--<el-col :span="8">
            <el-form-item label="产品型号">
              <el-input  value="SW-01" v-model="form.modelNumber"  ></el-input>
            </el-form-item>
          </el-col>-->

        </el-row>





       <!-- <el-row :gutter="10">
         &lt;!&ndash; <el-col :span="2">&ndash;&gt;
           &lt;!&ndash; <span>产品型号:</span>&ndash;&gt;





          &lt;!&ndash;</el-col>&ndash;&gt;

         &lt;!&ndash; <el-col :span="7">

          </el-col>&ndash;&gt;
        </el-row><br>-->

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="账号:">
              <el-select  placeholder="请选择账号" v-model="form.seller">
                <el-option label="1" value="账号UK"></el-option>
                <el-option label="2" value="账号USA"></el-option>
                <el-option label="3" value="账号USA"></el-option>
                <el-option label="4" value="账号USA"></el-option>
                <el-option label="5" value="账号USA"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="国家:">
              <el-select  placeholder="请选择账号" v-model="form.country">
                <el-option label="1" value="账号UK"></el-option>
                <el-option label="2" value="账号USA"></el-option>
                <el-option label="3" value="账号USA"></el-option>
                <el-option label="4" value="账号USA"></el-option>
                <el-option label="5" value="账号USA"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>


       <!-- <el-row :gutter="10" >

          <el-col :span="2">
            <span>账号:</span>
          </el-col>

          <el-col :span="7">
            <el-select  placeholder="请选择账号" v-model="form.seller">
              <el-option label="1" value="账号UK"></el-option>
              <el-option label="2" value="账号USA"></el-option>
              <el-option label="3" value="账号USA"></el-option>
              <el-option label="4" value="账号USA"></el-option>
              <el-option label="5" value="账号USA"></el-option>
            </el-select>
          </el-col>

          <el-col :span="2">
            <span>国家:</span>
          </el-col>

          <el-col :span="7">
            <el-select  placeholder="请选择国家" v-model="form.country">
              <el-option label="UK" value="UK"></el-option>
              <el-option label="USA" value="USA"></el-option>
              <el-option label="JP" value="USA"></el-option>
              <el-option label="CH" value="USA"></el-option>
              <el-option label="DE" value="USA"></el-option>
            </el-select>
          </el-col>

        </el-row><br>-->


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

     <!--   <el-row :gutter="10" >
          <el-col :span="2">
            <span>时间:</span>
          </el-col>

          <el-col :span="7">
            <el-date-picker
              v-model="form.eventTime"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00" >
            </el-date-picker>
          </el-col>
        </el-row><br>-->



        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="事件:">
              <el-input style=" width: 580px" value="事件描述" v-model="form.listtingEvent"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


       <!-- <el-row :gutter="10">
          <el-col :span="2">
            <span>事件:</span>
          </el-col>

          <el-col :span="17" >
            <el-input style=" width: 588px" value="事件描述" v-model="form.listtingEvent"></el-input>
          </el-col>
        </el-row><br>-->


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

    <el-table name="showTable" border="border" height="250px" style="width: 100%" :data="ListtingList">
      <el-table-column prop="seller" label="账号" ></el-table-column>
      <el-table-column prop="country" label="国家" ></el-table-column>
      <el-table-column prop="modelNumber" label="产品型号" ></el-table-column>
      <el-table-column prop="event" label="事件" ></el-table-column>
      <el-table-column prop="eventTime" label="时间" ></el-table-column>
      <el-table-column prop="processingRecord" label="处理记录" ></el-table-column>
      <el-table-column prop="recordUser" label="记录人" ></el-table-column>
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
              {seller:'aaa',country:'UK',modelNumber:'SW-01',event:'事件名称',eventTime:'2019-3-11',processingRecord:"事件详细处理记录---",recordUser:'xxx',uTime:'2019-3-19'},
              {seller:'aaa',country:'UK',modelNumber:'SW-01',event:'事件名称',eventTime:'2019-3-11',processingRecord:"事件详细处理记录---",recordUser:'xxx',uTime:'2019-3-19'},
              {seller:'aaa',country:'UK',modelNumber:'SW-01',event:'事件名称',eventTime:'2019-3-11',processingRecord:"事件详细处理记录---",recordUser:'xxx',uTime:'2019-3-19'},
              {seller:'aaa',country:'UK',modelNumber:'SW-01',event:'事件名称',eventTime:'2019-3-11',processingRecord:"事件详细处理记录---",recordUser:'xxx',uTime:'2019-3-19'},
              {seller:'aaa',country:'UK',modelNumber:'SW-01',event:'事件名称',eventTime:'2019-3-11',processingRecord:"事件详细处理记录---",recordUser:'xxx',uTime:'2019-3-19'},
              {seller:'aaa',country:'UK',modelNumber:'SW-01',event:'事件名称',eventTime:'2019-3-11',processingRecord:"事件详细处理记录---",recordUser:'xxx',uTime:'2019-3-19'},
              {seller:'aaa',country:'UK',modelNumber:'SW-01',event:'事件名称',eventTime:'2019-3-11',processingRecord:"事件详细处理记录---",recordUser:'xxx',uTime:'2019-3-19'},
              {seller:'aaa',country:'UK',modelNumber:'SW-01',event:'事件名称',eventTime:'2019-3-11',processingRecord:"事件详细处理记录---",recordUser:'xxx',uTime:'2019-3-19'},
              {seller:'aaa',country:'UK',modelNumber:'SW-01',event:'事件名称',eventTime:'2019-3-11',processingRecord:"事件详细处理记录---",recordUser:'xxx',uTime:'2019-3-19'},
            ],
            addListting: false,
            form:{
              modelNumber:'',
              seller:'',
              country:'',
              eventTime:'',
              listtingEvent:'',
              processingRecord:'',

            }

            }
      },
      methods:{
        submitListting(){
          this.addListting = false
          console.log("增加")
        }


      }
    }
</script>

<style scoped>

</style>
