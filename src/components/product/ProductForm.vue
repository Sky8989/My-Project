<template>
    <div id="ProductForm">
      <el-form  :model="product" label-width="90px" :label-position="labelPosition"   style="border-radius: 4px;border: 2px solid #eee; padding: 1px 1px 1px 1px;">
        <!--顶栏容器-->
        <el-container >

          <el-main  >
            <el-row >
              <el-col :span="20" id="left">
                <el-row>
                  <el-col :span="5" >
                    <el-form-item label="型号:">
                      <el-input  v-model="product.modelNumber" style="width: 180px"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="5" >
                    <el-form-item label="BU:">
                      <el-select v-model="product.BU"  placeholder="BU" style="width: 180px" ></el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="5" >
                    <el-form-item label="品牌:">
                      <el-select v-model="product.brand"  placeholder="品牌"  > </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="5" >
                    <el-form-item label="系列:">
                      <el-select v-model="product.category"  placeholder="系列"   ></el-select>
                    </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                  <el-col :span="5" >
                    <el-form-item label="长:">
                      <el-input-number controls-position="right" v-model="product.long" > </el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="5" >
                    <el-form-item label="体积:">
                      <el-input-number controls-position="right" v-model="product.volume"   > </el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="10" >
                    <el-form-item label="材质:">
                      <el-input  v-model="product.material" value="材质"  />
                    </el-form-item>
                  </el-col>
                </el-row>


                <el-row >

                  <el-col :span="5" >
                    <el-form-item label="宽:">
                      <el-input-number controls-position="right" v-model="product.width" > </el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="5" >
                    <el-form-item label="毛重:">
                      <el-input-number controls-position="right" v-model="product.grossweight" > </el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="10" >
                    <el-form-item label="认证:">
                      <el-input  style="display:inline-block;" v-model="product.certification" />
                    </el-form-item>
                  </el-col>
                </el-row>


                <el-row >
                  <el-col :span="5" >
                    <el-form-item label="高:">
                      <el-input-number controls-position="right" v-model="product.height" > </el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="5" >
                    <el-form-item label="净重:">
                      <el-input-number controls-position="right" v-model="product.netweight" > </el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="10" >
                    <el-form-item label="包装内含物">
                      <el-input  style="display:inline-block;"  v-model="product.packageContains" />
                    </el-form-item>
                  </el-col>
                </el-row>


                <el-row>
                  <el-col :span="5" >
                    <el-form-item label="ODR:">
                      <el-input-number controls-position="right" v-model="product.ODR"  :step="0.01" > </el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="5" >
                    <el-form-item label="U8编码:">
                      <el-input-number controls-position="right" v-model="product.U8Code" > </el-input-number>
                    </el-form-item>
                  </el-col>

                </el-row>

              </el-col>

              <!--居中操作-->
              <!--position:fixed;top:50%;left:80%;margin-left:-100px;margin-top:-150px;-->
              <el-col id="right" :span="4"  style=" padding: 100px 100px 0px 0px  ">
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

            <el-row>
              <el-col :span="20">
                <el-input  style="display:inline-block; width: 90px; float: left"  value="产品描述" />
                <el-input type="textarea" v-model="product.descriptionChs" :autosize="{minRows:4,maxRows:6}" placeholder="中文描述"></el-input>
                <el-input type="textarea" v-model="product.descriptionEn" :autosize="{minRows:4,maxRows:6}" placeholder="英文描述"></el-input>
              </el-col>

              <el-col :span="4" style="padding: 50px 120px 0px 0px">
                <el-button @submit="submit" >编辑/提交</el-button>
              </el-col>
            </el-row>
          </el-footer>


        </el-container>

      </el-form>
    </div>
</template>

<script>
    export default {
        name: "ProductForm",
      data(){
          return{
            labelPosition:'right',
            imageUrl:"",
            product:{
              modelNumber:'',
              BU:'',
              brand:'',
              category:'',
              long:'',
              volume:'',
              material:'',
              width:'',
              grossweight:'',
              certification:'',
              height:'',
              netweight:'',
              packageContains:'',
              ODR:'',
              U8Code:'',
              descriptionChs:'',
              descriptionEn:'',

            }
          }
      },
      methods:{
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
        submit(){
          console.log("保存产品")
        }

      }
    }
</script>

<style scoped>

</style>
