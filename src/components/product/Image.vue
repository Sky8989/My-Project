<template>
  <div id="ImageUpload">


    <form id="" name="" method="post" target="upload" action="" encType="multipart/form-data">
    <el-row :gutter="5" >


      <el-col :span="20">

        <el-col :span="3" name="imgType" >

          <el-button id="1" style="display: block; width: 130px" @click="chooseImgType(1)">橱窗图</el-button>
          <el-button id="2" style="display: block;margin-left: 0px;width: 130px" @click="chooseImgType(2)">EBC</el-button>
          <el-button id="3" style="display: block;margin-left: 0px;width: 130px" @click="chooseImgType(3)">品牌推广图</el-button>
          <el-button id="4" style="display: block;margin-left: 0px;width: 130px"@click="chooseImgType(4)" >实物图</el-button>
          <el-button id="5" style="display: block;margin-left: 0px;width: 130px" @click="chooseImgType(5)">包装图片</el-button>
          <el-button id="6" style="display: block;margin-left: 0px;width: 130px" @click="chooseImgType(6)">说明书图片</el-button>
          <el-button id="7" style="display: block;margin-left: 0px;width: 130px"@click="chooseImgType(7)" >其他</el-button>

        </el-col>

        <el-col :span="16" name="imgList">
          <div slot="tip" class="el-upload__tip">最多只能同时上传5张图片</div>

          <!--  multiple :limit="5"-->
          <el-upload
            class="upload-demo"
            ref="upload"
            name="files"
            multiple
            :limit="10"
            :on-exceed="uploadExceed"
            :before-upload="beforeUploadPicture"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="onSuccess"
            :action="action"
            :auto-upload="false"
            :file-list="fileList"
            :data="params"
            list-type="picture-card" style="height: auto">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!--:headers="header"-->

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>

        </el-col>
      </el-col>

      <el-col :span="4" name="option" style="padding: 230px 0px 0px 0px">
        <!--<el-button size="" type="primary">上传图片</el-button>-->
        <el-button size="small" type="primary" @click="submitUpload">点击上传</el-button>
        <el-button size="small" @click="download">下载</el-button>
        <el-button size="small" type="danger" @click="deleteDialog = true">删除</el-button>
      </el-col>
    </el-row>
    </form>



    <el-dialog
      title="需要删除以下图片"
      :visible.sync="deleteDialog"
      width="80%">
      <el-upload
        name="file"
        multiple
        :limit="10"
        :on-exceed="uploadExceed"
        :before-upload="beforeUploadPicture"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="onSuccess"
        :action="action"
        :auto-upload="false"
        :file-list="delShowImgList"
        list-type="picture-card" style="height: auto">
      </el-upload>

     <!-- <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>-->

      <span slot="footer" class="dialog-footer">
    <el-button @click="delImgs(false)">取 消</el-button>
    <el-button type="primary" @click="delImgs(true)">确 定</el-button>
      </span>
    </el-dialog>

  </div>




</template>

