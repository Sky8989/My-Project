<template>
    <div id="Document">
      <el-row :gutter="5" >

        <el-col :span="20">

          <el-col :span="4" name="docType" >

            <el-button id="1" style="display: block; width: 130px" @click="chooseDocType(1)">产品listing文案</el-button>
            <el-button id="2" style="display: block;margin-left: 0px;width: 130px" @click="chooseDocType(2)">产品定义文档</el-button>
            <el-button id="3" style="display: block;margin-left: 0px;width: 130px" @click="chooseDocType(3)">认证文件</el-button>
            <el-button id="4" style="display: block;margin-left: 0px;width: 130px" @click="chooseDocType(4)">结构文件</el-button>
            <el-button id="5" style="display: block;margin-left: 0px;width: 130px" @click="chooseDocType(5)">立项资料</el-button>
            <el-button id="6" style="display: block;margin-left: 0px;width: 130px" @click="chooseDocType(6)">申述文件</el-button>
            <el-button id="7" style="display: block;margin-left: 0px;width: 130px" @click="chooseDocType(7)">其他</el-button>

          </el-col>

          <el-col :span="16" name="docList">
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            <el-upload
              ref="upload"
              name="files"
              class="upload-demo"
              multiple :limit="5"
              :action="action"
              :before-upload="beforeUploadPicture"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="onSuccess"
              :file-list="fileList"
              :auto-upload="false"
              :data="params"
              style="height: auto">
              <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
          </el-col>
        </el-col>

        <el-col :span="4" name="option" style="padding: 230px 0px 0px 0px">
          <el-button size="small" type="primary" @click="submitUpload">点击上传</el-button>
          <el-button size="small">下载</el-button>
          <el-button size="small" type="danger" @click="deleteDialog = true">删除</el-button>
        </el-col>

      </el-row>
    </div>
</template>

<script>
    export default {
        name: "Document",
      data(){
          return{
            params:{
              productId:0,
              typeId:1, //默认为第一个
            },
            fileType:'DOCUMENT',
            action:this.HOST + "/productFile/saveFiles",
            docTypeId:1,
            delShowDocList:[], //删除 文件展示列表
            delDocList:[], //删除文档id列表
            fileList: [
              /*{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}*/
              ],

          }
      },
      methods:{
          init(){
            console.log("doc init method")
            this.searchDocument(this.$store.state.product.productId,this.docTypeId)
          },
        searchDocument(productId,typeId){
          //查询前先初始化
          this.fileList = []
          this.delShowDocList = []
          this.delDocList = []


          if(productId == null || productId == ''){
            this.$message("请先选择产品")
            return false
          }

          var data = {
            'productId':productId,
            'typeId':typeId,
            'fileType':this.fileType,
          }

          var url = this.HOST + "/productFile/findByProductIdAndTypeId"
          this.axios({
            method:'get',
            url:url,
            params:{
              'productId':productId,
              'typeId':typeId,
              'fileType':this.fileType,
            }

          }).then(res => {
            if(res.data.code == "200"){
              //渲染图片
             console.log(res.data)
              this.fileList = res.data.data

            }
          }).catch(error =>{
            console.error(error)
          })

        },
        handleRemove(file, fileList){
          console.log("移除文档")
          console.log(file, fileList);
        },
        handlePreview(file){
          console.log("图片预览")
          console.log(file.url);
          console.log(file.name);
         /* this.dialogImageUrl = file.url;
          this.dialogVisible = true;*/
        },
        onSuccess:function(res,file,fileList){
          console.log("文档上传成功后，后台返回文档的路径")
          console.log(res)
          if(res.code == "200"){

            console.log(res.data)
            this.fileList = res.data
          }
          this.uploadComplete = true;
          // this.fileChange(fileList)
        },
        submitUpload() {
          console.log("提交")
          this.$refs.upload.submit();
        },
        beforeUploadPicture(file) {
          console.log("上传图片前调用方法")
          console.log(file)
          this.params.productId = this.$store.state.product.productId
          this.params.typeId = this.docTypeId
        },chooseDocType(typeId){
            this.params.typeId = typeId
            this.params.docTypeId = typeId

          this.init()

        }

      }
    }
</script>

<style scoped>

</style>
