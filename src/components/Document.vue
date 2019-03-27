<template>
    <div id="Document">
      <el-row :gutter="5" >

        <el-col :span="20">

          <el-col :span="4" name="docType" >

            <el-button style="display: block; width: 130px">产品listing文案</el-button>
            <el-button style="display: block;margin-left: 0px;width: 130px" >产品定义文档</el-button>
            <el-button style="display: block;margin-left: 0px;width: 130px" >认证文件</el-button>
            <el-button style="display: block;margin-left: 0px;width: 130px" >结构文件</el-button>
            <el-button style="display: block;margin-left: 0px;width: 130px" >立项资料</el-button>
            <el-button style="display: block;margin-left: 0px;width: 130px" >申述文件</el-button>
            <el-button style="display: block;margin-left: 0px;width: 130px" >其他</el-button>

          </el-col>

          <el-col :span="16" name="docList">
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            <el-upload
              class="upload-demo"
              multiple :limit="5"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture" style="height: auto">
            </el-upload>
          </el-col>
        </el-col>

        <el-col :span="4" name="option" style="padding: 230px 0px 0px 0px">
          <el-button>上传新文件</el-button>
          <el-button>下载</el-button>
          <el-button>删除</el-button>
        </el-col>

      </el-row>
    </div>
</template>

<script>
    export default {
        name: "Document",
      data(){
          return{
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
              {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],

          }
      },
      methods:{
        handleRemove(file, fileList){
          console.log(file, fileList);
        },
        handlePreview(file){
          console.log(file);
        }
      }
    }
</script>

<style scoped>

</style>
