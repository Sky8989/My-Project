<template>
	<div id="hijackerMainDiv" class="container-fluid">
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="#">Home</a></li>
			<li class="breadcrumb-item active">Inventory</li>
			<li class="breadcrumb-item active">Supplier Inventory</li>
		</ol>
		<iframe id="rfFrame" name="rfFrame" src="about:blank" style="display:none;"></iframe>
		<div class="row row-margin ">
			<div class="col-lg-12">
				<div class="nav nav-tabs" >
						<a class="nav-item nav-link active" data-toggle="tab" href="#forReplenish" @click="">
							<b>Replenish Units</b>
						</a>
						<!--<a class="nav-item nav-link" data-toggle="tab" href="#orderStatistics" id='statisticAnchorId' @click="">
							<b>Supplier Order</b>
						</a>
						<a class="nav-item nav-link" data-toggle="tab" href="#supplementDetail" id='detailAnchorId' @click="">
							<b>Order Product</b>
						</a>
						<a class="nav-item nav-link" data-toggle="tab" href="#itemReceived" @click="">
							<b>Item Received</b>
						</a>-->
				</div>
				<div class="tab-content " style='width:100%;'>

					<div class="tab-pane in active card-body" id="forReplenish">
						<div class="col-lg-12" style='display:inline;'>

							<select id="selectForReplenishBrand" class="selectpicker" v-model="selectedBrandsIds" data-live-search="true" title="Select Seller" multiple data-selected-text-format="count > 2" data-actions-box="true">
								<option v-for="seller in userBrandsList" :key="seller.brandId" :value="seller.brandId">{{seller.brandName}}</option>
							</select>

							<select  id="selectCountry" class="selectpicker"  v-model="selectedCountrys" data-live-search="true" title="Select Country" multiple data-selected-text-format="count > 2" data-actions-box="true">
							  	<option v-for="country in countryList" :key="country.countryId" :value="country.countryId">{{country.countryName}}</option>
							</select>
							<select id="selectBusinessUnitId" class="selectpicker" v-model="selectedBuUnitId" title="Select BU" >
								<option v-for="fbu in financeBusinessUnitList" :key="fbu.businessUnitId" :value="fbu.businessUnitId">{{fbu.businessUnitName}}</option>
							</select>

							<div style='display:inline-block;'>
								<span style = 'margin-left: 45px;'>Date For Timepoint  :</span>
								<input type="text" v-model="selectDate" id='point_date_id' class="datepick form-control" style="display:inline;width:auto" @change="chooseDate" />
								<select id="selectTimepoint" class="selectpicker"v-model="selectedTimepoint" title="Select timepoint">
									<option v-for="time in timepointList" :key="time" :value="time">{{time}}</option>
								</select>
							</div>
							<input type="text" v-model="selectedSupplierCreateDate" class="supplyCreateDatepick form-control" style="display:inline;width:auto;margin-left: 22px;" />
						</div>
						<div id="forReplenish-btn-div" style='margin-top: 17px;margin-bottom: 10px;margin-left: 15px;'>
							<select id="selectForReplenishAvgSeller" class="selectpicker" v-model="selectedBrandAvgBrandIds" data-live-search="true" title="AVG Seller" multiple data-selected-text-format="count > 2" data-actions-box="true">
								<option v-for="seller in userBrandsList" :key="seller.brandId" :value="seller.brandId">{{seller.brandName}}</option>
							</select>
							<select style='margin-left:13px' id="selectForReplenishAvgCountry" class="selectpicker"  v-model="selectedBrandAvgCountrys" data-live-search="true" title="AVG Country" multiple data-selected-text-format="count > 2" data-actions-box="true">
							  	<option v-for="country in countryList" :key="country.countryId" :value="country.countryId">{{country.countryName}}</option>
							</select>
							<!--<span style="display:inline;width:auto;" >Sales Units Date Point:</span> 因同步库存信息-->
							<input type="text" v-model="selectedByBrandAvgDate" class="brandAvgDatepick form-control" style="display:inline;width:auto;margin-left: 22px;" />

							<button style="display:inline;width:auto;margin-left: 15px;" class="btn btn-primary" @click="searchAmzSupplierInventory">Submit</button>
							<button style='margin-left:10px' id="supplierDownload" class="btn btn-sm btn-default" @click="download_supplier()">
								<i class="fa fa-fw fa-cloud-download"></i>
								Download
							</button>

							<div style='display:none;'>
							    <form action="http://bison.leaderment.com/bison-web/amzSupplierImport/updateByFile" method="post" enctype="multipart/form-data" onsubmit="return true;" target='rfFrame' >
							    <!--<form action="http://localhost:8062/bison-web/amzSupplierImport/updateByFile" method="post" enctype="multipart/form-data" onsubmit="return true;" target='rfFrame'>-->
							         <div style="margin: 30px;">
							         	<input id="uploadApply_stoExcel" type="file" name="filename" accept="xlsx" size="80" @change="confirm_select_apply_store" />
							         	<input id="start_import_apply_store_data" type="submit" value="导入Excel"/>
							         </div>
							     </form>

							     <form action="http://bison.leaderment.com/bison-web/amzSupplierImport/updateLocalInventoryByFile"
							     	 method="post" enctype="multipart/form-data" onsubmit="return true;" target='rfFrame' id='localInventory_form' >
							    <!--<form action="http://localhost:8062/bison-web/amzSupplierImport/updateLocalInventoryByFile" method="post"
							    			enctype="multipart/form-data" onsubmit="return true;" target='rfFrame' id='localInventory_form'>-->
							         <div style="margin: 30px;">
							         	<input id="uploadLocalInventorytoExcel" type="file" name="filename" accept="xlsx" size="80" @change="hasCheckTheFile(this)" />
							         	<input id="start_import_Local_inventory" type="submit" value="导入Excel"/>
							         </div>
							     </form>
							</div>
							<button id="uploadApply_store_btn" class="btn btn-sm btn-default" @click="uploadApplyExcel_store_fun()" v-show='roleId==1 || roleId==3'>
								<i class="fa fa-fw fa-cloud-upload"></i>
								Upload Purchase Message
							</button>
							<button id="uploadlocalInventory_btn" class="btn btn-sm btn-default" @click="uploadlocalInventory_fun()" v-show='roleId==1 || roleId==3'>
								<i class="fa fa-fw fa-cloud-upload"></i>
								Upload Local Inventory
							</button>
						</div>
						<div class="row col-lg-12">
							<v-table is-horizontal-resize
							 style="width:100%"
							 is-vertical-resize
							 :vertical-resize-offset='70'
							 :columns="replenishColumns"
							 :table-data="displayInventorydata"
							 even-bg-color="#f4f4f4"
							 row-hover-color="#eee"
							 row-click-color="#edf7ff"
							 :cell-edit-done="replenishCellEditDone"
							 >
							</v-table>
						</div>
					</div>
					<div class="tab-pane card-body" id='orderStatistics'>
						<div class="col-lg-12" style='display:inline;' v-show = 'itemShowStatistic == "hide"'>

							<select id="selectStatisticsSupplier" class="selectpicker" v-model="selectedStatisticsSupplier" data-live-search="true"
								title="Select Supplier" multiple data-selected-text-format="count > 2" data-actions-box="true">
								<option v-for="suppli in allSupplier" :key="suppli.supplierId" :value="suppli.supplierId">{{suppli.supplierName}}</option>
							</select>

							<select  id="selectStatisticsCurrency" class="selectpicker"  v-model="selectedStatisticsCurrency" data-live-search="true"
								title="Select Currency" multiple data-selected-text-format="count > 2" data-actions-box="true">
							  	<option v-for="tax in allCurrency" :key="tax.texTypeId" :value="tax.texTypeId">{{tax.texType}}</option>
							</select>
							<span class="custom-control custom-checkbox ml-3" style='display:inline-block;'>
							    <input class="custom-control-input" type="checkbox" id="isStatisticValidId" checked/>
							    <label class="custom-control-label" for="isStatisticValidId">Valid</label>
							</span>

							<div style='display:none;'>
							    <form action="http://bison.leaderment.com/bison-web/supplierOrderImport/updateByFile" method="post" enctype="multipart/form-data" onsubmit="return true;" target='rfFrame' >
							    <!--<form action="http://localhost:8062/bison-web/supplierOrderImport/updateByFile" method="post" enctype="multipart/form-data" onsubmit="return true;" target='rfFrame'>-->
							         <div style="margin: 30px;">
							         	<input id="uploadOrderStatistics_stoExcel" type="file" name="filename" accept="xlsx" size="80" @change="confirm_selectOrderStatistics" />
							         	<input id="start_importOrderStatisticsData" type="submit" value="ImportExcel"/>
							         </div>
							     </form>
							</div>

							<button style="display:inline;width:auto;margin-left: 15px;" class="btn btn-primary" @click="searchStatisticList" id='searchStatisticListId'>Submit</button>
							<button id="upload_orderStatisticsbtn" class="btn btn-sm btn-default" @click="uploadExcel_orderStatistics_fun()" v-show= 'displayPriceOrNot' >
								<i class="fa fa-fw fa-cloud-upload"></i>
								Upload Order Message
							</button>

						</div>
						<div style="float: right;display:inline; margin-right: 30px;" v-show = 'itemShowStatistic == "hide"' >
							<button class="btn btn-success" @click="addStatisticLine" v-show = 'displayPriceOrNot'>Add Row</button>
						</div>
						<div class="row col-lg-12" style='margin-top:10px;width:auto;' id = 'statistic_table_div_id' v-show = 'itemShowStatistic == "hide"'>
							<v-table is-horizontal-resize
								 style="width:100%"
								 is-vertical-resize
								 :vertical-resize-offset='70'
								 :columns="statisticColumns"
								 :table-data="displayStatisticData"
								 even-bg-color="#f4f4f4"
								 row-hover-color="#eee"
								 row-click-color="#edf7ff"
								 :cell-edit-done="statisticsCellEditDone"
								 @on-custom-comp="statisticOperationFunction"
								 >
							</v-table>
						</div>

						<div class="col-lg-12" v-show = 'itemShowStatistic == "show"'>
							<button class="btn btn-default col-lg-1" @click="backToStatistic" style = 'display: inline-block; margin-bottom: 10px;'>Back</button>
							<table class=" col-lg-8 table table-bordered" style='width:80%;text-align: center;' >
								<tr>
									<td><span class="statistic_row_inDetail">Order No.</span></td>
									<td><span class="statistic_row_inDetail" >Order Date</span></td>
									<td><span class="statistic_row_inDetail" >Currency</span></td>
									<td><span class="statistic_row_inDetail" >Supplier</span></td>
									<td><span class="statistic_row_inDetail" >Valid</span></td>
									<td><span class="statistic_row_inDetail" >Remark</span></td>
								</tr>
								<tr>
									<td><span class="statistic_row_inDetail">{{public_row_orderId}}</span></td>
									<td><span class="statistic_row_inDetail">{{statistic_row_orderDate}}</span></td>
									<td><span class="statistic_row_inDetail">{{statistic_row_currency_texType}}</span></td>
									<td><span class="statistic_row_inDetail">{{statistic_row_supplier_name}}</span></td>
									<td><span class="statistic_row_inDetail">{{statistic_row_valid==1?'Yes':'No' }}</span></td>
									<td><span class="statistic_row_inDetail">{{statistic_row_remark}}</span></td>
								</tr>
							</table>
						</div>
						<div style="float: right;display:inline; margin-right: 30px; margin-bottom: 20px;" v-show = 'itemShowStatistic == "show"' >
							<button class="btn btn-success" @click="addDetailLine" v-show = 'displayPriceOrNot'>Add Detail</button>
						</div>
						<div class="row col-lg-12" style='margin-top: 10px;' id = 'item_table_div_id' v-show = 'itemShowStatistic == "show"' >
							<v-table is-horizontal-resize
							 style="width:100%"
							 is-vertical-resize
							 :vertical-resize-offset='70'
							 :columns="itemColumns"
							 :table-data="displayItemData"
							 even-bg-color="#f4f4f4"
							 row-hover-color="#eee"
							 row-click-color="#edf7ff"
							 :cell-edit-done="detailCellEditDone"
							 @on-custom-comp="detailOperationFunction"
							 >
							</v-table>
						</div>
					</div>


					<div class="tab-pane card-body" id='supplementDetail'>
						<div class="col-lg-12" style='display:inline;'>
							<select id="selectDetailProductIds" class="selectpicker" multiple data-selected-text-format="count > 2" data-actions-box="true"
									v-model="selectedDetailProductIds" data-live-search="true" title="Select ProductId">
							  	<option v-for="product in productList" :key="product.productId" :value="product.productId">{{product.productSku}}</option>
							</select>

							<select id="selectDetailSupplier" class="selectpicker" v-model="selectedDetailSupplier" data-live-search="true"
								title="Select Supplier" multiple data-selected-text-format="count > 2" data-actions-box="true" >
								<option v-for="suppli in allSupplier" :key="suppli.supplierId" :value="suppli.supplierId">{{suppli.supplierName}}</option>
							</select>

							<select  id="selectDetailCurrency" class="selectpicker"  v-model="selectedDetailCurrency" data-live-search="true"
								title="Select Currency" multiple data-selected-text-format="count > 2" data-actions-box="true" >
							  	<option v-for="tax in allCurrency" :key="tax.texTypeId" :value="tax.texTypeId">{{tax.texType}}</option>
							</select>

							<span class="custom-control custom-checkbox ml-3" style='display:inline-block;'>
							    <input class="custom-control-input" type="checkbox" id="isDetailValidId" checked/>
							    <label class="custom-control-label" for="isDetailValidId">Valid</label>
							</span>

							<button style="display:inline;width:auto;margin-left: 15px;" class="btn btn-primary" @click="searchDetailList">Submit</button>
						</div>
						<div class="row col-lg-6" style='margin-top: 10px;' id = 'detail_total_table_div_id'>
							<v-table is-horizontal-resize
							 style="width:100%"
							 is-vertical-resize
							 :vertical-resize-offset='70'
							 :columns="totalColumns"
							 :table-data="displayTotalData"
							 even-bg-color="#f4f4f4"
							 row-hover-color="#eee"
							 row-click-color="#edf7ff"
							 >
							</v-table>
						</div>
						<div class="row col-lg-12" style='margin-top: 10px;' id = 'detail_table_div_id'>
							<v-table is-horizontal-resize
							 style="width:100%"
							 is-vertical-resize
							 :vertical-resize-offset='70'
							 :columns="detailColumns"
							 :table-data="displayDetailData"
							 even-bg-color="#f4f4f4"
							 row-hover-color="#eee"
							 row-click-color="#edf7ff"
							 :cell-edit-done="detailCellEditDone"
							 @on-custom-comp="detailOperationFunction"
							 >
							</v-table>
						</div>
					</div>

					<div class="tab-pane card-body" id='itemReceived'>
						<div class="col-lg-12" style='display:inline;'>
							<select id="selectReceivedSupplierIds" class="selectpicker" v-model="selectedReceivedSupplierIds" data-live-search="true"
								title="Select OrderIds" multiple data-selected-text-format="count > 2" data-actions-box="true" >
								<option v-for="itm in allSupplier" :key="itm.supplierId" :value="itm.supplierId">{{itm.supplierName}}</option>
							</select>

							<select  id="selectReceivedProducts" class="selectpicker"  v-model="selectedReceivedProductIds" data-live-search="true"
								title="Select ProductIds" multiple data-selected-text-format="count > 2" data-actions-box="true" >
							  	<option v-for="pro in productList" :key="pro.productId" :value="pro.productId">{{pro.productSku}}</option>
							</select>
							<button style="display:inline;width:auto;margin-left: 15px;" class="btn btn-primary" @click="searchReceivedList">Submit</button>
						</div>
						<div style="float: right;display:inline; margin-right: 30px;">
							<button class="btn btn-success" @click="addReceivedLine" v-show = 'displayPriceOrNot' >Add Received Item</button>
						</div>
						<div class="row col-lg-12" style='margin-top: 10px;' id = 'received_table_div_id'>
							<v-table is-horizontal-resize
							 style="width:100%"
							 is-vertical-resize
							 :vertical-resize-offset='70'
							 :columns="receivedColumns"
							 :table-data="displayReceivedData"
							 even-bg-color="#f4f4f4"
							 row-hover-color="#eee"
							 row-click-color="#edf7ff"
							 :cell-edit-done="detailCellEditDone"
							 @on-custom-comp="receivedOperationFunction"
							 >
							</v-table>
						</div>
					</div>


				</div>
			</div>
		</div>


		<div class="modal fade" id="uploadLocalInventoryModel"  role="dialog" aria-labelledby="uploadLocalInventoryModel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
			          	<h4 class="modal-title">Upload Local Inventory </h4>
			            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		            </div>
		            <div class="modal-body">
			            <div class="row">
			             	<div class="col-lg-12">
			             		<div class="input-group" style="margin:10px" >
				                	<span class="col-lg-5 ">Date:</span>
									<input type="text" v-model="localInventoryDate" id='localInventoryDateId'
									 	class="datepick form-control" style="display:inline;width:auto" />
								</div>
								<div class="input-group" style="margin:10px" >
				                	<span class="col-lg-5 ">File:</span>
									<button id="importLocalInFile" class="btn btn-sm btn-default" @click="comfirmUploadLocalInventory()" >
										<i class="fa fa-fw fa-cloud-upload"></i>
										Select File
									</button>
								</div>
								<div class="input-group" style="margin:10px" >
									<span v-show='selectLocalInventoryOrNot' style='margin-left:25px;margin-top:10px;' >{{localInventoryFileDir}}</span>
								</div>
			             	</div>
			            </div>
		      		</div>
		      		<div class="modal-footer">
		           		<button type="button" class="btn btn-primary" @click="confirm_select_import_local_inventory" data-dismiss="modal">Upload</button>
		           		<button type="button" class="btn" data-dismiss="modal">Cancel</button>
		         	</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="addSupplementsDetailModel"  role="dialog" aria-labelledby="addSupplementsDetailModel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
			          	<h4 class="modal-title">Add Supplement Detail</h4>
			            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		            </div>
		            <div class="modal-body">
			            <div class="row">
			             	<div class="col-lg-12">
			             		<div class="input-group" style="margin:10px" >

									<span class="col-lg-3 " style = 'text-align: right;'>Model:</span>
									<div class="col-lg-8 " style = 'display: inline-block;'>
										<select id="selectDetailProduct" class="selectpicker" style = 'width :100%;'
															v-model="detail_row_model" data-live-search="true" title="Select Product">
										  	<option v-for="product in productList" :key="product.productId" :value="product.productId">{{product.productSku}}</option>
										</select>
									</div>
			             		</div>
			             		<div class="input-group" style="margin:10px" >

			             			<span class="col-lg-3 " style = 'text-align: right;'>Order Date:</span>
			             			<span class="col-lg-6 " style = 'text-align: right;'>{{detail_row_orderDate}}</span>
			             		</div>
			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 " style = 'text-align: right;'>Quantity:</span>
									<input type="text" v-model="detail_row_quantity" class="form-control col-lg-6" placeholder="Please enter the number" />
			             		</div>

			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 " style = 'text-align: right;'>Price:</span>
									<input type="text" v-model="detail_row_price" class="form-control col-lg-6" placeholder="Please enter the float" />
			             		</div>

			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 " style = 'text-align: right;'>Currency:</span>
									<span class="col-lg-6 " style = 'text-align: right;'>{{detail_row_currency_texType}}</span>
			             		</div>

			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 " style = 'text-align: right;'>Supplier:</span>
									<span class="col-lg-6 " style = 'text-align: right;'>{{detail_row_supplier_name}}</span>
			             		</div>
			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 ">Order No.:</span>
				                	<span class="col-lg-6 " style = 'text-align: right;' >{{public_row_orderId}}</span>
			             		</div>
			             		<!--<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 " style = 'text-align: right;'>Recieved:</span>
									<input type="text" v-model="detail_row_recieved_quantity" class="form-control col-lg-6" placeholder="Please enter the number" />
			             		</div>-->
			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 " style = 'text-align: right;'>Valid:</span>
				                	<span class="col-lg-6 " style = 'text-align: right;'>{{statistic_row_valid==1?'Yes':'No'}}</span>

			             		</div>
			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 " style = 'text-align: right;'>Remark:</span>
									<input type="text" v-model="detail_row_remark" class="form-control col-lg-6" />
			             		</div>
			             	</div>
			            </div>
		      		</div>
		      		<div class="modal-footer">
		           		<button type="button" class="btn btn-primary" @click="confirm_insert_detail_message" data-dismiss="modal">Submit</button>
		           		<button type="button" class="btn" data-dismiss="modal">Cancel</button>
		         	</div>
				</div>
			</div>
		</div>


		<div class="modal fade" id="addSupplementsStatisticModel"  role="dialog" aria-labelledby="addSupplementsStatisticModel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
			          	<h4 class="modal-title">Add Supplement Statistic</h4>
			            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		            </div>
		            <div class="modal-body">
			            <div class="row">
			             	<div class="col-lg-12">
			             		<div class="input-group" style="margin:10px" >

			             			<span class="col-lg-3 " style = 'text-align: right;'>Order Date:</span>
			             			<input type="text" v-model="statistic_row_orderDate" class="statisticOrderDatepick form-control col-lg-6" />
			             		</div>

			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 " style = 'text-align: right;'>Currency:</span>
									<div class="col-lg-8 " style = 'display: inline-block;'>
										<select  id="selectOneStatisticRowCurrency" class="selectpicker"  v-model="statistic_row_currency"
											style = 'width :100%;' data-live-search="true" title="Select Currency" >
						  					<option v-for="tax in allCurrency" :key="tax.texTypeId" :value="tax.texTypeId">{{tax.texType}}</option>
										</select>
									</div>
			             		</div>

			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 " style = 'text-align: right;'>Supplier:</span>
									<div class="col-lg-8 " style = 'display: inline-block;'>
										<select id="selectOneStatisticRowSupplier" class="selectpicker" v-model="statistic_row_supplier" style = 'width :100%;'
											data-live-search="true" title="Select Supplier">
											<option v-for="suppli in allSupplier" :key="suppli.supplierId" :value="suppli.supplierId">{{suppli.supplierName}}</option>
										</select>
									</div>
			             		</div>

			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 ">Order No.:</span>
				                	<span class="col-lg-6 ">{{statistic_row_orderId}}</span>
			             		</div>

			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 " style = 'text-align: right;'>Valid:</span>
									<div class="col-lg-8 " style = 'display: inline-block;'>
										<select  id="selectOneStatisticRowValid" class="selectpicker"  v-model="statistic_row_valid"
											style = 'width :100%;' title="Select Valid" >
						  					<option v-for="va in validList" :key="va.validId" :value="va.validId">{{va.validName}}</option>
										</select>
									</div>
			             		</div>

			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 " style = 'text-align: right;'>Remark:</span>
									<input type="text" v-model="statistic_row_remark" class="form-control col-lg-6" />
			             		</div>
			             	</div>
			            </div>
		      		</div>
		      		<div class="modal-footer">
		           		<button type="button" class="btn btn-primary" @click="confirm_insert_statistic_message" data-dismiss="modal">Submit</button>
		           		<button type="button" class="btn" data-dismiss="modal">Cancel</button>
		         	</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="addSupplementsReceivedModel"  role="dialog" aria-labelledby="addSupplementsReceivedModel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
			          	<h4 class="modal-title">Add Supplement Received</h4>
			            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		            </div>
		            <div class="modal-body">
			            <div class="row">
			             	<div class="col-lg-12">

			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 " style = 'text-align: right;'>Order Id:</span>
									<div class="col-lg-8 " style = 'display: inline-block;'>
										<select id="selectOneReceivedRowOrderId" class="selectpicker" v-model="received_row_orderId"
											style = 'width :100%;' data-live-search="true" title="Select Order Id">
											<option v-for="rowOrder in allItemOrderIds" :key="rowOrder.orderId" :value="rowOrder.orderId">{{rowOrder.orderId}}</option>
										</select>
									</div>
			             		</div>

			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 " style = 'text-align: right;'>Product:</span>
									<div class="col-lg-8 " style = 'display: inline-block;'>
										<select  id="selectOneReceivedRowProduct" class="selectpicker"  v-model="received_row_productId"
											style = 'width :100%;' title="Select Procut" >
						  					<option v-for="proid in received_row_products" :key="proid.productId" :value="proid.productId">{{proid.productName}}</option>
										</select>
									</div>
			             		</div>

			             		<!--received_quantity-->
			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 " style = 'text-align: right;'>Received Quantity:</span>
									<input type="text" v-model="received_row_receivedQuantity" class="form-control col-lg-6" placeholder="Please enter the Number" />
			             		</div>

			             		<div class="input-group" style="margin:10px" >

			             			<span class="col-lg-3 " style = 'text-align: right;'>Received Date:</span>
			             			<input type="text" v-model="received_row_recieveDate" class="receivedDatepick form-control col-lg-6" />
			             		</div>

			             		<div class="input-group" style="margin:10px" >

				                	<span class="col-lg-3 " style = 'text-align: right;'>Remark:</span>
									<input type="text" v-model="received_row_remark" class="form-control col-lg-6" />
			             		</div>

			             	</div>
			            </div>
		      		</div>
		      		<div class="modal-footer">
		           		<button type="button" class="btn btn-primary" @click="confirm_insert_received_message" data-dismiss="modal">Submit</button>
		           		<button type="button" class="btn" data-dismiss="modal">Cancel</button>
		         	</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="alertDeleteTipModelId"  role="dialog" aria-labelledby="alertDeleteTipModelId" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
			          	<h4 class="modal-title">Are you sure you want to delete this record?</h4>
			            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		            </div>
					<div class="modal-footer">
		           		<button type="button" class="btn btn-primary" @click="confirm_delete_record" data-dismiss="modal">Submit</button>
		           		<button type="button" class="btn" data-dismiss="modal">Cancel</button>
		         	</div>
		        </div>
			</div>
		</div>

	</div>
