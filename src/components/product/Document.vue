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
              multiple :limit="10"
              :on-exceed="uploadExceed"
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



      <el-dialog
        title="需要删除以下文档"
        :visible.sync="deleteDialog"
        width="80%">
        <el-upload
          :action="action"
          :auto-upload="false"
          :file-list="delShowDocList"
          list-type="picture-card" style="height: auto">
        </el-upload>

        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <span slot="footer" class="dialog-footer">
    <el-button @click="delDocs(false)">取 消</el-button>
    <el-button type="primary" @click="delDocs(true)">确 定</el-button>
      </span>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "Document",
      data(){
          return{
            deleteDialog:false,
            dialogVisible:false,
            uploadComplete:false, //上传完成的状态
            dialogImageUrl:'',
            params:{
              productId:0,
              typeId:1, //默认为第一个
            },

            fileType:'DOCUMENT',
            action:this.HOST + "/productFile/saveFiles",
            docTypeId:1,
            delShowDocList:[], //删除 文件展示列表
            delDocList:[], //删除文档id列表
            fileList: [],

          }
      },
      methods:{
          init(){
            console.log("doc init method")

            this.buttonChecked(1)
            this.searchDocument(this.$store.state.product.productId,this.docTypeId)
          },
        searchDocument(productId,typeId){
          //查询前先初始化

          if(productId == null || productId == ''){
            this.$message("请先选择产品")
            return false
          }

          this.fileList = []
          this.delShowDocList = []
          this.delDocList = []

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
        uploadExceed(file,fileList){
          console.log("uploadExceed")
          this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${file.length} 个文件，共选择了 ${file.length + fileList.length} 个文件`);

        },
        handleRemove(file, fileList){
          console.log("移除文档")
          console.log(file);
          this.delDocList.push(file.productDocumentId)
          var data = {url : file.url,name:file.name,id:file.productDocumentId}
          this.delShowDocList.push(data)

          console.log(this.delDocList)
          console.log(this.delShowDocList)
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

        },
        buttonChecked(id){
          $("#"+id).css("background-color","#409efb").css("color","#FFF")
          $("#"+id).siblings().css("background-color","#FFF").css("color","#606266")

          this.docTypeId = id
        },
        delDocs(flag){

          if(this.delDocList == null){
            this.$message.warning("请先选择需要删除的图片")
            this.deleteDialog = false
            return false;
          }

          this.deleteDialog = true

          console.log(this.delShowDocList.toString())
          console.log(this.delDocList.toString())
          if(flag){//删除操作
            var url = this.HOST + "/productFile/dropFiles"
            var data = {
              fileIds:this.delDocList.toString(),
              fileType:this.fileType,
            }

            console.log("需要删除的文档 类型 ")
            console.log(data.fileType)
            this.axios({
              method:'post',
              url:url,
              data: this.qs.stringify(data),

            }).then(res => {
              if(res.data.code == "200"){
                console.log(res.data.data)
                //删除成功后返回 剩下的数据
                this.fileList = res.data.data
                this.$message.success("删除成功")
              }
            }).catch(error => {
              console.log(error)
            })


          }else{  //取消删除
            this.searchDocument(this.$store.state.product.productId,this.imgTypeId)
          }
          //清除删除list
          this.delDocList = []
          this.delShowDocList = []

          this.deleteDialog = false

        }

      }
    }
</script>

<style scoped>

</style>
