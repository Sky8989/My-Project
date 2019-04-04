<template>


    <div id="ProductForm">
      <SearchBar ref="searchBar" @sendSearchResult="receiveProductInfo" @sendBUList="receiveBUList"></SearchBar>


      <el-form  :model="product" label-width="90px" :label-position="labelPosition"   style="border-radius: 4px;border: 2px solid #eee; padding: 1px 1px 1px 1px;">
        <!--顶栏容器-->
        <el-container >

          <input v-model="product.productId" hidden ></input>

          <el-main  >
            <el-row >
              <el-col :span="20" id="left">
                <el-row>
                  <el-col :span="5" >
                    <el-form-item label="型号:">
                      <el-input  v-model="product.productModelNumber" style="width: 180px"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="5" >
                    <el-form-item label="BU:">
                      <el-select v-model="product.businessUnitId"  placeholder="BU" style="width: 180px"   >
                        <el-option  v-for="bu in BUList" :key="bu.businessUnitId" :value="bu.businessUnitId" :label="bu.businessUnit"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="5" >
                    <el-form-item label="品牌:">
                      <el-select v-model="product.brandId"  placeholder="品牌"   >
                        <el-option v-for="brand in brandList" :key="brand.brandId" :value="brand.brandId" :label="brand.brandName"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="5" >
                    <el-form-item label="系列:">
                      <el-select v-model="product.productCategoryId"  placeholder="系列"   >
                        <el-option v-for="productCategory in productCategoryList" :key="productCategory.productCategoryId" :value="productCategory.productCategoryId" :label="productCategory.productCategory"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                  <el-col :span="5" >
                    <el-form-item label="长:">
                      <el-input-number controls-position="right" v-model="product.productLong" > </el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="5" >
                    <el-form-item label="体积:">
                      <el-input-number controls-position="right" v-model="product.productVolume"   > </el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="10" >
                    <el-form-item label="材质:">
                      <el-input  v-model="product.productMaterial" value="材质"  />
                    </el-form-item>
                  </el-col>
                </el-row>


                <el-row >

                  <el-col :span="5" >
                    <el-form-item label="宽:">
                      <el-input-number controls-position="right" v-model="product.productWidth" > </el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="5" >
                    <el-form-item label="毛重:">
                      <el-input-number controls-position="right" v-model="product.productGrossweight" > </el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="10" >
                    <el-form-item label="认证:">
                      <el-input  style="display:inline-block;" v-model="product.productCertification" />
                    </el-form-item>
                  </el-col>
                </el-row>


                <el-row >
                  <el-col :span="5" >
                    <el-form-item label="高:">
                      <el-input-number controls-position="right" v-model="product.productHeight" > </el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="5" >
                    <el-form-item label="净重:">
                      <el-input-number controls-position="right" v-model="product.productNetweight" > </el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="10" >
                    <el-form-item label="包装内含物:">
                      <el-input  style="display:inline-block;"  v-model="product.productPackageContains" />
                    </el-form-item>
                  </el-col>
                </el-row>


                <el-row>
                  <el-col :span="5" >
                    <el-form-item label="ODR:">
                      <el-input-number controls-position="right" v-model="product.productOrderDefect"  :step="0.01" > </el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="5" >
                    <el-form-item label="U8编码:">
                      <el-input-number controls-position="right" v-model="product.productU8Code" > </el-input-number>
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
                <el-input type="textarea" v-model="product.productDescriptionChs" :autosize="{minRows:4,maxRows:6}" placeholder="中文描述"></el-input>
                <el-input type="textarea" v-model="product.productDescriptionEn" :autosize="{minRows:4,maxRows:6}" placeholder="英文描述"></el-input>
              </el-col>

              <el-col :span="4" style="padding: 50px 120px 0px 0px">
                <el-button @click="submitProduct" >编辑/提交</el-button>
              </el-col>
            </el-row>
          </el-footer>


        </el-container>

      </el-form>
    </div>
</template>

<script>
  import SearchBar from "./SearchBar";

    export default {
        name: "ProductForm",
      components:{SearchBar},
      data(){
          return{
            labelPosition:'right',
            imageUrl:"",
            product:{
              brandId: 0,
              businessUnitId: 0,
              cTime: null,
              productCategoryId: 0,
              productCertification: "",
              productDescriptionChs: "",
              productDescriptionEn: "",
              productGrossweight: 0.0,
              productHeight: 0.0,
              businessUnit:'',
              businessUnitId:'',
              productId: 0,
              productLong: 0.0,
              productMaterial: "",
              productModelNumber: "",
              productNetweight: 0.0,
              productPackageContains: "",
              productVolume:0,
              productWidth: 0.0,
              status: 0,
              userId: 0,
              productU8Code: 0,
              productOrderDefect: 0.0,
            },
            BUList:[],
            brandList:[],             //所有品牌
            productCategoryList:[],   //所有产品系列
            businessUnitList:[]       //所有部门
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
        submitProduct(){
          console.log("保存产品")

          if(this.product.productId == null || this.product.productId == 0){
            this.$message("请先查询对应产品编辑后保存")
            return false;
          }
          console.log(this.product.productId)
          var url = this.HOST +"/product/update/" + this.product.productId



          this.axios.put(url,{
            productId: this.product.productId,
            productModelNumber: this.product.productModelNumber ,
            businessUnitId: this.product.businessUnitId,
            brandId: this.product.brandId,
            productCategoryId:this.product.productCategoryId ,
            productLong: this.product.productLong,
            productWidth: this.product.productWidth,
            productHeight: this.product.productHeight,
            productVolume: this.product.productVolume,
            productNetweight: this.product.productNetweight,
            productGrossweight: this.product.productGrossweight,
            productMaterial: this.product.productMaterial,
            productPackageContains: this.product.productPackageContains,
            productOrderDefect: this.product.productOrderDefect,
            productU8Code: this.product.productU8Code,
            productCertification: this.product.productCertification,
            productDescriptionChs: this.product.productDescriptionChs,
            productDescriptionEn: this.product.productDescriptionEn,
            userId: this.product.userId,

          }).then(res =>{
            if(res.data.code == "200"){
              this.$message({type: 'info', message: '保存成功'});
            }
          }).catch(error => {
            console.log(error)
          })
        },
        receiveProductInfo(data){
          //先清除数据
          this.product = null

          this.product = data.productDetails //产品信息
          this.brandList = data.brandList
          this.productCategoryList = data.productCategoryList
          this.businessUnitList = data.businessUnitList

          console.log("product save store")
          //将product对象存入到 store中
          this.$store.commit("setProduct",data.productDetails)



          //存在商品返回的是object类型 不存在返回string
          if(typeof(data) == "string"){
            this.$message(data);

            return
          }
        },receiveBUList(data){
          this.BUList = data
        }


      }
    }
</script>

<style scoped>

</style>
