<template>

  <div id="app">

    <el-row :gutter="20">
      <el-col :span="5"> <el-input value="产品基础信息" style="width:150px; float: left;"/> </el-col>
    </el-row>
    <br/>

    <el-row :gutter="20" id="search">
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

    <el-form ref="form" :model="form" label-width="80px" >

          <!--style="float: left"-->


      <!--顶栏容器-->
      <el-container>
          <el-header style="height:3px;">
            <hr/>
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

                  <el-col :span="4" >长：<el-input-number v-model="form.c" > </el-input-number></el-col>
                  <el-col :span="4" >体积：<el-input-number v-model="form.select2"   > </el-input-number></el-col>
                  <el-col :span="9" >材质：<el-input  style=" width: 420px"  value="材质"  /> </el-col>

                </el-row>
                <br/>

                <el-row :gutter="10" id = "3">

                  <el-col :span="4" >宽：<el-input-number v-model="form.select4" > </el-input-number> </el-col>
                  <el-col :span="4" >毛重：<el-input-number v-model="form.select5" > </el-input-number></el-col>
                  <el-col :span="9" >认证：<el-input  style="display:inline-block; width: 420px"  /></el-col>

                </el-row>
                <br/>

                <el-row :gutter="10" id = "4">

                  <el-col :span="4" >高：<el-input-number v-model="form.select4" > </el-input-number></el-col>
                  &nbsp;
                  <el-col :span="4" >净重：<el-input-number v-model="form.select5" > </el-input-number></el-col>
                  &nbsp;
                  <el-col :span="9" >包装内含物：<el-input  style="display:inline-block; width: 420px"  /></el-col>
                </el-row>
                <br/>

                <el-row :gutter="10" id = "5">

                  <el-col :span="4" >ODR：<el-input-number v-model="form.select4" > </el-input-number></el-col>
                  <el-col :span="4" >U8：<el-input-number v-model="form.select5" > </el-input-number></el-col>

                </el-row>

                <br/>

              </el-col>

              <!--居中操作-->
              <el-col :span="4" id="right" style="position:fixed;top:50%;left:80%;margin-left:-100px;margin-top:-150px; ">


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


          <el-footer id="footer">

            <el-row :gutter="10">
              <el-col :span="18">
                <el-input  style="display:inline-block; width: 150px;float: left"  value="产品描述" />
                <br><br>
                <el-input type="textarea" v-model="form.zh" placeholder="中文描述"></el-input>
                <el-input type="textarea" v-model="form.us" placeholder="英文描述"></el-input>
              </el-col>

              <el-col :span="4" style="position:fixed;top:60%;left:70%;">
                <el-button @submit="submit" >编辑/提交</el-button>
              </el-col>

            </el-row>

         </el-footer>


      </el-container>


      <!--外层容器。-->
     <!--<el-container>
        <el-header>
          <el-form-item label="活动名称">
        &lt;!&ndash;  <span>&ndash;&gt;
            <el-select v-model="form.select1"  placeholder="Model/ASIN/SKU"> </el-select>
            &nbsp;
            <el-input autosize="" v-model="form.name" style="display:inline-block; width: 150px"  />
            &nbsp;
            <el-select v-model="form.select1"  placeholder="BU" > </el-select>
            &nbsp;
            <el-select v-model="form.select1"  placeholder="系列" > </el-select>
            &nbsp;
            <el-select v-model="form.select1"  placeholder="Model" > </el-select>
            &nbsp;
            <el-button>查找</el-button>
            &lt;!&ndash;</span>&ndash;&gt;
          </el-form-item>
        </el-header>



        <el-form-item>
        &lt;!&ndash;侧边栏容器&ndash;&gt;
          <el-aside style="width: 50%; " class="left">

            <div id="1" >
              <el-input autosize="" value="型号" style="display:inline-block; width: 100px"  />
              &nbsp;
              <el-select v-model="form.Bu"  placeholder="BU" > </el-select>
              &nbsp; &nbsp;
              <el-select v-model="form.pp"  placeholder="品牌" > </el-select>
              &nbsp; &nbsp;
              <el-select v-model="form.xl"  placeholder="系列" > </el-select>
            </div><br/>


            <div id="2" >
              <span>长：</span><el-input-number v-model="form.c" > </el-input-number>
              &nbsp; &nbsp;
              <span>体积：</span><el-input-number v-model="form.select2"   > </el-input-number>
              &nbsp;
              <span>材质：</span><el-input  style="display:inline-block; width: 150px"  />
            </div><br/>

            <div id="3">
            &lt;!&ndash;  <el-input autosize="" value="宽度" style="display:inline-block; width: 150px"  />&ndash;&gt;

              <span>宽：</span><el-input-number v-model="form.select4" > </el-input-number>
              &nbsp; &nbsp;
              <span>毛重：</span><el-input-number v-model="form.select5" > </el-input-number>
              &nbsp; &nbsp;
              <span>认证：</span><el-input  style="display:inline-block; width: 150px"  />
            </div><br/>

            <div id="4">
             &lt;!&ndash; <el-input autosize="" value="宽度" style="display:inline-block; width: 150px"  />
  &ndash;&gt;
              <span>宽：</span><el-input-number v-model="form.select4" > </el-input-number>
              &nbsp;
              <span>净重：</span><el-input-number v-model="form.select5" > </el-input-number>
              &nbsp;
              <span>包装内含物：</span><el-input  style="display:inline-block; width: 150px"  />
            </div><br/>
          </el-aside>


          &lt;!&ndash;主要区域容器&ndash;&gt;
          <el-main style=" width: 20%;  " class="right" >


            <div  style="display:inline-block; float: right;  ">

              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

            </div>
          </el-main>
        </el-form-item>


        <el-form-item style="width: 60%">
          <el-footer >
            <el-input  style="display:inline-block; width: 150px;float: left"  value="产品描述" />
            <br><br>

            <el-col>
            <el-input type="textarea" v-model="form.zh" >中文描述</el-input>
            <el-input type="textarea" v-model="form.us" >英文描述</el-input>
            </el-col>

            <el-button @submit="submit" >提交</el-button>
          </el-footer>
        </el-form-item>



      </el-container>-->






      <!--<el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>-->


      </el-form>
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

      }

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
    }

  }
}

/*var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')*/



</script>


<!-- 引入 element-ui 样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
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