</template>

<style scoped>
	.floatRightBtnDiv{
		width:100%;
		height:20px;
	}
	.statistic_row_inDetail{
	}


</style>

<script>
	import $ from "jquery"
	import Vue from 'vue'
	import axios from 'axios';
	import moment from 'moment';
	import header from '../header.vue'
	import TableExport from 'tableexport'
	export default {
		data() {
			return {
				isNotInit: true,//是否已经初始化
				selectLocalInventoryOrNot:false,
				localInventoryFileDir:'',
				serverUrl: "",//库存主机URL
				token: "",//回话令牌
				userId: 0,//用户ID
				parentId: 0,//父级ID
				roleId : 0,
				canUpdatePurchase: 0,
				canUpdateEst:0,

				sellerList: [],//卖家显示列表
				countryList: [],//国家显示列表
				productList: [],//产品显示列表
				timepointList: [],//时间点列表
				userBrandsList:[],

//				selectRegion: null,//选择区域
				selectedCountrys:[],
				selectedSeller: [],//选择卖家
				selectBuProductIds:[],

				selectAvgCountrys:[],
				selectAvgSeller:[],

				selectDate:"",//库存日期、
				localInventoryDate:'',
				selectedTimepoint: "",//库存选中日期的时间点
				avgStartDate: "",//日均的时间范围起始
				avgEndDate: "",//日均的时间范围结束

				financeBusinessUnitList:[],
				selectBuName : '',
				displayConditionAllData:[],
				byStoreTablePageNumber:1,

				selectedBrandsIds:[],
				selectedBrandAvgBrandIds:[],
				selectedBrandAvgSeller:[],
				selectedBrandAvgCountrys:[],
				selectedByBrandAvgDate:'',
				selectedSupplierCreateDate:'',

				row_sellerId :'',
				row_countryId :'',
				row_productId :'',
				row_localInventory : '',
				row_category :'',
				row_ensureDays :'',
				row_notifyDate :'',
				row_deliveryDate :'',
				row_supplierReplyDate :'',
				selectedBuUnitId:'',

				replenishColumns:[],
				displayInventorydata:[],

				//以下变量用于 order statistic table
				selectedStatisticsSupplier:[],
				selectedStatisticsCurrency:[],
				allSupplier:[],
				allCurrency:[],
				statisticColumns:[],
				displayStatisticData:[], //statistic 页面展示的数据.
				statisticValid:1,

				public_row_orderId:'',
				statistic_row_orderId:'',
				statistic_row_orderDate:'',
				statistic_row_supplier:'',
				statistic_row_supplier_name:'',
				statistic_row_quantity:'',
				statistic_row_total_price:'',
				statistic_row_currency:'',
				statistic_row_currency_texType:'',
				statistic_row_valid:'',
				statistic_row_recieved_quantity:'',
				statistic_row_remark:'',

				//以下变量用于 detail table
				selectedDetailSupplier:[],
				selectedDetailCurrency:[],

				selectedDetailOrderIds:[],
				selectedDetailProductIds:[],
				detailColumns:[],
				displayDetailData:[],
				statusList :[],
				detailValid:1,

				validList:[],
				detail_row_orderId:'',
				detail_row_orderDate:'',
				detail_row_model:'',
				detail_row_quantity:'',
				detail_row_price:'',
				detail_row_total:'',
				detail_row_currency:'',
				detail_row_currency_texType:'',
				detail_row_supplier:'',
				detail_row_supplier_name:'',
				detail_row_valid:'',
				detail_row_recieved_quantity:'',
				detail_row_remark:'',
				productClassList:[],

				// param is used to order item received
				allSupplementItem:[],
				allItemOrderIds:[],

				selectedReceivedSupplierIds:[],
				couldSelectReceivedProductIds:[],
				selectedReceivedProductIds:[],
				receivedColumns:[],
				displayReceivedData:[],

				received_row_orderReceivedId:'',
				received_row_orderId:'',
				received_row_productId:'',
				received_row_products:[],
				received_row_productName:'',
				received_row_receivedQuantity:'',
				received_row_recieveDate:'',
				received_row_udate:'',
				received_row_remark:'',

				itemShowStatistic:'hide',
				addDetailClick: false,			//用于判断是否联动出orderId;
				couldSelectProductIds:[],

				displayItemData:[],
				itemColumns:[],
				displayTotalData:[],
				totalColumns:[],

				deleteRowType:'',
				deleteOrderId:'',
				deleteProductId:'',
				deleteReceivedId:'',

				theUserPermissions:[],
				displayPriceOrNot:false,

			}
		},
		methods: {

			init() {
				if(this.$store.state.baseData && this.isNotInit) {

					//初始化变量
					this.isNotInit = false;
					this.serverUrl = this.$store.state.baseData.pageHandlers;
					this.token = this.$store.state.baseData.userInfo.token;
					this.userId = this.$store.state.baseData.userInfo.userId;
					this.roleId = this.$store.state.baseData.userInfo.roleId;
					this.parentId = this.$store.state.baseData.userInfo.parentId;
					this.sellerList = this.$store.state.baseData.userSellers;
					this.countryList = this.$store.state.baseData.countries;
					this.productList = this.$store.state.products;
					this.userBrandsList = this.$store.state.baseData.userBrands;
					this.buProducts = this.$store.state.baseData.productIdList;
					this.financeBusinessUnitList = this.$store.state.baseData.financeBusinessUnit;
					this.theUserPermissions = this.$store.state.baseData.permissions;

					this.avgStartDate = moment().subtract(29, 'days').format('YYYY-MM-DD 00:00:00');
					this.avgEndDate = moment().format('YYYY-MM-DD 00:00:00');
					this.selectDate=moment().format('YYYY-MM-DD');
					this.localInventoryDate=moment().format('YYYY-MM-DD');

					let newdate = new Date();
						newdate.setDate(newdate.getDate()-1);
					let temdate = newdate.getFullYear()+'-'+(newdate.getMonth()+1)+'-'+newdate.getDate();
					this.selectedByBrandAvgDate=temdate;
					let temOrderDate = new Date();
					this.detail_row_orderDate = temOrderDate.getFullYear()+'-'+(temOrderDate.getMonth()+1)+'-'+temOrderDate.getDate();
					this.selectedSupplierCreateDate = temOrderDate.getFullYear()+'-'+(temOrderDate.getMonth()+1)+'-'+temOrderDate.getDate();
					let temReceivedDate = new Date();
					this.received_row_recieveDate = temReceivedDate.getFullYear()+'-'+(temReceivedDate.getMonth()+1)+'-'+temReceivedDate.getDate();;

					this.selectedBrandAvgBrandIds = this.userBrandsList.map(function (item,index,input) {return item.brandId;});
					this.selectedBrandAvgSeller = this.sellerList.map(function (item,index,input) {return item.sellerId;});
					this.selectedBrandAvgCountrys = this.countryList.map(function (item,index,input) {return item.countryId;});
					this.selectedReceivedProductIds = this.productList.map(function (item,index,input) {return item.productId;});

					this.displayPriceOrNot = false ;
//					this.firstInitSelect = true;
					//默认全选
					var allSellerId = [];
					this.selectedSeller = allSellerId;
					//初始化控件
					var that = this;
					this.initSupplierAndCurrency();
					that.initAllSupplementItem();
					that.initDisplayPrice();
					Vue.nextTick(function() {
						$('#selectForReplenishBrand').selectpicker("val","");
						$('#selectCountry').selectpicker('val', "");
						$("#selectTimepoint").selectpicker('refresh');
						$("#selectProductTimepoint").selectpicker('refresh');
						$("#selectProductSku").selectpicker('refresh');
						$("#selectBusinessUnitId").selectpicker('refresh');
						$("#selectForReplenishAvgSeller").selectpicker('refresh');
						$("#selectForReplenishAvgCountry").selectpicker('refresh');
						$("#selectDetailProduct").selectpicker('refresh');
						$("#selectDetailProductIds").selectpicker('refresh');
						that.initDatePicker();
//						$("#isStatisticValidId").on("change",function(){
//							that.searchStatisticList();
//						});
					});
					//初始化数据
					this.chooseDate();
				}
			},
			statisticsCellEditDone(newValue,oldValue,rowIndex,rowData,field){
				if(newValue === oldValue)return;
				let that = this;
				let temValidId = newValue == 'Yes' ? 1 : 2 ;
				that.displayStatisticData[rowIndex][field] = temValidId;
				rowData.valid = temValidId;
				that.initStatisticOneRowOrClear(rowData);
				that.confirm_insert_statistic_message();
			},
			detailCellEditDone(newValue,oldValue,rowIndex,rowData,field){
				if(newValue === oldValue)return;
				let that = this;

			},
			initDisplayPrice(){
				let that = this;
				let result = false;
				if(that.theUserPermissions.length<1)return;
				for(let oneper of that.theUserPermissions){
					if( 'Supplier_order_manage' == oneper.permissionName && oneper.hasPermission){
						result = true;
					}
				}
				that.displayPriceOrNot = result;
			},
			replenishCellEditDone(newValue,oldValue,rowIndex,rowData,field){

				if(newValue === oldValue)return;
				let that = this;
				that.displayInventorydata[rowIndex][field] = newValue;
				axios.put(this.serverUrl + 'amzSupplierInventory/updateTheMessage/'+rowData['sellerId']+'/'+rowData['countryId']+
										   '/'+rowData['productId']+'/'+field+'/'+newValue,{
						headers: {
							"Access-Token": this.token
						}
					})
					.then((res) => {
						if(res.data.code == 200){

						}else{

						}
					}).catch(err => {
//						that.$root.requestError(err);
					});


			},

			uploadExcel_orderStatistics_fun(){
				$('#uploadOrderStatistics_stoExcel').click();
			},
			uploadApplyExcel_store_fun(){
				$('#uploadApply_stoExcel').click();
			},
			uploadlocalInventory_fun(){
				$("#uploadLocalInventoryModel").modal("show");
			},
			comfirmUploadLocalInventory(){
				$('#uploadLocalInventorytoExcel').click();
			},
			//初始化日期控件
			initDatePicker() {
				var that = this;
				$("#point_date_id").daterangepicker({
						singleDatePicker: true,
						showDropdowns: true,
						locale: {
							format: 'YYYY-MM-DD'
						}
					},
					function(start) {
						that.selectDate=start.format('YYYY-MM-DD');
						Vue.nextTick(function() {
							that.chooseDate();
						})
					});
				$(".brandAvgDatepick").daterangepicker({
						singleDatePicker: true,
						showDropdowns: true,
						autoUpdateInput:false,
						locale: {
							format: 'YYYY-MM-DD'
						}
					},
					function(start) {
						that.selectedByBrandAvgDate=start.format('YYYY-MM-DD');
					});

				$(".supplyCreateDatepick").daterangepicker({
						singleDatePicker: true,
						showDropdowns: true,
						autoUpdateInput:false,
						locale: {
							format: 'YYYY-MM-DD'
						}
					},
					function(start) {
						that.selectedSupplierCreateDate=start.format('YYYY-MM-DD');
					});
				$(".detailOrderDatepick").daterangepicker({
						singleDatePicker: true,
						showDropdowns: true,
						autoUpdateInput:false,
						locale: {
							format: 'YYYY-MM-DD'
						}
					},
					function(start) {
						that.detail_row_orderDate=start.format('YYYY-MM-DD');
					});
				$(".statisticOrderDatepick").daterangepicker({
						singleDatePicker: true,
						showDropdowns: true,
						autoUpdateInput:false,
						locale: {
							format: 'YYYY-MM-DD'
						}
					},
					function(start) {
						that.statistic_row_orderDate=start.format('YYYY-MM-DD');
					});
				$(".receivedDatepick").daterangepicker({
						singleDatePicker: true,
						showDropdowns: true,
						autoUpdateInput:false,
						locale: {
							format: 'YYYY-MM-DD'
						}
					},
					function(start) {
						that.received_row_recieveDate = start.format('YYYY-MM-DD');
					});
			},
			initStandartDateStr(){
				let that = this;
				let new_date = new Date();
				let standardMonth = new_date.getMonth()+1;
				let tem_month = (standardMonth+"").trim().length == 1?('0'+ standardMonth).trim():standardMonth;
				let tem_date_number = (new_date.getDate()+"").trim().length == 1?('0'+new_date.getDate()).trim():new_date.getDate();
				let tem_str = new_date.getFullYear()+'-'+tem_month+'-'+tem_date_number;
				that.detail_row_orderDate = tem_str;
				that.statistic_row_orderDate = tem_str;
				that.received_row_recieveDate = tem_str;
			},
			//清空(statistic)弹出框数据或者初始化其数据.
			initStatisticOneRowOrClear(row){
				let that = this;
				if(null == row){
					that.statistic_row_orderId= '';
					that.statistic_row_supplier= '';
					that.statistic_row_quantity= '';
					that.statistic_row_total_price= '';
					that.statistic_row_currency= '';
					that.statistic_row_valid = 1;
					that.statistic_row_recieved_quantity= '';
					that.statistic_row_remark= '';

					Vue.nextTick(function() {
						$("#selectOneStatisticRowCurrency").selectpicker('refresh');
						$("#selectOneStatisticRowSupplier").selectpicker('refresh');
						$("#selectOneStatisticRowValid").selectpicker('refresh');
						that.initStandartDateStr();	//statistic and detail date
						that.statistic_row_orderId = '';
					});
				}else{
					that.statistic_row_orderId = row.orderId;
					that.statistic_row_supplier= row.supplierId;
					that.statistic_row_orderDate = row.orderDate;
					that.statistic_row_quantity= row.quantity;
					that.statistic_row_total_price= row.totalPrice;
					that.statistic_row_currency= row.texTypeId;
					that.statistic_row_valid = row.valid;
					that.statistic_row_recieved_quantity= row.receivedQuantity;
					that.statistic_row_remark= row.remark;
//					Vue.nextTick(function() {
//						$("#selectOneStatisticRowCurrency").selectpicker('refresh');
//						$("#selectOneStatisticRowSupplier").selectpicker('refresh');
//						$("#selectOneStatisticRowValid").selectpicker('refresh');
//					});
				}
			},
			//清空(Received)弹出框数据或者初始化其数据.
			initReceivedOneRowOrClear(row){
				let that = this;
				if(null == row){
					that.received_row_orderReceivedId='',
					that.received_row_orderId='',
					that.received_row_productId='',
					that.received_row_productName='',
					that.received_row_receivedQuantity='',
					that.received_row_udate='',
					that.received_row_remark='',
					Vue.nextTick(function() {
						$("#selectOneReceivedRowOrderId").selectpicker('refresh');
						$("#selectOneReceivedRowProduct").selectpicker('refresh');
						that.initStandartDateStr();
					});
				}else{
					that.received_row_orderReceivedId = row.orderReceivedId;
					that.received_row_orderId = row.orderId;
					that.received_row_productId = row.productId;
					that.received_row_productName = row.productName;
					that.received_row_receivedQuantity = row.receivedQuantity;
					that.received_row_recieveDate = row.recieveDate;
					that.received_row_udate = row.udate;
					that.received_row_remark = row.remark;
					Vue.nextTick(function() {
						$("#selectOneReceivedRowOrderId").selectpicker('refresh');
						$("#selectOneReceivedRowProduct").selectpicker('refresh');
					});
				}
			},

			initDetailCurrencyAndSuppName(){
				let that = this;

				if(that.detail_row_currency == null || that.detail_row_supplier == null)return;
				for(let oneCurr of that.allCurrency){
					if(oneCurr.texTypeId == that.detail_row_currency){
						that.detail_row_currency_texType = oneCurr.texType;
					}
				}
				for(let suppli of that.allSupplier){
					if( suppli.supplierId == that.detail_row_supplier ){
						that.detail_row_supplier_name = suppli.supplierName;
					}
				}
			},
			clickEditReceivedOneRow(the_received_row){
				let that = this;
				that.initReceivedOneRowOrClear(the_received_row);		//将行数据保留至弹出框.
				$("#addSupplementsReceivedModel").modal("show");		//显示弹出框.
			},
			clickEditDetailOneRow(the_detail_row){
				let that = this;
				$("#addSupplementsDetailModel").modal("show");
			},
			clickEditStatisticOneRow(the_statistic_row){
				let that = this;
				that.initStatisticOneRowOrClear(the_statistic_row);
				$("#addSupplementsStatisticModel").modal("show");
			},
			addReceivedLine(){
				let that = this;
				that.initReceivedOneRowOrClear(null);
				$("#addSupplementsReceivedModel").modal("show");
			},
			backToStatistic(){
				let that = this;
				that.itemShowStatistic = 'hide' ;
				document.getElementById('searchStatisticListId').click();
			},
			addDetailLine(){
				let that = this;
				that.addDetailClick = true;

				if(that.itemShowStatistic == "show"){
					//that.statistic_row_remark
					that.detail_row_supplier_name = that.statistic_row_supplier_name;
					that.detail_row_currency_texType = that.statistic_row_currency_texType;
					that.detail_row_valid = that.statistic_row_valid;
					that.detail_row_model = '';
					that.detail_row_quantity = '';
					that.detail_row_price = '';
					that.detail_row_remark = '';

					Vue.nextTick(function() {
						$("#selectOneDetailRowValid").selectpicker('refresh');
						$("#selectDetailProduct").selectpicker('refresh');
					});
				}

				$("#addSupplementsDetailModel").modal("show");
			},
			addStatisticLine(){
				let that = this;
				that.initStatisticOneRowOrClear(null);
				that.addDetailClick = false;
				$("#addSupplementsStatisticModel").modal("show");
			},
			searchStatisticList(){
				let that = this;
				if(that.selectedStatisticsSupplier.length<1 || that.selectedStatisticsCurrency.length<1)return;
				that.statisticValid = $("#isStatisticValidId").is(":checked")?1:'';
				let re_param = {
					supplierIds : that.selectedStatisticsSupplier.join(','),
					texTypeIds : that.selectedStatisticsCurrency.join(','),
					valid : that.statisticValid,
				};
				axios.post(this.serverUrl + 'supplementGoods/selectStatisticTableData/', re_param,{
						headers: {
							"Access-Token": this.token
						}
					})
					.then((res) => {
						if(res.data.code == 200){
							let _data = res.data.data;
							that.displayStatisticData.length = 0;
							that.displayStatisticData=_data;
							if(!_data || _data.length<1){
								that.displayStatisticData = [];
							}
							that.initStatisticTable(that.displayStatisticData);
						}else{
							that.$root.requestError(res);
						}
					}).catch(err => {
						that.$root.requestError(err);
					});
			},
			initTotalTable(){

				let that = this;
				let supplierNameList = [];
				let result_list = [];
				for( let one_statistic of that.displayDetailData){

					if(supplierNameList.length == 0 || !supplierNameList.includes(one_statistic.supplierName)){
						supplierNameList.push(one_statistic.supplierName);	//不包含则记录,并新创建记录.
						let total_row_data = {
								theSupplierName : one_statistic.supplierName,
								theQuantity : one_statistic.quantity,
								thePrice : one_statistic.price,
								theTotalPrice : one_statistic.totalPrice,
								theAmount : 1,
							};
						result_list.push(total_row_data);
					}else if(supplierNameList.includes(one_statistic.supplierName) && result_list.length>0){
						for(let one_item of result_list){
							//已包含,则记录更新累加值;

							if( one_item.theSupplierName == one_statistic.supplierName ){
								one_item.theQuantity = one_item.theQuantity + one_statistic.quantity;
								one_item.thePrice = one_item.thePrice + one_statistic.price;
								one_item.theTotalPrice = one_item.theTotalPrice + one_statistic.totalPrice;
								one_item.theAmount = one_item.theAmount + 1;
							}
						}
					}
				}
				if(result_list.length>0){
					let the_total_length = result_list.length;
					let last_row = {
						theSupplierName : 'Total',
						theQuantity : 0,
						thePrice : 0,
						theTotalPrice : 0,
						theAmount : 0,
					};
					for( let sta_item of result_list){
						last_row.theQuantity = last_row.theQuantity + sta_item.theQuantity;
						last_row.thePrice = last_row.thePrice + sta_item.thePrice;
						last_row.theTotalPrice = last_row.theTotalPrice + sta_item.theTotalPrice;
						last_row.theAmount = last_row.theAmount + sta_item.theAmount;
					}
					if(result_list.length>1){
						result_list.push(last_row);
					}
					that.initTotalDisplayTable(result_list)
				}
			},
			initTotalDisplayTable(displayData){

				let that = this;
				if(that.displayPriceOrNot){
					that.totalColumns = [
						{
							field: "theSupplierName",
							title: "Supplier Name",
							width: 140,
							isResize:true,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+ rowData[field] +'</span>';
                           	}
						},
						{
							field: "theQuantity",
							title: "Quantity Total",
							width: 120,
							isResize:true,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: "thePrice",
							title: "Price Avg",
							width: 120,
							isResize:true,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = rowData[field];
								if (null != rowData.theAmount){
									result = rowData[field] / rowData.theAmount;
								}
                               	return '<span style="color:blue;font-weight: normal;">'+ result.toFixed(2) +'</span>';
                           	}
						},
						{
							field: "theTotalPrice",
							title: "Total Price",
							width: 120,
							isResize:true,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = null == rowData[field] ? '' : rowData[field].toFixed(2);
                               	return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},
					];
				}else{
					that.totalColumns = [
						{
							field: "theSupplierName",
							title: "Supplier Name",
							width: 140,
							isResize:true,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+ rowData[field] +'</span>';
                           	}
						},
						{
							field: "theQuantity",
							title: "Quantity Total",
							width: 120,
							isResize:true,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						},
					];
				}

					that.displayTotalData = displayData;

			},

			searchReceivedList(){
				let that = this;
				if(that.selectedReceivedSupplierIds.length<1
					|| that.selectedReceivedProductIds.length<1)return;
				let _supplierIds = that.selectedReceivedSupplierIds.join(',');
				let productIds = that.selectedReceivedProductIds.join(',');

				axios.get(this.serverUrl + 'supplementGoods/displayReceivedSupplierData/'+ _supplierIds + '/' + productIds , {
						headers: {
							"Access-Token": this.token
						}
					})
					.then((res) => {
						if(res.data.code == 200){
							let _data = res.data.data;
							that.displayReceivedData.length=0;
							that.displayReceivedData=_data;
							that.initReceivedTable(that.displayReceivedData);
							if(!_data || _data.length<1)that.displayReceivedData.length = 0;
						}else{
							that.$root.requestError(res);
						}
					}).catch(err => {
						that.$root.requestError(err);
					});

			},
			searchItemList(){

				let that = this;
				if(that.selectedDetailSupplier.length<1 || that.selectedDetailCurrency.length<1)return;
				if(null == that.public_row_orderId)return;
				let re_param = {
					orderId : that.public_row_orderId,
				};


				axios.post(this.serverUrl + 'supplementGoods/selectDetailTableData/', re_param,{
						headers: {
							"Access-Token": this.token
						}
					})
					.then((res) => {
						if(res.data.code == 200){
							let _data = res.data.data;
							that.displayItemData.length=0;
							that.displayItemData=_data;
							that.initItemTable(that.displayItemData);
							if(!_data || _data.length<1)that.displayItemData = [];
						}else{
							that.$root.requestError(res);
						}
					}).catch(err => {
						that.$root.requestError(err);
					});

			},
			searchDetailList(){
				let that = this;
				if(that.selectedDetailSupplier.length<1 || that.selectedDetailCurrency.length<1)return;
				that.detailValid = $("#isDetailValidId").is(":checked")?1:'';
				let re_param = {
					supplierIds : that.selectedDetailSupplier.join(','),
					texTypeIds : that.selectedDetailCurrency.join(','),
					productIds : that.selectedDetailProductIds.join(','),
					valid : that.detailValid,
				};
				axios.post(this.serverUrl + 'supplementGoods/selectDetailTableData/', re_param,{
						headers: {
							"Access-Token": this.token
						}
					})
					.then((res) => {
						if(res.data.code == 200){
							let _data = res.data.data;
							that.displayDetailData.length=0;
							that.displayDetailData=_data;
							that.initDetailTable(that.displayDetailData);
							if(!_data || _data.length<1){
								that.displayDetailData = [];
								that.displayTotalData = [];
							}else if(that.displayDetailData && that.displayDetailData.length>0){
								that.initTotalTable();
							}
						}else{
							that.$root.requestError(res);
						}
					}).catch(err => {
						that.$root.requestError(err);
					});
			},
			initAllSupplementItem(){
				let that = this;
				axios.get(that.serverUrl + 'supplementGoods/getAllDetailTableData',{
						headers: {
							"Access-Token": that.token
						}
					})
					.then((res) => {
						if(res.data.code == 200){
							let result_obj = res.data.data;
							that.allSupplementItem = result_obj;
							if(null == result_obj || result_obj.length<1){
								that.allSupplementItem = [];
							}else{
								that.allItemOrderIds.length = 0 ;
								let orderIdList = [];
								for(let theItem of result_obj){
									if(!orderIdList.includes(theItem.orderId)){
										orderIdList.push(theItem.orderId);
										let item_data = {
											orderId : theItem.orderId,
										}		//将orderId储存入对象中,便于扩展.
										that.allItemOrderIds.push(item_data);
									}
								}
//								that.selectedReceivedSupplierIds = orderIdList;
							}

							Vue.nextTick(function() {
								$("#selectReceivedSupplierIds").selectpicker('refresh');
								$("#selectOneReceivedRowOrderId").selectpicker('refresh');
								$("#selectOneReceivedRowProduct").selectpicker('refresh');
							});

						}else{
								that.$root.requestError(res);
						}
					}).catch(err => {
						that.$root.requestError(err);
					});
			},
			initSupplierAndCurrency(){
				let that = this;
				that.validList = [
					{
						validId:1,
						validName:'Yes'
					},{
						validId:2,
						validName:'No'
					}
				];
				axios.get(that.serverUrl + 'supplementGoods/getSupplementAndCurrency',{
						headers: {
							"Access-Token": that.token
						}
					})
					.then((res) => {
						if(res.data.code == 200){
							let resultObj = res.data.data;
							that.allSupplier = resultObj.supplierList;
							that.allCurrency = resultObj.taxList;
							that.selectedStatisticsSupplier =
										that.allSupplier.map(function (item,index,input) {return item.supplierId;});
							that.selectedStatisticsCurrency =
										that.allCurrency.map(function (item,index,input) {return item.texTypeId;});

							that.selectedDetailSupplier =
										that.allSupplier.map(function (item,index,input) {return item.supplierId;});
							that.selectedDetailCurrency =
										that.allCurrency.map(function (item,index,input) {return item.texTypeId;});
							that.detail_row_valid = 1;
							that.statistic_row_valid = 1;
							Vue.nextTick(function() {
								$("#selectStatisticsSupplier").selectpicker();
								$("#selectStatisticsCurrency").selectpicker();
								$("#selectDetailSupplier").selectpicker();
								$("#selectDetailCurrency").selectpicker();
								$("#selectOneDetailRowCurrency").selectpicker('refresh');
								$("#selectOneDetailRowSupplier").selectpicker('refresh');
								$("#selectOneDetailRowValid").selectpicker('refresh');
								$("#selectOneStatisticRowCurrency").selectpicker('refresh');
								$("#selectOneStatisticRowSupplier").selectpicker('refresh');
								$("#selectOneStatisticRowValid").selectpicker('refresh');
								$('#selectDetailOrderIds').selectpicker('refresh');
								$("#selectReceivedProducts").selectpicker('refresh');
							});
						}else{
								that.$root.requestError(res);
						}
					}).catch(err => {
						that.$root.requestError(err);
					});
			},
			//选择库存日期
			chooseDate(){
				let that = this;
				if( !that.selectedSeller || that.selectedSeller.length<1 || that.selectedCountrys.length<1
									|| that.selectBuProductIds.length<1 || that.selectDate.length<1){
					 return;
				}
				/*权限控制，每周一采购可以更新，每周三运营可以跟新数据。*/
				let _theDay =  (new Date).getDay();
				if(_theDay == 1 && that.roleId == 3 ){	///周一采购
					that.canUpdatePurchase = 1;
				}else if(_theDay == 3 && that.roleId == 2){ //周三运营
					that.canUpdateEst = 1;
				}

				let _param = {
					snapshotTime: that.selectDate+" 00:00:00",
					countryIds : that.selectedCountrys.join(","),
					sellerIds: that.selectedSeller.join(","),
					productIds:that.selectBuProductIds.join(","),
					userId: that.userId,

				}
				axios.post(that.serverUrl + 'amzSupplierInventory/selectSnapShotTime/',_param, {
						headers: {
							"Access-Token": that.token
						}
					})
					.then((res) => {
						if(res.data.code == 200){
							let temList = res.data.data;
							if(temList!=null && temList.length>0)
							{
								that.timepointList = temList.reverse();
								that.selectedTimepoint=that.timepointList[0];
								Vue.nextTick(function() {
									$("#selectTimepoint").selectpicker('refresh');
									$("#selectTimepoint").selectpicker('val', that.selectedTimepoint);
								});
							}else{
								this.displayConditionAllData.splice(0,this.displayConditionAllData.length);

								this.initSupplierInventoryTable(this.displayConditionAllData);

								that.selectedTimepoint=[];
								Vue.nextTick(function(){
									$("#selectTimepoint").selectpicker('refresh');
								});
							}
						}else{
								that.$root.requestError(res);
						}
					}).catch(err => {
						that.$root.requestError(err);
					});
			},
			//选择条件后的数据获取函数,包括 卖家选择事件, 区域选择事件, 时间点选择事件
			searchAmzSupplierInventory() {
				let that=this;
				if(!that.selectedTimepoint || that.selectedTimepoint.length <1 || that.selectedSupplierCreateDate.length <1)
				{
					$("#supplierInventoryTable").bootstrapTable('destroy');
					return;
				}

				let _countryIds = that.selectedCountrys.length>0 ?that.selectedCountrys.join(",") : '';
				let _sellerIds = that.selectedSeller.length>0  ?that.selectedSeller.join(",") : '' ;
				let _productIds = that.selectBuProductIds.length>0 ?that.selectBuProductIds.join(",") : '' ;
				let _avgSellerIds = that.selectedBrandAvgSeller.length>0?that.selectedBrandAvgSeller.join(",") : "" ;
				let _avgCountryIds = that.selectedBrandAvgCountrys.length>0 ?that.selectedBrandAvgCountrys.join(",") : "" ;
				let _supplierCDate = (that.selectedSupplierCreateDate + "").substring(0,10);


				let _params = {
					snapshotTime: that.selectedTimepoint,
					countryIds : _countryIds,
					sellerIds: _sellerIds,
					productIds:_productIds,
					avgSellerIds:_avgSellerIds,
					avgCountryIds:_avgCountryIds,
					startDate: that.selectedByBrandAvgDate+' 00:00:00',
					supplierCDate:_supplierCDate,
				}
				if(this.selectedTimepoint!=undefined){
					axios.post(this.serverUrl + 'amzSupplierInventory/selectByCondition/', _params,{
						headers: {
							"Access-Token": this.token
						}
					})
					.then((res) => {
						if(res.data.code == 200){
							let _data = res.data.data;
							that.displayConditionAllData=_data;
							that.initSupplierInventoryTable(that.displayConditionAllData);
						}else{
							that.$root.requestError(res);
						}
					}).catch(err => {
						that.$root.requestError(err);
					});
				}
			},
			initStatisticTable(displayData){
				let that = this;
				if(that.displayPriceOrNot){
					that.statisticColumns = [
						{
							field: "orderDate",
							title: "Order Date",
							width: 140,
							titleAlign: 'center',
							columnAlign:'center',
							isResize:true,
							isFrozen: true,
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field].substr(0,10)+'</span>';
                           	}
						},
						{
							field: "supplierName",
							title: "Supplier",
							isResize:true,
							width: 120,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: "orderId",
							title: "Order No.",
							isResize:true,
							width: 233,
							titleAlign: 'center',
							columnAlign:'center',
						},
						{
							field: "quantity",
							title: "Quantity",
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = null == rowData[field] ? '0' : rowData[field];
                               	return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},
						{
							field: 'texType',
							title: 'Currency',
							isResize:true,
							width: 200,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						}, {
							field: 'receivedQuantity',
							title: 'Received <br/> Quantity',
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = null == rowData[field] ? '0' : rowData[field];
                               	return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},{
							field: 'totalPrice',
							title: 'Total Price',
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = null == rowData[field] || 0 == rowData[field] ? '0' : rowData[field];
                               	return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},{
							field: 'valid',
							title: 'Valid',
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',
							isEdit : true,
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = '1'== rowData[field] || 1 == rowData[field] ? 'Yes' : 'No' ;
                               	return '<span style="color:blue;font-weight: bold;">'+ result +'</span>';
                           	}
						},{
							field: 'remark',
							title: 'Remark',
							isResize:true,
							width: 200,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = (null == rowData[field] || "null" == rowData[field]) ? "--" : rowData[field];
                               	return '<span style="color:blue;font-weight: normal;">'+result+'</span>';
                           	}
						},
						{
							field: 'remark',
							title: 'Detail',
							width: 80,
							titleAlign: 'center',
							columnAlign:'center',
							componentName:'statistic-table-operation'
						},
						{
							field: 'remark',
							title: 'Delete',
							width: 80,
							titleAlign: 'center',
							columnAlign:'center',
							componentName:'statistic-table-delete-operation'
						},
					];
				}else {
					that.statisticColumns = [
						{
							field: "orderDate",
							title: "Order Date",
							width: 140,
							titleAlign: 'center',
							columnAlign:'center',
							isResize:true,
							isFrozen: true,
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field].substr(0,10)+'</span>';
                           	}
						},
						{
							field: "supplierName",
							title: "Supplier",
							isResize:true,
							width: 120,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: "orderId",
							title: "Order No.",
							isResize:true,
							width: 233,
							titleAlign: 'center',
							columnAlign:'center',
						},
						{
							field: "quantity",
							title: "Quantity",
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = null == rowData[field] ? '0' : rowData[field];
                               	return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},
						{
							field: 'texType',
							title: 'Currency',
							isResize:true,
							width: 200,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						}, {
							field: 'receivedQuantity',
							title: 'Received <br/> Quantity',
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = null == rowData[field] ? '0' : rowData[field];
                               	return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},
						{
							field: 'valid',
							title: 'Valid',
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',
							isEdit : true,
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = '1'== rowData[field] || 1 == rowData[field] ? 'Yes' : 'No' ;
                               	return '<span style="color:blue;font-weight: bold;">'+ result +'</span>';
                           	}
						},{
							field: 'remark',
							title: 'Remark',
							isResize:true,
							width: 200,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = (null == rowData[field] || "null" == rowData[field]) ? "--" : rowData[field];
                               	return '<span style="color:blue;font-weight: normal;">'+result+'</span>';
                           	}
						},
						{
							field: 'remark',
							title: 'Detail',
							width: 90,
							titleAlign: 'center',
							columnAlign:'center',
							componentName:'statistic-table-operation'
						},
					];
				}

					that.displayStatisticData = displayData;
			},
			initReceivedTable(displayData){
				let that = this;
				if(that.displayPriceOrNot){
					that.receivedColumns = [
						{
							field: "orderId",
							title: "Order No.",
							width: 140,
							titleAlign: 'center',
							columnAlign:'center',
							isResize:true,
							isFrozen: true,
						 	formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:black;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: "productName",
							title: "Model",
							width: 120,
							isResize:true,
							titleAlign: 'center',
							columnAlign:'center',

							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: 'receivedQuantity',
							title: 'Received <br/> Quantity',
							width: 100,
							isResize:true,
							titleAlign: 'center',
							columnAlign:'center',

							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = rowData[field] == null ? '0' : rowData[field];
								return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},
						{
							field: "recieveDate",
							title: "Recieve Date",
							width: 233,
							isResize:true,
							titleAlign: 'center',
							columnAlign:'center',
							isFrozen: true,
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field].substr(0,10)+'</span>';
                           	}
						},
						{
							field: 'remark',
							title: 'Remark',
							width: 260,
							isResize:true,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = (null == rowData[field] || "null" == rowData[field]) ? "--" : rowData[field];
                               	return '<span style="color:blue;font-weight: normal;">'+result+'</span>';
                           	}
						},
						{
							field: 'remark',
							title: 'Operation',
							width: 160,
							titleAlign: 'center',
							columnAlign:'center',
							componentName:'received-table-operation'
						},
					];
				}else{
					that.receivedColumns = [
						{
							field: "orderId",
							title: "Order No.",
							width: 140,
							titleAlign: 'center',
							columnAlign:'center',
							isResize:true,
							isFrozen: true,
						 	formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:black;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: "productName",
							title: "Model",
							width: 120,
							isResize:true,
							titleAlign: 'center',
							columnAlign:'center',

							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: 'receivedQuantity',
							title: 'Received <br/> Quantity',
							width: 100,
							isResize:true,
							titleAlign: 'center',
							columnAlign:'center',

							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = rowData[field] == null ? '0' : rowData[field];
								return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},
						{
							field: "recieveDate",
							title: "Recieve Date",
							width: 233,
							isResize:true,
							titleAlign: 'center',
							columnAlign:'center',
							isFrozen: true,
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field].substr(0,10)+'</span>';
                           	}
						},
						{
							field: 'remark',
							title: 'Remark',
							width: 260,
							isResize:true,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = (null == rowData[field] || "null" == rowData[field]) ? "--" : rowData[field];
                               	return '<span style="color:blue;font-weight: normal;">'+result+'</span>';
                           	}
						},
					];
				}

				that.displayReceivedData = displayData;
			},
			initItemTable(displayData){
				let that = this;
				if(that.displayPriceOrNot){
					that.itemColumns = [
							{ field: "orderId", title: "Order No.", width: 200, titleAlign: 'center', columnAlign:'center', isFrozen: true,
							 	formatter: function (rowData,rowIndex,pagingIndex,field) { return '<span style="color:black;">'+rowData[field]+'</span>';}
							},
							{field: "productName",title: "Model", width: 120, titleAlign: 'center', columnAlign:'center',
								formatter: function (rowData,rowIndex,pagingIndex,field) {return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';}
							},
							{
								field: "quantity",
								title: "Quantity",
								width: 100,
								titleAlign: 'center',
								columnAlign:'center',

								formatter: function (rowData,rowIndex,pagingIndex,field) {
	                               	let result = null == rowData[field] ? 0 : rowData[field] ;
									return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
	                           	}
							},
							{
								field: "price",
								title: "Price",
								width: 100,
								titleAlign: 'center',
								columnAlign:'center',

								formatter: function (rowData,rowIndex,pagingIndex,field) {
									let result = null == rowData[field] ? 0 : rowData[field] ;
									return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
	                           	}
							},
							{
								field: 'texType',
								title: 'Currency',
								width: 200,
								titleAlign: 'center',
								columnAlign:'center',
								formatter: function (rowData,rowIndex,pagingIndex,field) {
										return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
	                           	}
							},
							{
								field: 'totalPrice',
								title: 'Total Price',
								width: 100,
								titleAlign: 'center',
								columnAlign:'center',
								formatter: function (rowData,rowIndex,pagingIndex,field) {
									let result = null == rowData[field] ? 0 : rowData[field] ;
									return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
	                           	}
							},
							{
								field: "supplierName",
								title: "Supplier",
								width: 160,
								titleAlign: 'center',
								columnAlign:'center',

								formatter: function (rowData,rowIndex,pagingIndex,field) {
										return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
	                           	}
							},
							{
								field: 'valid',
								title: 'Valid',
								width: 100,
								titleAlign: 'center',
								columnAlign:'center',
								isResize:true,
								formatter: function (rowData,rowIndex,pagingIndex,field) {
									let result = 1 == rowData[field] ? 'Yes' : 'No' ;
										return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
	                           	}
							},
							{
								field: 'receivedQuantity',
								title: 'Received <br/> Quantity',
								width: 100,
								titleAlign: 'center',
								columnAlign:'center',

								formatter: function (rowData,rowIndex,pagingIndex,field) {
									let result = null == rowData[field] ? 0 : rowData[field];
									return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
	                           	}
							},
							{
								field: 'remark',
								title: 'Remark',
								width: 260,
								titleAlign: 'center',
								columnAlign:'center',
								formatter: function (rowData,rowIndex,pagingIndex,field) {
									let result = null == rowData[field] ? '' : rowData[field];
									return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
	                           	}
							},
					];
				}else{
					that.itemColumns = [
							{ field: "orderId", title: "Order No.", width: 200, titleAlign: 'center', columnAlign:'center', isFrozen: true,
							 	formatter: function (rowData,rowIndex,pagingIndex,field) { return '<span style="color:black;">'+rowData[field]+'</span>';}
							},
							{field: "productName",title: "Model", width: 120, titleAlign: 'center', columnAlign:'center',
								formatter: function (rowData,rowIndex,pagingIndex,field) {return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';}
							},
							{
								field: "quantity",
								title: "Quantity",
								width: 100,
								titleAlign: 'center',
								columnAlign:'center',

								formatter: function (rowData,rowIndex,pagingIndex,field) {
	                               	let result = null == rowData[field] ? 0 : rowData[field] ;
									return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
	                           	}
							},
							{
								field: 'texType',
								title: 'Currency',
								width: 200,
								titleAlign: 'center',
								columnAlign:'center',
								formatter: function (rowData,rowIndex,pagingIndex,field) {
										return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
	                           	}
							},
							{
								field: "supplierName",
								title: "Supplier",
								width: 160,
								titleAlign: 'center',
								columnAlign:'center',

								formatter: function (rowData,rowIndex,pagingIndex,field) {
										return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
	                           	}
							},
							{
								field: 'valid',
								title: 'Valid',
								width: 100,
								titleAlign: 'center',
								columnAlign:'center',
								isResize:true,
								formatter: function (rowData,rowIndex,pagingIndex,field) {
									let result = 1 == rowData[field] ? 'Yes' : 'No' ;
										return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
	                           	}
							},
							{
								field: 'receivedQuantity',
								title: 'Received <br/> Quantity',
								width: 100,
								titleAlign: 'center',
								columnAlign:'center',

								formatter: function (rowData,rowIndex,pagingIndex,field) {
									let result = null == rowData[field] ? 0 : rowData[field];
									return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
	                           	}
							},
							{
								field: 'remark',
								title: 'Remark',
								width: 260,
								titleAlign: 'center',
								columnAlign:'center',
								formatter: function (rowData,rowIndex,pagingIndex,field) {
									let result = null == rowData[field] ? '' : rowData[field];
									return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
	                           	}
							},
					];
				}

				if(that.itemShowStatistic == 'show' && that.displayPriceOrNot){
						let tem_oprate_col = {
							field: 'remark',
							title: 'Operation',
							width: 160,
							titleAlign: 'center',
							columnAlign:'center',
							componentName:'detail-table-operation'
						}
						that.itemColumns.push(tem_oprate_col);
					}
				that.displayItemData = displayData;
			},
			initDetailTable(displayData){
				let that = this;
				if(that.displayPriceOrNot){
					that.detailColumns = [
						{
							field: "orderId",
							title: "Order No.",
							width: 200,
							titleAlign: 'center',
							columnAlign:'center',
							isFrozen: true,
						 	formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:black;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: "orderDate",
							title: "Order Date",
							width: 140,
							titleAlign: 'center',
							columnAlign:'center',
							isResize:true,
							isFrozen: true,
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field].substr(0,10)+'</span>';
                           	}
						},
						{
							field: "productName",
							title: "Model",
							width: 120,
							titleAlign: 'center',
							columnAlign:'center',

							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: "quantity",
							title: "Quantity",
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',

							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: "price",
							title: "Price",
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',

							formatter: function (rowData,rowIndex,pagingIndex,field) {
								return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: 'texType',
							title: 'Currency',
							width: 200,
							titleAlign: 'center',
							columnAlign:'center',

							formatter: function (rowData,rowIndex,pagingIndex,field) {
									return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: 'totalPrice',
							title: 'Total Price',
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',
						},
						{
							field: "supplierName",
							title: "Supplier",
							width: 160,
							titleAlign: 'center',
							columnAlign:'center',

							formatter: function (rowData,rowIndex,pagingIndex,field) {
									return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: 'valid',
							title: 'Valid',
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',
							isResize:true,
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = 1 == rowData[field] ? 'Yes' : 'No' ;
								return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},
						{
							field: 'receivedQuantity',
							title: 'Received <br/> Quantity',
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',

							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = null == rowData[field] ? 0 : rowData[field];
								return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},
						{
							field: 'receivedQuantity',
							title: 'Unsent <br/> Quantity',
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = 0;
								let receivedQty = null == rowData['receivedQuantity'] ? 0 : parseInt(rowData['receivedQuantity']);
								let qty = null == rowData['quantity'] ? 0 : parseInt(rowData['quantity']) ;
								result = qty - receivedQty;
								return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},
						{
							field: 'remark',
							title: 'Remark',
							width: 260,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = null == rowData[field] ? '' : rowData[field];
								return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},
					];
				}else{
					that.detailColumns = [
						{
							field: "orderId",
							title: "Order No.",
							width: 200,
							titleAlign: 'center',
							columnAlign:'center',
							isFrozen: true,
						 	formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:black;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: "orderDate",
							title: "Order Date",
							width: 140,
							titleAlign: 'center',
							columnAlign:'center',
							isResize:true,
							isFrozen: true,
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field].substr(0,10)+'</span>';
                           	}
						},
						{
							field: "productName",
							title: "Model",
							width: 120,
							titleAlign: 'center',
							columnAlign:'center',

							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: "quantity",
							title: "Quantity",
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',

							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: 'texType',
							title: 'Currency',
							width: 200,
							titleAlign: 'center',
							columnAlign:'center',

							formatter: function (rowData,rowIndex,pagingIndex,field) {
									return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: "supplierName",
							title: "Supplier",
							width: 160,
							titleAlign: 'center',
							columnAlign:'center',

							formatter: function (rowData,rowIndex,pagingIndex,field) {
									return '<span style="color:blue;font-weight: normal;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: 'valid',
							title: 'Valid',
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',
							isResize:true,
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = 1 == rowData[field] ? 'Yes' : 'No' ;
								return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},
						{
							field: 'receivedQuantity',
							title: 'Received <br/> Quantity',
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',

							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = null == rowData[field] ? 0 : rowData[field];
								return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},
						{
							field: 'receivedQuantity',
							title: 'Unsent <br/> Quantity',
							width: 100,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = 0;
								let receivedQty = null == rowData['receivedQuantity'] ? 0 : parseInt(rowData['receivedQuantity']);
								let qty = null == rowData['quantity'] ? 0 : parseInt(rowData['quantity']) ;
								result = qty - receivedQty;
								return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},
						{
							field: 'remark',
							title: 'Remark',
							width: 260,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = null == rowData[field] ? '' : rowData[field];
								return '<span style="color:blue;font-weight: normal;">'+ result +'</span>';
                           	}
						},
					];
				}


					that.displayDetailData = displayData;
			},

			//表格数据渲染方法
			initSupplierInventoryTable(displayData) {
				let that = this;
				let tem_selectBuName = that.selectBuName;
					that.replenishColumns = [
						{
							field: "productSku",
							title: "ModelNO",
							width: 133,
							titleAlign: 'center',
							columnAlign:'center',
							isFrozen: true,
						},
						{
							field: "businessUnitName",
							title: "BU",
							width: 111,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               let result = '';
                               if(tem_selectBuName)result = tem_selectBuName;
                               return result;
                           	}
						},
						{
							field: "localInventory",
							title: "(UPC)Local<br/>Inventory",
							width: 111,
							titleAlign: 'center',
							columnAlign:'center',
						 	formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:black;font-weight: bold;">'+rowData[field]+'</span>';
                           	}
						},
						{
							field: "fnskuLocalInventory",
							title: "(FNSKU)Local<br/>Inventory",
							width: 120,
							titleAlign: 'center',
							columnAlign:'center',
							formatter: function (rowData,rowIndex,pagingIndex,field) {
								let result = undefined == rowData[field] ? 0 : rowData[field];
                               	return '<span style="color:#black;font-weight: bold;">'+ result +'</span>';
                           	}
						},
						{
							field: 'amzInventory',
							title: 'AMZ<br/>Inventory',
							width: 111,
							titleAlign: 'center',
							columnAlign:'center',
						}, {
							field: 'totalInventory',
							title: 'Total<br/>Inventory',
							width: 111,
							titleAlign: 'center',
							columnAlign:'center',
						},{
							field: 'avgUnits',
							title: 'AvgUnits',
							width: 111,
							titleAlign: 'center',
							columnAlign:'center',
						},{
							field: 'amzLocalDays',
							title: 'Amz<br/>LocalDays',
							width: 111,
							titleAlign: 'center',
							columnAlign:'center',
						},{
							field: 'totalSellDays',
							title: 'Total Sell<br/>Days',
							width: 111,
							titleAlign: 'center',
							columnAlign:'center',
						},{
							field: 'ensureDays',
							title: 'Ensure<br/> Days',
							width: 111,
							titleAlign: 'center',
							columnAlign:'center',
						}, {
							field: 'replenishDays',
							title: 'Replenish<br/> Days',
							width: 111,
							titleAlign: 'center',
							columnAlign:'center',
						},{
							field: 'replenishUnits',
							title: 'Replenish<br/>Units',
							width: 111,
							titleAlign: 'center',
							columnAlign:'center',
						},{
							field: 'notifyDateStr',
							title: 'Notify Date',
							width: 143,
							titleAlign: 'center',
							columnAlign:'center',
							isEdit:true,
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:#007bff;font-weight: bold;">'+rowData[field]+'</span>';
                           	}
						},{
							field: 'deliveryDateStr',
							title: 'Delivery Date',
							width: 143,
							titleAlign: 'center',
							columnAlign:'center',
							isEdit:true,
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:#007bff;font-weight: bold;">'+rowData[field]+'</span>';
                           	}
						},{
							field: 'supplierReplyDateStr',
							title: 'Supplier ReplyDate',
							width: 143,
							titleAlign: 'center',
							columnAlign:'center',
							isEdit:true,
							formatter: function (rowData,rowIndex,pagingIndex,field) {
                               return '<span style="color:#007bff;font-weight: bold;">'+rowData[field]+'</span>';
                           	}
						},
					];
					that.displayInventorydata = displayData;
			},
	       	download_supplier(){
				let that=this;
				let _snapshotTime = that.selectedTimepoint?that.selectedTimepoint:'';
				if(!that.selectedTimepoint || that.selectedTimepoint.length <1 )
				{
					return;
				}
				let _countryIds = that.selectedCountrys && that.selectedCountrys !="" ?that.selectedCountrys.join(",") : '';
				let _sellerIds = that.selectedSeller && that.selectedSeller !="" ?that.selectedSeller.join(",") : '' ;
				let _productIds = that.selectBuProductIds && that.selectBuProductIds.length>0 ?that.selectBuProductIds.join(",") : '' ;
                window.open(this.serverUrl +'amzSupplierInExport/exportSupplierInfo?sellerIds='+_sellerIds+'&countryIds='+_countryIds+'&userId='+that.userId
                		+'&productIds='+_productIds +'&snapshotTime='+_snapshotTime+'&avgStartDate='+that.selectedByBrandAvgDate+' 00:00:00'
                		+'&avgSellerIds='+that.selectedBrandAvgSeller.join(",")+'&avgCountryIds='+that.selectedBrandAvgCountrys.join(","));
			},

			confirm_selectOrderStatistics(){
				$('#start_importOrderStatisticsData').click();
				Vue.nextTick(function() {
					document.getElementById('uploadOrderStatistics_stoExcel').value ='';
				});
			},
			confirm_select_apply_store(){
				$('#start_import_apply_store_data').click();
			},
			confirm_select_import_local_inventory(){
				let inventoryImportUrl = 'http://bison.leaderment.com/bison-web/supplierCategoryImport/updateCategoryByFile/'+this.localInventoryDate;
//				let inventoryImportUrl = 'http://localhost:8062/bison-web/supplierCategoryImport/updateCategoryByFile/'+this.localInventoryDate;

				document.getElementById("localInventory_form").action=inventoryImportUrl;
				$('#start_import_Local_inventory').click();
			},
			confirm_insert_detail_message(){
				let that = this;
				if(null == that.detail_row_model)that.detail_row_model = 1;
				if('' == that.public_row_orderId.trim() || that.public_row_orderId.length == 0 ||
					'' == that.detail_row_model ||
					'' == that.statistic_row_currency ){
					return;
				}

				let detail_insert_param = {
					orderId:that.public_row_orderId,
					orderDate:that.detail_row_orderDate + ' 00:00:00',
					supplierId:that.statistic_row_supplier,
					productId:that.detail_row_model,
					quantity:that.detail_row_quantity,
					price:that.detail_row_price,
					receivedQuantity:that.detail_row_recieved_quantity,
					texTypeId:that.statistic_row_currency,
					valid:that.statistic_row_valid,
					remark:that.detail_row_remark,
					supplementRemark : that.statistic_row_remark,
				};
				axios.post(this.serverUrl + 'supplementGoods/insertOrUpdateDetailData/', detail_insert_param,{
						headers: {
							"Access-Token": this.token
						}
					})
					.then((res) => {
						if(res.data.code == 200){
							let _data = res.data.data;
							that.searchItemList();
							that.initAllSupplementItem();
						}else{
							that.$root.requestError(res);
						}
					}).catch(err => {
						that.$root.requestError(err);
					});
			},
			changeAnchorNotDetail(){
				let that = this;
				that.itemShowStatistic = 'hide';
			},
			confirm_insert_statistic_message(){
				let that = this;

				if('' == that.statistic_row_orderId.trim() || that.statistic_row_orderId.length == 0 ||
					'' == that.statistic_row_supplier ){
					return;
				}
				let statistic_insert_param = {
					orderId:that.statistic_row_orderId,
					orderDate:that.statistic_row_orderDate + ' 00:00:00',
					supplierId:that.statistic_row_supplier,
					texTypeId:that.statistic_row_currency,
					valid:that.statistic_row_valid,
					remark:that.statistic_row_remark,
				};
				axios.post(this.serverUrl + 'supplementGoods/insertOrUpdateStatisticData/', statistic_insert_param,{
						headers: {
							"Access-Token": this.token
						}
					})
					.then((res) => {
						if(res.data.code == 200){
							let _data = res.data.data;
							that.searchStatisticList();
						}else{
							that.$root.requestError(res);
						}
					}).catch(err => {
						that.$root.requestError(err);
					});
			},
			confirm_delete_record(){
				let that = this;
				if(that.deleteRowType == 'statistic'){
					let tem_orderId = that.deleteOrderId;
                	axios.get(this.serverUrl + 'supplementGoods/deleteStatisticRowData/'+tem_orderId , {
							headers: {
								"Access-Token": this.token
							}
						})
						.then((res) => {
							if(res.data.code == 200){
								that.searchStatisticList();
							}else{
								that.$root.requestError(res);
							}
						}).catch(err => {
							that.$root.requestError(err);
						});

				}else if(that.deleteRowType == 'detail'){
					let tem_orderId = that.deleteOrderId;
                	let tem_productId = that.deleteProductId;
                	axios.get(this.serverUrl + 'supplementGoods/deleteDetailRowData/'+tem_orderId +'/'+tem_productId, {
							headers: {
								"Access-Token": this.token
							}
						})
						.then((res) => {
							if(res.data.code == 200){
								that.searchItemList();
							}else{
								that.$root.requestError(res);
							}
						}).catch(err => {
							that.$root.requestError(err);
						});
				}else if(that.deleteRowType == 'received'){
					let tem_receivedId = that.deleteReceivedId;
                	axios.get(this.serverUrl + 'supplementGoods/deleteReceivedRowData/'+tem_receivedId , {
							headers: {
								"Access-Token": this.token
							}
						})
						.then((res) => {
							if(res.data.code == 200){
								that.searchReceivedList();
							}else{
//								that.$root.requestError(res);
								that.searchReceivedList();
							}
						}).catch(err => {
//							that.$root.requestError(err);
							that.searchReceivedList();
						});
				}
			},
			confirm_insert_received_message(){
				let that = this;
				if('' == that.received_row_orderId.trim() || that.received_row_orderId.length == 0 ||
					null == that.received_row_productId ){
					return;
				}
				let statistic_insert_param = {
					orderReceivedId:that.received_row_orderReceivedId,
					orderId:that.received_row_orderId,
					productId:that.received_row_productId,
					recieveDate:that.received_row_recieveDate + ' 00:00:00',
					receivedQuantity:that.received_row_receivedQuantity,
					remark:that.received_row_remark,
				};

				axios.post(this.serverUrl + 'supplementGoods/insertOrUpdateReceivedData/', statistic_insert_param,{
						headers: {
							"Access-Token": this.token
						}
					})
					.then((res) => {
						if(res.data.code == 200){
							let _data = res.data.data;
							that.searchReceivedList();
						}else{
							//that.$root.requestError(res);
							that.searchReceivedList();
						}
					}).catch(err => {
						//that.$root.requestError(err);
						that.searchReceivedList();
					});
			},
			hasCheckTheFile(_file){
				this.selectLocalInventoryOrNot = true;
				let theFileDir = document.getElementById('uploadLocalInventorytoExcel').value;
				this.localInventoryFileDir = theFileDir;
			},
			check() {
	             return true;
	        },
	        receivedOperationFunction(params){
	        	let that = this;
                if (params.type === 'delete'){ // do delete operation
                    if(params.rowData){
                    	that.deleteReceivedId = params.rowData.orderReceivedId;
                    	that.deleteRowType = 'received';
                    	$("#alertDeleteTipModelId").modal("show");		//显示弹出框.
                    }
                }else if (params.type === 'edit'){ // do edit operation
                   	if(params.rowData){
                   		that.clickEditReceivedOneRow(params.rowData);
                   	}
                }
	        },
	        detailOperationFunction(params){
	        	let that = this;
                if (params.type === 'delete'){ // do delete operation
                    if(params.rowData){
                    	that.deleteOrderId = params.rowData.orderId;
                    	that.deleteProductId = params.rowData.productId;
                    	that.deleteRowType = 'detail';
                    	$("#alertDeleteTipModelId").modal("show");		//显示弹出框.
                    }
                }else if (params.type === 'edit'){ // do edit operation
                   	if(params.rowData){
                   		that.clickEditDetailOneRow(params.rowData);
                   	}
                }
           },
           statisticOperationFunction(params){
	        	let that = this;
                if (params.type === 'delete'){ // do delete operation
                    if(params.rowData){
                    	that.deleteOrderId = params.rowData.orderId;
                    	that.deleteRowType = 'statistic';
                    	$("#alertDeleteTipModelId").modal("show");		//显示弹出框.
                    }
                }else if (params.type === 'edit'){ // do edit operation
                   	if(params.rowData){
                   		that.clickEditStatisticOneRow(params.rowData);
                   	}
                }else if ( params.type === 'detail' ){
                	if(params.rowData){
                		that.public_row_orderId = params.rowData.orderId;
                		that.statistic_row_orderId = params.rowData.orderId;
                		that.statistic_row_orderDate = params.rowData.orderDate;
                		that.statistic_row_currency_texType = params.rowData.texType;
                		that.statistic_row_currency =  params.rowData.texTypeId;
                		that.statistic_row_supplier_name = params.rowData.supplierName;
                		that.statistic_row_valid = params.rowData.valid;
                		that.statistic_row_remark = params.rowData.remark;
                		that.statistic_row_supplier = params.rowData.supplierId;
                		that.itemShowStatistic = 'show';
//						document.getElementById('detailAnchorId').click();
						that.searchItemList();
                   	}
                }
            }

		},
		mounted(){
			this.init();
		},
		updated(){

		},
		//监听选中数据
		watch:{
			selectedBrandAvgBrandIds:function(value){
				let that = this;
				let tem_list = [];
				for(let brand of that.userBrandsList){
					if( value.includes(brand.brandId)){
						let arr = brand.sellerIds;
						for(let ite of arr){
							if(!tem_list.includes(ite)){
								tem_list.push(ite);
							}
						}

					}
				}

				if(null != tem_list && tem_list.length>0){
					that.selectedBrandAvgSeller=tem_list;
				}
			},
			selectedSeller:function(value){
					this.chooseDate();
			},
			selectedCountrys:function(value){
					this.chooseDate();
			},
			row_notifyDate:function(value){
				let that = this;
				if(value)
				that.row_notifyDate = value.split(" ")[0];
			},
			row_deliveryDate :function(value){
				let that = this;
				if(value)
				that.row_deliveryDate = value.split(" ")[0];
			},
			row_supplierReplyDate :function(value){
				let that = this;
				if(value)
				that.row_supplierReplyDate = value.split(" ")[0];
			},
			selectedBrandsIds:function(value){
				let that = this;
				let tem_list = [];
				that.selectedSeller = [];
				for(let brand of that.userBrandsList){
					if( value.includes(brand.brandId)){
						let arr = brand.sellerIds;
						for(let ite of arr){
							if(!tem_list.includes(ite)){
								tem_list.push(ite);
							}
						}

					}
				}
				if(null != tem_list && tem_list.length>0){
					that.selectedSeller=tem_list;
				}
				this.chooseDate();
			},
			selectedBuUnitId:function(value){
				let that = this;
				that.selectBuProductIds = [];
				for(let bu of that.buProducts){
					if(value == bu.businessUnitId){
						that.selectBuProductIds = bu.productIdList;
					}
				}
				for(let fi of that.financeBusinessUnitList){
					if(value == fi.businessUnitId){
						that.selectBuName = fi.businessUnitName;
					}
				}
				this.chooseDate();
			},
			detail_row_supplier:function(value){
				let that = this;
				let new_date = new Date();
				if(that.detail_row_orderDate){
					new_date = new Date(that.detail_row_orderDate);
				}
				let standardMonth = new_date.getMonth()+1;
				let tem_month = (standardMonth+"").trim().length == 1?('0'+ standardMonth).trim():standardMonth;
				let tem_date_number = (new_date.getDate()+"").trim().length == 1?('0'+new_date.getDate()).trim():new_date.getDate();
				let tem_str = new_date.getFullYear()+''+tem_month+''+tem_date_number;
				let tem_nick_name = '';
				for(let the_vo of that.allSupplier){
					if(value == the_vo.supplierId){
						tem_nick_name = the_vo.supplierNickname;
					}
				}

				let _result = tem_str + tem_nick_name;
				that.detail_row_orderId = _result;
			},
			detail_row_orderDate:function(value){
				let that = this;
				if( '' == that.detail_row_supplier || that.addDetailClick)return;
				let new_date = new Date();
				if(value){
					new_date = new Date(value);
				}
				let standardMonth = new_date.getMonth()+1;
				let tem_month = (standardMonth+"").trim().length == 1?('0'+ standardMonth).trim():standardMonth;
				let tem_date_number = (new_date.getDate()+"").trim().length == 1?('0'+new_date.getDate()).trim():new_date.getDate();
				let tem_str = new_date.getFullYear()+''+tem_month+''+tem_date_number;
				let tem_nick_name = '';
				for(let the_vo of that.allSupplier){
					if(that.detail_row_supplier == the_vo.supplierId){
						tem_nick_name = the_vo.supplierNickname;
					}
				}

				let _result = tem_str + tem_nick_name;
				that.detail_row_orderId = _result;
			},
			statistic_row_supplier:function(value){
				let that = this;
				if(null == value || '' == value || that.addDetailClick)return;
				let new_date = new Date();
				if(that.statistic_row_orderDate){
					new_date = new Date(that.statistic_row_orderDate);
				}
				let standardMonth = new_date.getMonth()+1;
				let tem_month = (standardMonth+"").trim().length == 1?('0'+ standardMonth).trim():standardMonth;
				let tem_date_number = (new_date.getDate()+"").trim().length == 1?('0'+new_date.getDate()).trim():new_date.getDate();
				let tem_str = new_date.getFullYear()+''+tem_month+''+tem_date_number;
				let tem_nick_name = '';
				for(let the_vo of that.allSupplier){
					if(value == the_vo.supplierId){
						tem_nick_name = the_vo.supplierNickname;
					}
				}


				let temp_sequence = '00';
				let _result;
				if(that.statistic_row_orderDate.length<1 || that.statistic_row_supplier.length<1)return;
				let qe_param = {
					orderDate : that.statistic_row_orderDate + ' 00:00:00',
					supplierId : that.statistic_row_supplier ,
				};
				axios.post(that.serverUrl + 'supplementGoods/getMaxStatisticSequence/', qe_param,{
						headers: {
							"Access-Token": that.token
						}
					})
					.then((res) => {
						if(res.data.code == 200){
							if(res.data.data){

								temp_sequence = res.data.data;
								_result = tem_str + temp_sequence +tem_nick_name;
								that.statistic_row_orderId = _result;	//重新渲染 rowId 信息.
							}
						}else{
							that.$root.requestError(res);
						}
					}).catch(err => {
						that.$root.requestError(err);
					});
				for(let suppli of that.allSupplier){
					if( suppli.supplierId == value ){
						that.statistic_row_supplier_name = suppli.supplierName;
					}
				}
			},
			statistic_row_orderDate:function(value){
				let that = this;
				if(null == value || '' == value || that.addDetailClick)return;
				if( '' == that.statistic_row_supplier)return;
				let new_date = new Date();
				if(value){
					new_date = new Date(value);
				}

				let standardMonth = new_date.getMonth()+1;
				let tem_month = (standardMonth+"").trim().length == 1?('0'+ standardMonth).trim():standardMonth;
				let tem_date_number = (new_date.getDate()+"").trim().length == 1?('0'+new_date.getDate()).trim():new_date.getDate();
				let tem_str = new_date.getFullYear()+''+tem_month+''+tem_date_number;
				let tem_nick_name = '';
				for(let the_vo of that.allSupplier){
					if(that.statistic_row_supplier == the_vo.supplierId){
						tem_nick_name = the_vo.supplierNickname;
					}
				}

				let temp_sequence = '00';
				let _result;
				if(value.length<1 || that.statistic_row_supplier.length<1)return;
				let qe_param = {
					orderDate : value + ' 00:00:00',
					supplierId : that.statistic_row_supplier ,
				};
				axios.post(that.serverUrl + 'supplementGoods/getMaxStatisticSequence/', qe_param,{
						headers: {
							"Access-Token": that.token
						}
					})
					.then((res) => {
						if(res.data.code == 200){
							if(res.data.data){

								temp_sequence = res.data.data;
								_result = tem_str + temp_sequence +tem_nick_name;
								that.statistic_row_orderId = _result;	//重新渲染 rowId 信息.
							}
						}else{
							that.$root.requestError(res);
						}
					}).catch(err => {
						that.$root.requestError(err);
					});

			},
			selectedReceivedSupplierIds:function(value){
				let that = this;

			},

			selectedDetailOrderIds:function(value){
				let that = this;
				that.couldSelectProductIds.length = 0 ;
				for(let order_id of value){
					for(let item of that.allSupplementItem){
						if(order_id == item.orderId){
							let product_param  = {
								productId : item.productId,
								productName : item.productName
							};
							that.couldSelectProductIds.push(product_param);
						}
					}
				}
				if(that.couldSelectProductIds.length>0){
					that.selectedDetailProductIds =
										that.couldSelectProductIds.map(function (item,index,input) {return item.productId;});
					Vue.nextTick(function() {
						$("#selectDetailProductIds").selectpicker('refresh');
					});
				}

			},

			received_row_orderId:function(value){
				let that = this;
				let tem_pro_ids = [];
				for(let suvo of that.allSupplementItem){
					if( value == suvo.orderId ){
						tem_pro_ids.push( suvo );
					}
				}
				if( tem_pro_ids.length>0 ) that.received_row_products = tem_pro_ids;
				Vue.nextTick(function() {
					$("#selectOneReceivedRowProduct").selectpicker('refresh');
				});

			},
			statistic_row_currency:function(value){
				let that = this;
				for(let oneCurr of that.allCurrency){
					if(oneCurr.texTypeId == value){
						that.statistic_row_currency_texType = oneCurr.texType;
					}
				}
			},

		}
	}

	Vue.component('received-table-operation',{
        template:
        		   	'<span style="font-weight: bold;">'+
//			        '<a href="" @click.stop.prevent="updateReceivedTableRow(rowData,index)" style="color:darkred" >Edit</a>&nbsp;&nbsp;&nbsp;'+
			        '<a href="" @click.stop.prevent="deleteReceivedTableRow(rowData,index)" style="color:purple" >Delete</a>'+
			        '</span>',
        props:{
            rowData:{
                type:Object
            },
            field:{
                type:String
            },
            index:{
                type:Number
            }
        },
        methods:{
            updateReceivedTableRow(){
               // 参数根据业务场景随意构造
               let params = {type:'edit',index:this.index,rowData:this.rowData};
               this.$emit('on-custom-comp',params);
            },
            deleteReceivedTableRow(){
                // 参数根据业务场景随意构造
                let params = {type:'delete',index:this.index,rowData:this.rowData};
                this.$emit('on-custom-comp',params);
            }
        }
	});
	  // 自定义列组件
    Vue.component('detail-table-operation',{
        template:
        		   	'<span style="font-weight: bold;">'+
//			        '<a href="" @click.stop.prevent="updateDetailTableRow(rowData,index)" style="color:darkred" >Edit</a>&nbsp;&nbsp;&nbsp;'+
			        '<a href="" @click.stop.prevent="deleteDetailTableRow(rowData,index)" style="color:purple" >Delete</a>'+
			        '</span>',
        props:{
            rowData:{
                type:Object
            },
            field:{
                type:String
            },
            index:{
                type:Number
            }
        },
        methods:{
            updateDetailTableRow(){
               // 参数根据业务场景随意构造
               let params = {type:'edit',index:this.index,rowData:this.rowData};
               this.$emit('on-custom-comp',params);
            },
            deleteDetailTableRow(){
                // 参数根据业务场景随意构造
                let params = {type:'delete',index:this.index,rowData:this.rowData};
                this.$emit('on-custom-comp',params);
            }
        }
    });


	// 自定义列组件
    Vue.component('statistic-table-operation',{
        template:
        		   	'<span style="font-weight: bold;">'+
			        '<a href="" @click.stop.prevent="statisticGotoDetailTable(rowData,index)" style="color:darkred" >Detail</a>'+
			        '</span>',
        props:{
            rowData:{
                type:Object
            },
            field:{
                type:String
            },
            index:{
                type:Number
            }
        },
        methods:{
            statisticGotoDetailTable(){
            	let params = {type:'detail',index:this.index,rowData:this.rowData};
                this.$emit('on-custom-comp',params);
            }
        }
    });
     // 自定义列组件
    Vue.component('statistic-table-delete-operation',{
        template:
        		   	'<span style="font-weight: bold;">'+
			        '<a href="" @click.stop.prevent="deleteStatisticTableRow(rowData,index)" style="color:purple" >Delete</a>&nbsp;&nbsp;&nbsp;'+
			        '</span>',
        props:{
            rowData:{
                type:Object
            },
            field:{
                type:String
            },
            index:{
                type:Number
            }
        },
        methods:{
            deleteStatisticTableRow(){
                // 参数根据业务场景随意构造
                let params = {type:'delete',index:this.index,rowData:this.rowData};
                this.$emit('on-custom-comp',params);
            },
        }
    });
</script>
