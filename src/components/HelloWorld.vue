<template>

  <div id="app">

    <el-row :gutter="10">
      <el-col :span="5"> <el-input value="产品基础信息" style="width:150px; float: left;"/> </el-col>
    </el-row>


    <el-row :gutter="10" id="search">
      <el-col :span="3"><el-select v-model="form.select1"  placeholder="Model/ASIN/SKU"> </el-select></el-col>
      &nbsp;&nbsp;
      <el-col :span="2"> <el-input value="aaa"  style="display:inline-block; width: 150px"  /></el-col>
      &nbsp;&nbsp;
      <el-col :span="3"><el-select v-model="form.select1"  placeholder="BU" > </el-select></el-col>
      &nbsp;
      <el-col :span="3"><el-select v-model="form.select1"  placeholder="系列" > </el-select></el-col>
      &nbsp;
      <el-col :span="3"><el-select v-model="form.select1"  placeholder="Model" > </el-select></el-col>
      &nbsp;
      <el-col :span="1"><el-button>查找</el-button></el-col>
    </el-row>



    <el-form id="form" ref="form" :model="form"   style="border-radius: 4px;border: 2px solid #eee; padding: 1px 1px 1px 1px;">
      <!--顶栏容器-->
      <el-container >
          <el-header style="height:3px;">
           <!-- <hr/>-->
          </el-header>

          <el-main id = "main1" >

            <el-row :gutter="10" id="context" justify="center">
              <el-col :span="20" id="left">

                <el-row :gutter="10" id = "1">
                  <el-col :span="3" >型号: <el-input  value=""  style="width: 120px; "/></el-col>
                  <el-col :span="5" :offset="1">BU: <el-select v-model="form.bu"  placeholder="BU" ></el-select></el-col>
                  <el-col :span="5" >品牌: <el-select v-model="form.pp"  placeholder="品牌" > </el-select></el-col>
                  <el-col :span="5" >系列: <el-select v-model="form.xl"  placeholder="系列"  size="medium" > </el-select></el-col>
                </el-row>
                <br/>

                <el-row :gutter="10" id = "2">

                  <el-col :span="4" >长：<el-input-number controls-position="right" v-model="form.c" > </el-input-number></el-col>
                  <el-col :span="4" >体积：<el-input-number controls-position="right" v-model="form.select2"   > </el-input-number></el-col>
                  <el-col :span="9" >材质：<el-input  style=" width: 420px"  value="材质"  /> </el-col>

                </el-row>
                <br/>

                <el-row :gutter="10" id = "3">

                  <el-col :span="4" >宽：<el-input-number controls-position="right" v-model="form.select4" > </el-input-number> </el-col>
                  <el-col :span="4" >毛重：<el-input-number controls-position="right" v-model="form.select5" > </el-input-number></el-col>
                  <el-col :span="9" >认证：<el-input  style="display:inline-block; width: 420px"  /></el-col>

                </el-row>
                <br/>

                <el-row :gutter="10" id = "4">

                  <el-col :span="4" >高：<el-input-number controls-position="right" v-model="form.select41" > </el-input-number></el-col>
                  &nbsp;
                  <el-col :span="4" >净重：<el-input-number controls-position="right" v-model="form.select15" > </el-input-number></el-col>
                  &nbsp;
                  <el-col :span="9" >包装内含物：<el-input  style="display:inline-block; width: 420px"  /></el-col>
                </el-row>
                <br/>

                <el-row :gutter="10" id = "5">

                  <el-col :span="4" >ODR：<el-input-number controls-position="right" v-model="form.select6"  :step="0.01" max="1" > </el-input-number></el-col>
                  <el-col :span="4" >U8：<el-input-number controls-position="right" v-model="form.select7" > </el-input-number></el-col>

                </el-row>

                <br/>

              </el-col>

              <!--居中操作-->
              <!--position:fixed;top:50%;left:80%;margin-left:-100px;margin-top:-150px;-->
              <el-col :span="4" id="right" style=" padding: 100px 100px 0px 0px  ">


                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

              </el-col>
          </el-row>

        </el-main>


          <el-footer id="footer" style="height: auto; padding: 0px 0px 5px 10px">

            <el-row :gutter="10">
              <el-col :span="18">
                <el-input  style="display:inline-block; width: 150px; float: left"  value="产品描述" />
                <br><br>
                <el-input type="textarea" v-model="form.zh" placeholder="中文描述"></el-input>
                <el-input type="textarea" v-model="form.us" placeholder="英文描述"></el-input>
              </el-col>

              <!--style="position:fixed;top:60%;left:70%;"-->
              <el-col :span="4" style="padding: 50px 120px 0px 0px">
                <el-button @submit="submit" >编辑/提交</el-button>
              </el-col>

            </el-row>

         </el-footer>


      </el-container>

    </el-form>

    <hr/>
    <br>

    <el-row :gutter="10"  >

      <el-col :span="24" >

        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="height: auto;">
          <el-tab-pane label="图片" name="first">

            <el-row :gutter="5" >
             <!-- <el-col :span="2">

              </el-col>-->

              <el-col :span="20">

                <el-col :span="3" name="imgType" >

                      <el-button style="display: block; width: 130px">橱窗图</el-button>
                      <el-button style="display: block;margin-left: 0px;width: 130px" >EBC</el-button>
                      <el-button style="display: block;margin-left: 0px;width: 130px" >品牌推广图</el-button>
                      <el-button style="display: block;margin-left: 0px;width: 130px" >实物图</el-button>
                      <el-button style="display: block;margin-left: 0px;width: 130px" >包装图片</el-button>
                      <el-button style="display: block;margin-left: 0px;width: 130px" >说明书图片</el-button>
                      <el-button style="display: block;margin-left: 0px;width: 130px" >其他</el-button>

                </el-col>

                <el-col :span="16" name="imgList">
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  <el-upload
                    class="upload-demo"
                    multiple :limit="5"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture-card" style="height: auto">

                  </el-upload>

                </el-col>

              </el-col>

              <el-col :span="4" name="option" style="padding: 230px 0px 0px 0px">
                <el-button size="" type="primary">上传图片</el-button>
                <el-button>下载</el-button>
                <el-button>删除</el-button>
              </el-col>


            </el-row>

          </el-tab-pane>

          <el-tab-pane label="文档" name="second">
            <el-row :gutter="5" >
              <!-- <el-col :span="2">

               </el-col>-->

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

          </el-tab-pane>
          <el-tab-pane label="负责人列表" name="third">
            <el-button style="float: left">新增</el-button>
            <el-table border="true" style="width: 100%">
              <el-table-column prop="date" label="国家" ></el-table-column>
              <el-table-column prop="date" label="产品类型" ></el-table-column>
              <el-table-column prop="date" label="ASIN" ></el-table-column>
              <el-table-column prop="date" label="所属BU" ></el-table-column>
              <el-table-column prop="date" label="运营组别" ></el-table-column>
              <el-table-column prop="date" label="运营负责人" ></el-table-column>
              <el-table-column prop="date" label="记录人" ></el-table-column>
              <el-table-column prop="date" label="更新时间" ></el-table-column>
              <el-table-column prop="date" label="备注" ></el-table-column>
              <el-table-column prop="date" label="编辑" ></el-table-column>
            </el-table>

          </el-tab-pane>
          <el-tab-pane label="listing事件记录" name="fourth">

          </el-tab-pane>
          <el-tab-pane label="供应商" name="5">

          </el-tab-pane>
          <el-tab-pane label="物流费用" name="6">

          </el-tab-pane>
          <el-tab-pane label="编码信息表" name="7">

          </el-tab-pane>
          <el-tab-pane label="其他" name="8">

          </el-tab-pane>
        </el-tabs>

      </el-col>

    </el-row>




  </div>






</template>


<!-- 引入element-ui js组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.6.0/lib/index.js"></script>


<script>
  export default {
  name: 'HelloWorld',
  data () {
    return {
      activeName: 'first',
      border:true,
      dialogImageUrl: '',
      dialogVisible: false,
      imageUrl:"",
      form: {
        select1: '',
        name: '名称',
        region: 'shanghai',
        date1: '',
        date2: '',
        delivery: true,
        type: [],
        resource: '',
        desc: '',
        bu:"",
      },
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}

        ]

    }
  },


  methods: {

    formatter(row, column) {
      return row.date;
    },
    filterAge(value, row) {
      /* 过滤年龄这列 值相等 过滤*/
      return row.age === value;
      // return row.age;
    },
    submit(){

    },
    beforeAvatarUpload(){

    },
    handleAvatarSuccess(){

    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      /*if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }*/
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }

  }
}

/*var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')*/



</script>


<!-- 引入 element-ui 样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<style >


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

<style scoped>
  .block {
    display: block;
  }

  .el-button+.el-button {
    margin-left: 0px;
  }

</style>
