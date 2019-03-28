<template>
    <div id="Tabs">
      <el-row  name="productRel">

        <el-col :span="24" >

          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="height: auto;">
            <el-tab-pane label="图片" name="first">
              <!--引用 ImageUpload 组件 引用的名称小写多个字母用中划线分割(-)-->
              <ImageUpload ref="image-upload"></ImageUpload>
            </el-tab-pane>

            <el-tab-pane label="文档" name="second">
              <Document ref="document"></Document>
            </el-tab-pane>

            <el-tab-pane label="负责人列表" name="third">
              <Principal ref="principal"></Principal>
            </el-tab-pane>

            <el-tab-pane label="listing事件记录" name="fourth">
              <Listting ref="listting"></Listting>
            </el-tab-pane>

            <el-tab-pane label="供应商" name="5">
              <Supplier ref="supplier"></Supplier>
            </el-tab-pane>

            <el-tab-pane label="物流费用" name="6">

            </el-tab-pane>

            <el-tab-pane label="编码信息表" name="7">
              <CodedInfo ref="codedInfo"></CodedInfo>
            </el-tab-pane>

            <el-tab-pane label="其他" name="8">

            </el-tab-pane>
          </el-tabs>

        </el-col>

      </el-row>

    </div>
</template>

<script>
  //导入组件
  import ImageUpload from './Image'
  import Document from "./Document";
  import Principal from "./Principal";
  import Listting from "./Listting";
  import Supplier from "./Supplier";
  import CodedInfo from "./CodedInfo";


    export default {
        name: "Tabs",
      //注册组件
      components: {Listting, Document, ImageUpload,Principal,Supplier,CodedInfo},
      data(){
          return{
            activeName: 'first',
          }
      },
      methods:{
        handleClick(tab, event) {
          console.log(tab, event);
        },
      }
    }
</script>

<style scoped>


</style>
