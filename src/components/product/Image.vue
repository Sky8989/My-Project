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
            :before-upload="beforeUploadPicture"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="onSuccess"
            :on-error="uploadError"
            :action="action"
            :size="1024 * 1024 * 10"
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
        <el-button size="small">下载</el-button>
        <el-button size="small" type="danger" @click="deleteDialog = true">删除</el-button>
      </el-col>
    </el-row>
    </form>



    <el-dialog
      title="删除图片"
      :visible.sync="deleteDialog"
      width="30%">
      <img  v-for="img in delShowImgList" :src="img.url" />
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
          $("#1").css("background-color","#409efb").css("color","#FFF")
          this.searchImg(this.$store.state.product.productId,this.imgTypeId)
        },searchImg(productId,typeId){

          //查询前先初始化
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
          this.delShowImgList.push(file.url)
         console.log(typeof(this.delImgList))
         console.log(this.delImgList)


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
        console.log(res)
        if(res.code == "200"){


          var imgList = res.data.saveImgOrDocument


          this.fileList = imgList
          console.log(this.fileList)
        }
        this.uploadComplete = true;
       // this.fileChange(fileList)
        },

        //设置photo值
       /* fileChange(fileList) {
          console.log("设置photo值")
          let temp_str = '';
          if(fileList.length > 0){
            for(let i=0; i<fileList.length; i++){
              if(fileList[i].response){
                if(fileList[i].response.code === 0){
                  if(i===0){
                    temp_str += fileList[i].response.data;
                  } else {
                    // 最终photo的格式是所有已上传的图片的url拼接的字符串（逗号隔开）
                    temp_str += ',' + fileList[i].response.data;
                  }
                }
              }
            }
          }
          this.photo = temp_str;
        },*/
        // 图片预览
        handlePictureCardPreview(file) {
          console.log("图片预览")
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;

          /*this.$confirm('您确定要将文件下载？, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log('file:' + file.url.substring(0, 4))
            if (file.url.substring(0, 5) === 'blob:') {
              this.$confirm('请保存信息后再下载！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
              return false;
            } else {
            //  document.location.href = process.env.BASE_API + '/api/photoUpload/imgDownload?filePath=' + file.url + '&fileName=' + file.name;
            }
          });*/
        },
        chooseImgType(id){
          console.log(id)

          //每次点击高亮 其他兄弟节点失去高亮
          $("#"+id).css("background-color","#409efb").css("color","#FFF")
          $("#"+id).siblings().css("background-color","#FFF").css("color","#606266")


          this.params.typeId =id
          this.searchImg(this.$store.state.product.productId,id)
        },

        delImgs(flag){


          if(this.delImgList == null){
            this.$message.warning("请先选择需要删除的图片")
            this.deleteDialog = false
            return false;
          }

          this.deleteDialog = true

          if(flag){//删除操作
            var url = this.HOST + "/productFile/dropFiles"
            var data = {
              fileIds:this.delImgList.toString(),
              fileType:this.fileType,
            }

            console.log("需要删除的图片 ")
            console.log(data.fileIds)
            this.axios({
              method:'post',
              url:url,
              data: data,

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



        }

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