<script>
    export default {
        name: "ImageUpload",
      data(){
          return{
            multiple:true,
            fileType:'IMAGE',
            deleteDialog:false, //是否显示删除对话框
            delImgList:[],      //删除图片的id列表
            delShowImgList:[],  //删除图片展示列表
            imgTypeId:1,        //默认为第一个
            dialogImageUrl: '', // 图片预览地址
            dialogVisible:false,
            params:{
                    productId:0,
                    typeId:1, //默认为第一个
            },
            imageUrl: '',
            action:this.HOST + "/productFile/saveFiles",
            uploadComplete: true, // 图片上传完成状态
            imgVisible: false, // 上传图片预览

            photo: '',  // 活动图片
            fileList: []
          }
      },

      methods:{
        init(){
          console.log("img init method")
          //第一次进去默认选中一个
          this.buttonChecked(1)
          this.searchImg(this.$store.state.product.productId,this.imgTypeId)

        },searchImg(productId,typeId){

          //查询前先初始化
        //  $(".upload-demo ul").hide()
          this.fileList = []
          this.delShowImgList = []
          this.delImgList = []


          if(productId == null || productId == ''){
            this.$message("请先选择产品")
            return false
          }

          var data = {
            'productId':productId,
            'typeId':typeId,
            'fileType':this.fileType,
          }
          console.log(data.fileType)

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
              // this.fileList = res.data.data
              this.fileList = res.data.data
            //  $(".upload-demo ul").show()

            }
          }).catch(error =>{
            console.error(error)
          })
        },
        submitUpload() {

          this.$refs.upload.submit();

        },
        // 移除图片
        handleRemove(file, fileList){
          console.log("移除图片")
          console.log(file);
          //将需要删除图片 存入list中
          this.delImgList.push(file.productImgId)
          var data = {url : file.url,id:file.productImgId}
          this.delShowImgList.push(data)

         console.log(this.delImgList)
         console.log(this.delShowImgList)

          // this.fileChange(fileList);
        },
        // 上传图片前调用方法
        beforeUploadPicture(file) {
          console.log("上传图片前调用方法")
          console.log(file)
          this.params.productId = this.$store.state.product.productId
          this.params.typeId = this.imgTypeId
        },
        // 上传图片出错
        uploadError(err, file, fileList) {
          this.$message.error("上传出错");
        },
        // 图片上传成功后，后台返回图片的路径
      onSuccess:function(res,file,fileList){
          console.log("图片上传成功后，后台返回图片的路径")

        if(res.code == "200"){
          var imgList = res.data
          this.fileList = imgList
         // this.$refs.upload.status = 1
          console.log(this.fileList)
        }
        this.uploadComplete = true;

       // this.fileChange(fileList)
        },

        // 图片预览
        handlePictureCardPreview(file) {
          console.log("图片预览")
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;


        },
        uploadExceed(file,fileList){
          console.log("uploadExceed")
          this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${file.length} 个文件，共选择了 ${file.length + fileList.length} 个文件`);

        },
        chooseImgType(id){
          console.log(id)

          //切换时清除
         // this.$refs.upload.clearFiles()
          //每次点击高亮 其他兄弟节点失去高亮
          this.buttonChecked(id)


          this.params.typeId =id
          this.searchImg(this.$store.state.product.productId,id)
        },
        buttonChecked(id){
          $("#"+id).css("background-color","#409efb").css("color","#FFF")
          $("#"+id).siblings().css("background-color","#FFF").css("color","#606266")

          //设置id
          this.imgTypeId = id
        }
        ,
        delImgs(flag){

          if(this.delImgList == null){
            this.$message.warning("请先选择需要删除的图片")
            this.deleteDialog = false
            return false;
          }

          this.deleteDialog = true

          console.log(this.delShowImgList.toString())
          if(flag){//删除操作
            var url = this.HOST + "/productFile/dropFiles"
            var data = {
              fileIds:this.delImgList.toString(),
              fileType:this.fileType,
            }

            console.log("需要删除的图片 类型 ")
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
            this.searchImg(this.$store.state.product.productId,this.imgTypeId)
          }
          //清除删除list
          this.delImgList = []
          this.delShowImgList = []

          this.deleteDialog = false



        },download(){
          console.log("download")
          //包含上传的文件信息和服务端返回的所有信息都在这个对象里
          console.log(this.$refs.upload.uploadFiles)

          var url = this.$refs.upload.uploadFiles[0].url

          this.$confirm('您确定要将文件下载？, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
          // console.log('file:' + url.substring(0, 4))

            open(url)

          // this.downloadIamge(url,"")
         });

        },
        downloadIamge(imgsrc, name) {//下载图片地址和图片名
          var image = new Image();
          // 解决跨域 Canvas 污染问题
         image.setAttribute("crossOrigin", "anonymous");
          image.onload = function() {
            var canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext("2d");
            context.drawImage(image, 0, 0, image.width, image.height);
            var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
              console.log(url)
              console.log(name)
            var a = document.createElement("a"); // 生成一个a元素
            var event = new MouseEvent("click"); // 创建一个单击事件
            a.download = name || "photo"; // 设置图片名称
            a.href = url; // 将生成的URL设置为a.href属性
            a.dispatchEvent(event); // 触发a的单击事件
          };
          image.src = imgsrc;
        },

      }


    }
</script>

<style scoped>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
