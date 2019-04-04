<template>
	<div class="container-fluid">
		<ol class="breadcrumb">
		    <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
		    <li class="breadcrumb-item active">Customers</li>
		    <li class="breadcrumb-item active">Edayun Sku</li>
		</ol>
		<div>
			<div id="toolbar">
				<button class="btn btn-primary" @click="edayunSkuModalShow">Create</button>
			</div>
			<table id="edayunSkuTable"></table>
			<div class="modal fade" id="edayunSkuModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		      <div class="modal-dialog">
		        <div class="modal-content">
			        <div class="modal-header">
			          	<h4 class="modal-title">Edayun Sku</h4>
			            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		            </div>
		         	<div class="modal-body">
			            <div class="row">
			             	<div class="col-lg-12">
			             		<div class="input-group marginRow">
			             			<span class="col-lg-5 marginAuto" aria-label="...">EdayunSku : </span>
			             			<input type="text" placeholder="Enter Edayun Sku" v-model="edayunSkuName">
			             		</div>
			             		<div class="input-group marginRow">
			             			<span class="col-lg-5 marginAuto" aria-label="...">Country : </span>
			             			<select class="selectpicker" v-model="selectedCountry"  data-live-search="true" title="Select Product" id="countrySelect">
				             			<option v-for=" country in baseData.countries" :key="country.countryId" :value="country.countryId">{{country.countryName}}</option>
				             		</select>
			             		</div>
			             		<div class="input-group marginRow">
			             			<span class="col-lg-5 marginAuto" aria-label="...">Product : </span>
			             			<select class="selectpicker" v-model="selectedProductId"  data-live-search="true" title="Select Product" id="productSelect">
				             			<option v-for=" product in productList" :key="product.productId" :value="product.productId">{{product.productSku}}</option>
				             		</select>
			             		</div>
			             		
			             	</div>
			            </div>
		      		</div>
		         	<div class="modal-footer">
		         		<button type="button" class="btn btn-primary" @click="updateSku" v-show="isUpdate">Update</button>
		           		<button type="button" class="btn btn-primary" @click="comfirmSku" v-show="!isUpdate">Ok</button>
		           		<button type="button" class="btn" data-dismiss="modal">Cancel</button>
		         	</div>
		        </div>
		        <!-- /.modal-content -->
		      </div>
	    </div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import axios from 'axios'
	export default{
		data(){
			return {
				baseData:this.$store.state.baseData,
				token:"",
				serverUrl:this.$store.state.baseData.pageHandlers,
				axiosRequest:this.$root.axiosRequest,
				selectedCountry:"",
				selectedProductId:"",
				productList:this.$store.state.products,
				edayunSkuName:"",
				asinId:"",
				isUpdate:false,
				edaYunSkuId:"",
				status:"",
			}
		},
		methods:{
			init(){
				let that = this;
				console.log(this.productList)
				this.token = this.baseData.userInfo.token;
				Vue.nextTick(function(){
					$('.selectpicker').selectpicker();
					that.initEdayunSkuTable();
				})
			},
			initEdayunSkuTable(){
				let that = this;
				that.axiosRequest("get","edaYunAsinSku/getAll","",that.token,function(res){
					let tableData = res;
					$("#edayunSkuTable").bootstrapTable('destroy');
					$("#edayunSkuTable").bootstrapTable({
						pageSize:10,
						pagination:true,
						search:true,
						toolbar:"#toolbar",
						columns:[
						{
							field:"edaYunSku",
							title:"Edayun Sku",
							align:"center"
						},{
							field:"productId",
							title:"Sku",
							align:"center",
							formatter:function(value){
								for( let product of that.productList ){
									if(product.productId == value){
										return product.productSku
									}
								}
							}
						},{
							field:"countryId",
							title:"Country",
							align:"center",
							formatter:function(value){
								for( let country of that.baseData.countries ){
									if( country.countryId == value){
										return country.countryName
									}
								}
							}
						},{
							title:"Operation",
							align:"center",
							formatter:function(value,row){
								let button = "<button class='btn btn-primary edit'>Edit</button><button class='delete btn btn-danger' style='margin-left:2px'>Delete</button>"
								return button
							},
							events:{
								"click .edit":function(e,value,row){
									that.isUpdate = true;
									$("#countrySelect").selectpicker("val",row.countryId);
									$("#productSelect").selectpicker("val",row.productId);
									that.edaYunSkuId = row.edaYunSkuId;
									that.edayunSkuName = row.edaYunSku;
									that.status = row.status;
									that.asinId = row.asinId;
									$("#edayunSkuModal").modal("show");
								},
								"click .delete":function(e,value,row){
									let deleteId = row.edaYunSkuId;
									that.axiosRequest("delete","edaYunAsinSku/deleteAsinSku?idList="+deleteId,"",that.token,function(){
										that.initEdayunSkuTable();
									})
								}
							}
						}],
						data:tableData
					})
				})
			},
			edayunSkuModalShow(){
				$('.selectpicker').selectpicker("val","");
				this.edayunSkuName = "";
				this.isUpdate = false;
				this.asinId = "";
				$("#edayunSkuModal").modal("show")
			},
			comfirmSku(){
				let that = this;
				let requestData = {
					"asin": this.asinId,
					"countryId": this.selectedCountry,
					"edaYunSku": this.edayunSkuName,
					"edaYunSkuId": 1,
					"productId": this.selectedProductId,
					"status": 1
				}
				this.axiosRequest("post","edaYunAsinSku/addAsinSku",data,this.token,function(){
					that.initEdayunSkuTable();
				})
			},
			updateSku(){
				let that = this;
				let requestData = {
					"asin": this.asinId,
					"countryId": this.selectedCountry,
					"edaYunSku": this.edayunSkuName,
					"edaYunSkuId": this.edaYunSkuId,
					"productId": this.selectedProductId,
					"status": this.status
				}
				that.axiosRequest("put","edaYunAsinSku/updateAsinSku",requestData,that.token,function(){
					that.initEdayunSkuTable();
					$("#edayunSkuModal").modal('hide');
				})
			}
		},
		mounted(){
			this.init();
		},
		watch:{
			
		},
		computed:{

		}
	}
</script>

<style type="text/css">
	.marginRow{
		margin:10px;
	}
	.bootstrap-select{
		width:220px !important;
	}
	input{
		width: 220px;
		padding-left: 10px;
	}
</style>