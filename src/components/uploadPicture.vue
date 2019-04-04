<template>
	<div class="uploadPicture">
		<a href="#" data-toggle="modal" data-target="#uploadPictureModal"><i class="fa fa-upload" ></i> 上传</a>
		<div class="modal fade" id="uploadPictureModal" tabindex="-1" role="dialog" aria-labelledby="uploadPictureModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		                <i class="fa fa-upload"></i> 上传图片
		            </div>
		            <div class="modal-body">
		            	<div class="row">
		            		<div class="col-md-12">
			            		<file-upload
						        	class="btn btn-sm btn-primary"
						        	v-bind:post-action="actionUrl"
						        	extensions="gif,jpg,jpeg,png"
						        	accept="image/png,image/gif,image/jpeg"
						        	:multiple="true"
						        	:size="1024 * 1024 * 10"
						        	v-model="files"
						        	@input-filter="inputFilter"
						        	@input-file="inputFile"
						        	ref="upload">
						          	<i class="fa fa-plus"></i>
						          	选择图片
						        </file-upload>
					        </div>
		            	</div>
		            	<div class="row">
		            		<span class = 'ml-5'>{{theImageNameStr}}</span>	
		            	</div>
		            </div>
		            <div class="modal-footer">
		            	<button type="button" class="btn btn-sm btn-success" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
				        	<i class="fa fa-arrow-up" aria-hidden="true"></i>
				        	开始上传
				        </button>
				        <button type="button" class="btn btn-sm btn-danger"  v-else @click.prevent="$refs.upload.active = false">
				        	<i class="fa fa-stop" aria-hidden="true"></i>
				        	终止上传
				        </button>
		            	<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal -->
		</div>
	</div>
</template>

<script>
	import FileUpload from 'vue-upload-component'
	export default{
		components:{
			FileUpload,
		},
		props: {
			projectId:0,
		},
		data() {
			return {
				files: [],
				timattServerUrl:'',
				actionUrl:'',
				theImageNameStr:'',
				theImageList:[],
			}
		},
		mounted: function() {
			this.init();
		},
		watch:{
		},
		methods: {
			init(){
				this.timattServerUrl = this.$root.timattHandlers;
				let proId = this.$parent.$route.query.projectId;
				this.actionUrl = this.timattServerUrl+'projectFile/upload/'+proId;
			},
			fileSuccess (rootFile, file, message, chunk) {
				console.log('complete', rootFile, file, message, chunk);
			},
			inputFilter(newFile, oldFile, prevent) {
				
				if (newFile && !oldFile) {
				// Before adding a file
		        // 添加文件前
		        // Filter system files or hide files
		        // 过滤系统文件 和隐藏文件
		        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
		          return prevent()
		        }
		        // Filter php html js file
		        // 过滤 php html js 文件
		        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
		          return prevent()
		        }
		      }
		    },
		    inputFile(newFile, oldFile) {
		    	let that = this;
		    	that.theImageNameStr = '';
		    	
		      if (newFile && !oldFile) {
		        // add
		        if(!that.theImageList.includes(newFile.name))that.theImageList.push(newFile.name);
		        that.theImageNameStr = that.theImageList.join('          ,');
		        
		      }
		      	if (newFile && oldFile) {
			        // update
					// 上传成功
		        	if (newFile.success !== oldFile.success) {
		          		$("#uploadPictureModal").modal("hide");
						that.initPicture();
		        	}
			        // 上传错误
		        	if (newFile.error !== oldFile.error) {
		          
		        	}
		      	}
		      if (!newFile && oldFile) {
		        // remove
//		        console.log('remove', oldFile)
		      }
		        	
		    },
		    initPicture(){
				this.$parent.initPicture();
			},
		}
	}
</script>

<style>
</style>