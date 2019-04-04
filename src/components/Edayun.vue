<template>
	<div class="container-fluid">
		<ol class="breadcrumb" style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">
		    <li class="breadcrumb-item"><a href="#">Home</a></li>
		    <li class="breadcrumb-item active">Invoice</li>
		    <li class="breadcrumb-item active">Edayun</li>
		</ol>
		<div class="row">
			<div class="col-lg-12">
				<div class="form-group form-inline">
					<div class="col-md-8" style="padding:0px !important">
						<!-- <button class="btn btn-primary" @click="showOrderByAmzIdModal">According to Amazon Order Id to create</button> -->
						<button class="btn btn-primary" @click="showCreateOrderModal">Create Order</button>

						<div class="custom-control custom-radio ml-2" style="display:inline-block">
							<input type="radio" id="customRadio1" name="customRadio"  class="custom-control-input" value="249" @change="selectCountry" checked v-model="countryId">
							<label class="custom-control-label" for="customRadio1">UK</label>
						</div>
						<div class="custom-control custom-radio  ml-2" style="display:inline-block">
							<input type="radio" id="customRadio2" name="customRadio"  class="custom-control-input" value="248" @change="selectCountry" v-model="countryId">
							<label class="custom-control-label" for="customRadio2">US</label>
						</div>
						<div class="custom-control custom-radio  ml-2" style="display:inline-block">
							<input type="radio" id="customRadio3" name="customRadio"  class="custom-control-input" value="50" @change="selectCountry" v-model="countryId">
							<label class="custom-control-label" for="customRadio3">Others</label>
						</div>
						<input id="edayunDateRange" type="text" class="form-control ml-2 dateRange" placeholder="Date Range">
					</div>
					<div class="text-right col-md-4" style="padding:0px !important">
			                <button id="downloadEdaYunExlFile" class="btn btn-success" @click="download()">Download Chart</button>
			        </div>
				</div>
				
				<table id="edayunTable"></table>
			</div>
		</div>
		<div class="modal fade" id="addOrderByAmazonOrderId" tabindex="-1" role="dialog" >
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title text-left" >Add Order</h4>
					</div>
					<div class="modal-body">
						<div class="row row-margin">
							<div class="col-lg-12">
								<div class="input-group">
									<textarea v-model="amzOrderIdStr">
										
									</textarea>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary"  @click="addOrderByAmzId" data-dismiss="modal">Add</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>

		<div class="modal fade" id="createOrder" tabindex="-1" role="dialog">
			<div class="modal-dialog">
				<div class="modal-content" style="width:1000px!important;left:-250px;">
					<div class="modal-header">
                            Create order
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-12 col-md-4">
                                    <textarea id="addressTXT" class="form-control" rows="21"
                                              placeholder="enter" @keyup="onchangeTextAddress"></textarea>
                                </div>
                                <div class="col-sm-12 col-md-8">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">Sales Platform <span
                                                    style="color: red">*</span></span>
                                            <select id="Platform" name="Platform" class="form-control selectpicker" v-model="platformValue"
                                                    data-live-search="true">
                                                <option value="eBay.co.uk">eBay.co.uk</option>
                                                <option value="Shopify">Shopify</option>
                                                <option value="Walmart">Walmart</option>
                                                <option value="Amazon.co.uk">Amazon.co.uk</option>
                                                <option value="Amazon.de">Amazon.de</option>
                                                <option value="Amazon.fr">Amazon.fr</option>
                                                <option value="Amazon.es">Amazon.es</option>
                                                <option value="Amazon.it">Amazon.it</option>
                                                <option value="Amazon.com">Amazon.com</option>
                                                <option value="Amazon.ca">Amazon.ca</option>
                                                <option value="Amazon.co.jp">Amazon.co.jp</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">Reference ID <span
                                                    style="color: red">*</span></span>
                                            <input type="text" class="form-control" id="Order_ID" name="Order_ID"
                                                   placeholder="Reference ID"/>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">FullName <span
                                                    style="color: red">*</span></span>
                                            <input type="text" class="form-control" id="FullName" name="FullName"
                                                   placeholder="FullName"/>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">AddressLine1 <span
                                                    style="color: red">*</span></span>
                                            <input type="text" class="form-control" id="AddressLine1"
                                                   name="AddressLine1" placeholder="AddressLine1"/>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">AddressLine2</span>
                                            <input type="text" class="form-control" id="AddressLine2"
                                                   name="AddressLine2" placeholder="AddressLine2"/>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">Town City <span style="color: red">*</span></span>
                                            <input type="text" class="form-control" id="Town_City" name="Town_City"
                                                   placeholder="Town City"/>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">County</span>
                                            <input type="text" class="form-control" id="County" name="County"
                                                   placeholder="County"/>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">Postcode <span
                                                    style="color: red">*</span></span>
                                            <input type="text" class="form-control" id="Postcode" name="Postcode"
                                                   placeholder="Postcode"/>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">Country <span
                                                    style="color: red">*</span></span>
                                            <select name="Country" id="Country" class="form-control selectpicker"
                                                    data-live-search="true">
                                                <option value="AL">Albania</option>
                                                <option value="DZ">Algeria</option>
                                                <option value="AS">American Samoa</option>
                                                <option value="AD">Andorra</option>
                                                <option value="AO">Angola</option>
                                                <option value="AI">Anguilla</option>
                                                <option value="AQ">Antarctica</option>
                                                <option value="AG">Antigua and Barbuda</option>
                                                <option value="AR">Argentina</option>
                                                <option value="AM">Armenia</option>
                                                <option value="AW">Aruba</option>
                                                <option value="AU">Australia</option>
                                                <option value="AT">Austria</option>
                                                <option value="AZ">Azerbaijan</option>
                                                <option value="BS">Bahamas, The</option>
                                                <option value="BH">Bahrain</option>
                                                <option value="BD">Bangladesh</option>
                                                <option value="BB">Barbados</option>
                                                <option value="BY">Belarus</option>
                                                <option value="BE">Belgium</option>
                                                <option value="BZ">Belize</option>
                                                <option value="BJ">Benin</option>
                                                <option value="BM">Bermuda</option>
                                                <option value="BT">Bhutan</option>
                                                <option value="BO">Bolivia</option>
                                                <option value="BQ">Bonaire</option>
                                                <option value="BA">Bosnia and Herzegovina</option>
                                                <option value="BW">Botswana</option>
                                                <option value="BV">Bouvet Island</option>
                                                <option value="BR">Brazil</option>
                                                <option value="IO">British Indian Ocean Territory</option>
                                                <option value="BN">Brunei Darussalam</option>
                                                <option value="BG">Bulgaria</option>
                                                <option value="BF">Burkina Faso</option>
                                                <option value="BI">Burundi</option>
                                                <option value="KH">Cambodia</option>
                                                <option value="CM">Cameroon</option>
                                                <option value="CA">Canada</option>
                                                <option value="CV">Cape Verde</option>
                                                <option value="KY">Cayman Islands</option>
                                                <option value="CF">Central African Republic</option>
                                                <option value="TD">Chad</option>
                                                <option value="CL">Chile</option>
                                                <option value="CN">China</option>
                                                <option value="CX">Christmas Island</option>
                                                <option value="CC">Cocos (Keeling) Islands</option>
                                                <option value="CO">Colombia</option>
                                                <option value="KM">Comoros</option>
                                                <option value="CG">Congo</option>
                                                <option value="CD">Congo, Democratic Republic of</option>
                                                <option value="CK">Cook Islands</option>
                                                <option value="CR">Costa Rica</option>
                                                <option value="HR">Croatia</option>
                                                <option value="CW">Curaçao</option>
                                                <option value="CY">Cyprus</option>
                                                <option value="CZ">Czech Republic</option>
                                                <option value="DK">Denmark</option>
                                                <option value="DJ">Djibouti</option>
                                                <option value="DM">Dominica, Commonwealth of</option>
                                                <option value="DO">Dominican Republic</option>
                                                <option value="TL">East Timor</option>
                                                <option value="EC">Ecuador</option>
                                                <option value="EG">Egypt</option>
                                                <option value="SV">El Salvador</option>
                                                <option value="GQ">Equatorial Guinea</option>
                                                <option value="ER">Eritrea</option>
                                                <option value="EE">Estonia</option>
                                                <option value="ET">Ethiopia</option>
                                                <option value="FK">Falkland Islands</option>
                                                <option value="FO">Faroe Islands</option>
                                                <option value="FJ">Fiji</option>
                                                <option value="FI">Finland</option>
                                                <option value="FR">France</option>
                                                <option value="GF">French Guiana</option>
                                                <option value="PF">French Polynesia</option>
                                                <option value="TF">French Southern Territories</option>
                                                <option value="GA">Gabon</option>
                                                <option value="GM">Gambia, The</option>
                                                <option value="GE">Georgia</option>
                                                <option value="DE">Germany</option>
                                                <option value="GH">Ghana</option>
                                                <option value="GI">Gibraltar</option>
                                                <option value="GR">Greece</option>
                                                <option value="GL">Greenland</option>
                                                <option value="GD">Grenada</option>
                                                <option value="GP">Guadeloupe</option>
                                                <option value="GU">Guam</option>
                                                <option value="GT">Guatemala</option>
                                                <option value="GG">Guernsey</option>
                                                <option value="GN">Guinea</option>
                                                <option value="GW">Guinea-Bissau</option>
                                                <option value="GY">Guyana</option>
                                                <option value="HT">Haiti</option>
                                                <option value="HM">Heard Island and the McDonald
                                                    Islands
                                                </option>
                                                <option value="VA">Holy See</option>
                                                <option value="HN">Honduras</option>
                                                <option value="HK">Hong Kong</option>
                                                <option value="HU">Hungary</option>
                                                <option value="IS">Iceland</option>
                                                <option value="IN">India</option>
                                                <option value="ID">Indonesia</option>
                                                <option value="IE">Ireland</option>
                                                <option value="IM">Isle of Man</option>
                                                <option value="IL">Israel</option>
                                                <option value="IT">Italy</option>
                                                <option value="CI">Ivory Coast (Côte D'ivoire)</option>
                                                <option value="JM">Jamaica</option>
                                                <option value="JP">Japan</option>
                                                <option value="JE">Jersey</option>
                                                <option value="JO">Jordan</option>
                                                <option value="KZ">Kazakhstan</option>
                                                <option value="KE">Kenya</option>
                                                <option value="KI">Kiribati</option>
                                                <option value="KR">Korea, Republic of</option>
                                                <option value="XK">Kosovo</option>
                                                <option value="KW">Kuwait</option>
                                                <option value="KG">Kyrgyzstan</option>
                                                <option value="LA">Lao, People's Democratic Republic</option>
                                                <option value="LV">Latvia</option>
                                                <option value="LB">Lebanon</option>
                                                <option value="LS">Lesotho</option>
                                                <option value="LR">Liberia</option>
                                                <option value="LY">Libya</option>
                                                <option value="LI">Liechtenstein</option>
                                                <option value="LT">Lithuania</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="MO">Macao</option>
                                                <option value="MK">Macedonia
                                                </option>
                                                <option value="MG">Madagascar</option>
                                                <option value="MW">Malawi</option>
                                                <option value="MY">Malaysia</option>
                                                <option value="MV">Maldives</option>
                                                <option value="ML">Mali</option>
                                                <option value="MT">Malta</option>
                                                <option value="MH">Marshall Islands</option>
                                                <option value="MQ">Martinique</option>
                                                <option value="MR">Mauritania</option>
                                                <option value="MU">Mauritius</option>
                                                <option value="YT">Mayotte</option>
                                                <option value="MX">Mexico</option>
                                                <option value="FM">Micronesia</option>
                                                <option value="MD">Moldova, Republic of</option>
                                                <option value="MC">Monaco</option>
                                                <option value="MN">Mongolia</option>
                                                <option value="ME">Montenegro</option>
                                                <option value="MS">Montserrat</option>
                                                <option value="MA">Morocco</option>
                                                <option value="MZ">Mozambique</option>
                                                <option value="MM">Myanmar</option>
                                                <option value="NA">Namibia</option>
                                                <option value="NR">Nauru</option>
                                                <option value="NP">Nepal</option>
                                                <option value="NL">Netherlands</option>
                                                <option value="AN">Netherlands Antilles</option>
                                                <option value="NC">New Caledonia</option>
                                                <option value="NZ">New Zealand</option>
                                                <option value="NI">Nicaragua</option>
                                                <option value="NE">Niger</option>
                                                <option value="NG">Nigeria</option>
                                                <option value="NU">Niue</option>
                                                <option value="NF">Norfolk Island</option>
                                                <option value="MP">Northern Mariana Islands</option>
                                                <option value="NO">Norway</option>
                                                <option value="OM">Oman</option>
                                                <option value="PK">Pakistan</option>
                                                <option value="PW">Palau</option>
                                                <option value="PA">Panama</option>
                                                <option value="PG">Papua New Guinea</option>
                                                <option value="PY">Paraguay</option>
                                                <option value="PE">Peru</option>
                                                <option value="PH">Philippines</option>
                                                <option value="PN">Pitcairn</option>
                                                <option value="PL">Poland</option>
                                                <option value="PT">Portugal</option>
                                                <option value="PR">Puerto Rico</option>
                                                <option value="QA">Qatar</option>
                                                <option value="RE">Reunion</option>
                                                <option value="RO">Romania</option>
                                                <option value="RU">Russian Federation</option>
                                                <option value="RW">Rwanda</option>
                                                <option value="SH">Saint Helena, Ascension and
                                                    Tristan da Cunha
                                                </option>
                                                <option value="KN">Saint Kitts and Nevis</option>
                                                <option value="LC">Saint Lucia</option>
                                                <option value="PM">Saint Pierre and Miquelon</option>
                                                <option value="VC">Saint Vincent and the Grenadines</option>
                                                <option value="WS">Samoa</option>
                                                <option value="SM">San Marino</option>
                                                <option value="ST">Sao Tome and Principe</option>
                                                <option value="SA">Saudi Arabia</option>
                                                <option value="SN">Senegal</option>
                                                <option value="RS">Serbia</option>
                                                <option value="SC">Seychelles</option>
                                                <option value="SL">Sierra Leone</option>
                                                <option value="SG">Singapore</option>
                                                <option value="SX">Sint Maarten</option>
                                                <option value="SK">Slovakia</option>
                                                <option value="SI">Slovenia</option>
                                                <option value="SB">Solomon Islands</option>
                                                <option value="SO">Somalia</option>
                                                <option value="ZA">South Africa</option>
                                                <option value="GS">South Georgia and the South
                                                    Sandwich Islands
                                                </option>
                                                <option value="ES">Spain</option>
                                                <option value="LK">Sri Lanka</option>
                                                <option value="SR">Suriname</option>
                                                <option value="SJ">Svalbard and Jan Mayen</option>
                                                <option value="SZ">Swaziland</option>
                                                <option value="SE">Sweden</option>
                                                <option value="CH">Switzerland</option>
                                                <option value="TW">Taiwan</option>
                                                <option value="TJ">Tajikistan</option>
                                                <option value="TZ">Tanzania, United Republic of</option>
                                                <option value="TH">Thailand</option>
                                                <option value="TG">Togo</option>
                                                <option value="TK">Tokelau</option>
                                                <option value="TO">Tonga</option>
                                                <option value="TT">Trinidad and Tobago</option>
                                                <option value="TN">Tunisia</option>
                                                <option value="TR">Turkey</option>
                                                <option value="TM">Turkmenistan</option>
                                                <option value="TC">Turks and Caicos Islands</option>
                                                <option value="TV">Tuvalu</option>
                                                <option value="UG">Uganda</option>
                                                <option value="UA">Ukraine</option>
                                                <option value="AE">United Arab Emirates</option>
                                                <option value="GB" selected="">United Kingdom</option>
                                                <option value="US">United States</option>
                                                <option value="UM">United States Minor Outlying
                                                    Islands
                                                </option>
                                                <option value="UY">Uruguay</option>
                                                <option value="UZ">Uzbekistan</option>
                                                <option value="VU">Vanuatu</option>
                                                <option value="VE">Venezuela</option>
                                                <option value="VN">Vietnam</option>
                                                <option value="VG">Virgin Islands, British</option>
                                                <option value="VI">Virgin Islands, US</option>
                                                <option value="WF">Wallis and Futuna</option>
                                                <option value="EH">Western Sahara</option>
                                                <option value="YE">Yemen</option>
                                                <option value="ZM">Zambia</option>
                                                <option value="ZW">Zimbabwe</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">PhoneNumber</span>
                                            <input type="text" id="PhoneNumber" name="PhoneNumber" class="form-control"
                                                   placeholder="PhoneNumber">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="layui-inline">
                                            <select id="edaCountry" name="edaCountry" class="form-control selectpicker"
                                                    data-live-search="true" v-model="couId">
                                                <option value="">===Country===</option>
                                                <option v-for="item in countryList" :key="item.countryId" :value="item.countryId">{{ item.countryName}}</option>
                                            </select>
                                        </div>

                                        <div class="layui-inline">
                                            <select id="Product" name="Product" class="form-control selectpicker"
                                                    data-live-search="true" v-model="proId">
                                                <option value="">===Product===</option>
                                                <option v-for="item in productList" :key="item.productId" :value="item.productId">{{ item.productSku}}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">EdsSku</span>
                                            <select id="edayunSkuSelect" class="form-control selectpicker"
                                                    data-live-search="true" v-model="selectedSku">
                                                    <option  v-for="item in edayunSkuList" :key="item.edaYunSkuId" :value="item.edaYunSku">{{item.edaYunSku}}</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div class="form-group text-right">
                                    	<div class="input-group">
	                                    	<span class="input-group-addon" style="text-align:left">Qty</span>
	                                        <input id="tempQty" type="text" value="1" placeholder="Qty" 
	                                               class="form-control">
                                        </div>
                                        <!-- <button id="appendAsin" class="layui-btn" style="margin-top: 5px;float: right">添加</button> -->
                                        <button type="button" id="appendAsin" class="btn btn-success"
                                                style="margin-top: 5px;"@click="addToEdayunTable">Add
                                        </button>
                                    </div>

                                    <div class="form-group">
                                        <table id="edayunSkuTable"
                                               class="table table-bordered table-striped">

                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
							<span class="input-group-btn">
								<button id="manualAdd" class="btn btn-success" data-dismiss="modal" @click="createNewOrder">Create</button>
							</span>
                        </div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
	</div>
</template>
<style type="text/css" scoped>
	textarea{
		width:100%;
		height:100%;
		margin:0 auto;
	}
	.input-group-addon{
		margin:auto;
	}
/*	.custom-control-label::before,.custom-control-label::after{
		top:0.55rem;
	}*/
	.input-group-addon{
		width:120px;
	}
</style>
<script type="text/javascript">

	import axios from "axios";
	import $ from "jquery";
	import Vue from 'vue'
	import moment from 'moment';

	export default{
		data(){
			return {
				isNotInit:true,
				serverUrl:"",
				token:"",
				axiosRequest:this.$root.axiosRequest,
				userId:0,
				parentId:0,
				platformList:[],
				countryList:[],
				edayunSkuList:[],
				selectedSku:"",
				productList:[],

				amzOrderIdStr:"",

				//创建新订单的数据
				orderDataObj:{
					"addressLine1": "",
					"addressLine2": "",
					"country": "",
					"countryId": 0,
					"county": "",
					"ctime": "",
					"edaYunOrderId": 0,
					"fullname": "",
					"isSubmit": 0,
					"orderId": "",
					"orderItemList": [
					    // {
					    //   "edaYunItemId": 0,
					    //   "edaYunOrderId": 0,
					    //   "edaYunSku": "string",
					    //   "qty": 0
					    // }
					],
					"phoneNumber": "",
					"platform": "",
					"postcode": "",
					"statusId": 0,
					"townCity": "",
					"utime": ""
				},
				edayunSkuTableData:[],
				countryId:"",
				platformValue:"",
				selectedCountryId:"",
                couId:"",
                proId:"",
			}
		},
		methods:{
			init(){
				var that = this;

				if(this.$store.state.baseData && this.isNotInit){
					this.isNotInit=false;
					
					this.countryList = this.$store.state.baseData.countries;
					this.platformList = this.countryList.map(function (item,index,input) {return item.countryUrl;});
					this.productList= this.$store.state.products;

					this.serverUrl=this.$store.state.baseData.pageHandlers;
					this.token = this.$store.state.baseData.userInfo.token;
					this.userId=this.$store.state.baseData.userInfo.userId;
					this.parentId=this.$store.state.baseData.userInfo.parentId;

				    //初始化事件
				   	this.initEdayunSkuList();
					//时间控件初始化
					Vue.nextTick(function(){
						$("#Country").selectpicker();
						$("#edaCountry").selectpicker();
						$("#Product").selectpicker();
						$("#Platform").selectpicker();
						$('#edayunDateRange').daterangepicker(
							{
								singleDatePicker: true,
        						showDropdowns: true,
        						locale: {
									format: 'YYYY-MM-DD'
								},
							},
						);
						//初始化时间的change事件(无法用@change 只能用@click 所以只能用jquery的方法来写)
						$("#edayunDateRange").change(function(){
							var selectedDate = $("#edayunDateRange").val();
							axios.get(that.serverUrl + 'edaYunOrder/getOrderByCouIdAndDate?countryId='+that.selectedCountryId+"&stime="+selectedDate+"&offset=0&limit=10",{
								headers:{"Access-Token":that.token}
							}).then((res)=>{
								if(res.data.code == 200){
									var data = res.data.data;
									that.selectCountry(that.countryId)
								}else{
									that.$root.requestError(res)
								}
							}).catch(err =>{
								that.$root.requestError(err)
							})
						})

                       that.selectCountry(that.countryId)
					})
				}
			},
			initEdayunSkuList(){
				axios.get(this.serverUrl + "edaYunAsinSku/getAll",{
					headers:{"Access-Token":this.token}
				}).then((res)=>{
					if(res.data.code == 200){
						this.edayunSkuList = res.data.data;
						Vue.nextTick(function(){
							$("#edayunSkuSelect").selectpicker()
						})
					}else{
						this.$root.requestError(res);
					}
				}).catch(err =>{
					this.$root.requestError(err)
				})
			},
			initEdayunTable(data){
				var that = this;
						$("#edayunTable").bootstrapTable('destroy');
						$("#edayunTable").bootstrapTable({
							// showColumns:true,
							// toolbar:".toolbar",
							columns:[{
										field : 'orderId',
										title : "Order ID"
									},{
										field : 'platform',
										title : "Platform"
									}, {
										field : 'fullname',
										title : "FullName"
									}, {
										field : 'addressLine1',
										title : "AddressLine1"
									}, {
										field : 'addressLine2',
										title : "AddressLine2"
									}, {
										field : 'townCity',
										title : "City"
									}, {
										field : 'county',
										title : "County"
									}, {
										field : 'postcode',
										title : "Postcode"
									}, {
										field : 'country',
										title : "Country"
									}, {
										field : 'phoneNumber',
										title : "PhoneNumber"
									}, {
										field : 'edaYunOrderId',
										title : "Operation",
										align:"center",
										formatter : function(value, row, index) {
											return '<div class="btn btn-danger deleteOrder">Delete</div> ';
										},
										events:{
											'click .deleteOrder':function(e,value,row,index){

												axios.delete(that.serverUrl + "edaYunOrder/deleteOrder?idList="+value,{
													headers:{"Access-Token":that.token}
												}).then((res)=>{
													if(res.data.code == 200){
														that.selectCountry(that.countryId);
													}else{
														that.$root.requestError(res)
													}
												}).catch(err =>{
													that.$root.requestError(err)
												})
											}
										} 
									}],
						    data:data
						})
			},
			showOrderByAmzIdModal(){
				this.amzOrderIdStr = "";
				$("#addOrderByAmazonOrderId").modal("show");
			},
			//根据亚马逊订单id添加
			addOrderByAmzId(){
				var data = this.amzOrderIdStr.split(",");
				axios.post(this.serverUrl + 'edaYunOrder/createOrderEx',data,{
					headers:{"Access-Token":this.token}
				}).then((res)=>{
					if(res.data.code == 200){
						this.initEdayunTable();
					}else{
						this.$root.requestError(res)
					}
				}).catch(err =>{
					this.$root.requestError(err)
				})
			},
			showCreateOrderModal(){
                $("#Order_ID").val('');
                //Platform
                $("#FullName").val('');
                //Country
                $("#County").val('');
                $("#Town_City").val('');
                $("#AddressLine1").val('');
                $("#AddressLine2").val('');
                $("#Postcode").val('');
                $("#PhoneNumber").val('');
				$("#createOrder").modal("show")
			},
			//创建order时候modal里面的table添加行数据
			addToEdayunTable(){
				var num = Number($("#tempQty").val());
				var i = this.edayunSkuTableData.length;
				this.edayunSkuTableData.push({qty:num,edaYunSku:this.selectedSku,edaYunOrderId:0,edaYunItemId:0})
				this.initEdayunSkuTable();
			},
			//加载eds的table，数据只包含sku和数量
			initEdayunSkuTable(){
				var that = this;
				$("#edayunSkuTable").bootstrapTable("destroy");
				$("#edayunSkuTable").bootstrapTable({
					pagination : false,// 分页
					columns:[{
								field : 'qty',
								title : "Quantity",
                                align : "center"
							}, {
								field : 'edaYunSku',
								title : "Edayun Sku",
                                align : "center"
							},{
								title:"delete",
                                align : "center",
								formatter:function(value,row){
									var button = "<button class='btn btn-danger edayunSkuTableDeleteBtn'>Delete</button>"
									return [button].join("");
								},
								events:{
									'click .edayunSkuTableDeleteBtn':function(e,value,row,index){
										var id = index;
										that.edayunSkuTableData.splice(id,1);
										that.initEdayunSkuTable();
									}
								}
							}],
					data:this.edayunSkuTableData
				});
			},
			//添加新订单
			createNewOrder(){
                for( let skuData of this.edayunSkuTableData ){
                    delete skuData.asinIndex
                }
                let go_on_flag = true;
                let selelect_country_list = document.getElementById("Country");
				for(let i=0 ; i<selelect_country_list.length ;i++){
					if($("#Postcode").val() == selelect_country_list.options[i].text ){
						go_on_flag = false;
					}
					
				}
				if(!go_on_flag){
					alert('Please check input value!');
					return;
				}
                
				this.orderDataObj.orderItemList = this.edayunSkuTableData;
				this.orderDataObj.addressLine1 = $("#AddressLine1").val();
				this.orderDataObj.addressLine2 = $("#AddressLine2").val();
				this.orderDataObj.country = $("#Country").val();
				this.orderDataObj.countryId = Number($("#edaCountry").val());
				this.orderDataObj.county = $("#County").val();
				this.orderDataObj.fullname = $("#FullName").val();
				this.orderDataObj.phoneNumber = $("#PhoneNumber").val()?$("#PhoneNumber").val():0;
				this.orderDataObj.platform = this.platformValue;
				this.orderDataObj.postcode = $("#Postcode").val();
				this.orderDataObj.townCity = $("#Town_City").val();
                this.orderDataObj.orderId = $("#Order_ID").val();
				var data = this.orderDataObj;
				axios.post(this.serverUrl+'edaYunOrder/addOrder',data,{
					headers:{"Access-Token":this.token}
				}).then((res)=>{
					if(res.data.code == 200){
						this.selectCountry(this.countryId)
					}else{
						this.$root.requestError(res)
					}
				}).catch(err =>{
					this.$root.requestError(err)
				})
			},
			selectCountry(value){
                if(value.target){
                    this.selectedCountryId = value.target.defaultValue
                }else{
                    this.selectedCountryId = value
                }
				
				var selectedDate = $("#edayunDateRange").val();
				axios.get(this.serverUrl + 'edaYunOrder/getOrderByCouIdAndDate?countryId='+this.selectedCountryId+"&stime="+selectedDate+"&offset=0&limit=10",{
					headers:{"Access-Token":this.token}
				}).then((res)=>{
					if(res.data.code == 200){
						var data = res.data.data.rows;
						this.initEdayunTable(data)
					}else{
						this.$root.requestError(res)
					}
				}).catch(err =>{
					this.$root.requestError(err)
				})
			},
			onchangeTextAddress(){
                var that = this;
                //清空现场
                $("#Order_ID").val('');
                //Platform
                $("#FullName").val('');
                //Country
                $("#County").val('');
                $("#Town_City").val('');
                $("#AddressLine1").val('');
                $("#AddressLine2").val('');
                $("#Postcode").val('');
                $("#PhoneNumber").val('');
                //将Excel每个单元格分开（格式为第一个是 Reference ID，第二个是产品asin，第三个是发货数量，第四个是用户的信息）
				var initAddressTXT=$("#addressTXT").val().trim().split("\t");
                if(initAddressTXT.length <= 1){
                    return
                }
                //Reference ID
                $("#Order_ID").val(initAddressTXT[0]);

                //生成产品table
                var skuAsinData = initAddressTXT[1].split("\n");
                var qtyData =  initAddressTXT[2].split("\n"); 

                //用户信息
                var orderDetail = initAddressTXT[3].split("\n");
                var countryName = orderDetail[orderDetail.length - 1];
                var countryId = "";

                for(var i = 0, len = this.countryList.length ;i< len ;i++){
                    if(this.countryList[i].countryName+'"' == countryName){
                        countryId = this.countryList[i].countryId
                    }
                }

                for(var i = 0, len = $("#Country").find("option").length ; i< len; i++){
                    if($("#Country").find("option").eq(i).text()+'"' == countryName){
                        var value = $("#Country").find("option").eq(i).val();
                        $("#Country").selectpicker("val",value);
                    }
                }

                that.edayunSkuTableData = [];

                for(var i = 0 ; i< skuAsinData.length ;i++){
                    var asin = skuAsinData[i];
                    that.edayunSkuTableData.push({qty:qtyData[i],edaYunSku:"",edaYunOrderId:initAddressTXT[0],edaYunItemId:0,asinIndex:i})
                    axios.get(that.serverUrl +'edaYunAsinSku/selectEdaYunSkuByAsin',{
                        params:{
                            asin:asin
                        },
                        headers:{"Access-Token":that.token}
                    }).then((res)=>{
                        if(res.data.code == 200){
                            var data = res.data.data;
                            for(var k = 0 ,len = data.length ; k <len ; k++){
                                var index = that.edayunSkuTableData[that.edayunSkuTableData.length - 1].asinIndex;
                                var skuTableIndex = that.edayunSkuTableData.length - 1;
                                if(skuAsinData[index] == data[k].asin){
                                    that.edayunSkuTableData[skuTableIndex].edaYunSku = data[k].edaYunSku;
                                    that.edayunSkuTableData[skuTableIndex].edaYunItemId = data[k].edaYunSkuId;
                                    that.edayunSkuTableData[skuTableIndex].edaYunOrderId = 0;
                                }
                            }
                            that.initEdayunSkuTable();
                        }else{
                            that.$root.requestError(res)
                        }
                    }).catch(err =>{
                        that.$root.requestError(err)
                    })

                }
                
                var addressTXT=$("#addressTXT").val();
				addressTXT=addressTXT.replace(/\t/g, "\n");
				addressTXT=addressTXT.replace(/\n\n\n\n/g, "\n");
				addressTXT = addressTXT.replace(/\"/g,'');
				// $("#addressTXT").val(addressTXT);
				var address=addressTXT.split("\n");
				var addArr = $("#addressTXT").val().split('"');
				var addArrlength = addArr.length;
				for(var i=0; i<address.length;i++)
				{
					var fdStart = address[i].indexOf("\"");
					if(fdStart == 0){
						address[i]=address[i].substring(1,address[i].length);
		//				console.log(address[i]+" "+i);
					}
					
					if(fdStart==(address[i].length-1))
					{
						address[i]=address[i].substring(0,address[i].length-1);
		//				console.log(address[i]+" "+i);
					}
				}
				
				if(address.length>=7)
				{
					var addressLength = address.length;
					//Platform
					$("#FullName").val(addArr[addArrlength-2].split("\n")[0]);
					$("#AddressLine1").val(addArr[addArrlength-2].split("\n")[1]);
					$("#AddressLine2").val(addArr[addArrlength-2].split("\n")[2]);
					$("#Town_City").val(addArr[addArrlength-2].split("\n")[3]);
					if(addArr[addArrlength-2].split("\n").length == 5){
						$("#County").val(addArr[addArrlength-2].split("\n")[4]);
					}
					if(addArr[addArrlength-2].split("\n").length == 6){
						$("#County").val(addArr[addArrlength-2].split("\n")[4]);
						$("#Postcode").val(addArr[addArrlength-2].split("\n")[5]);
					}
					if(addArr[addArrlength-2].split("\n").length == 7){
						$("#County").val(addArr[addArrlength-2].split("\n")[4]);
						$("#Postcode").val(addArr[addArrlength-2].split("\n")[5]);
					}
		            if(addArr[addArrlength-2].split("\n").length == 8){
		            	$("#County").val(addArr[addArrlength-2].split("\n")[4]);
		            	$("#Postcode").val(addArr[addArrlength-2].split("\n")[5]);
		            	$("#PhoneNumber").val(addArr[addArrlength-2].split("\n")[7]);	
		            }
				}
			},
			download(){
				var selectedDate = $("#edayunDateRange").val();
                window.open(this.serverUrl +'edaYunOrder/dataExport?countryId='+this.selectedCountryId+'&stime='+selectedDate);
			},
            initEdayunSkuListByCouIdAndProId(){
                let that = this;
                that.axiosRequest("get","edaYunAsinSku/getAllByCouIdAndProId?countryId="+that.couId+"&productId="+that.proId,"",that.token,function(res){
                    that.edayunSkuList = res;
                    Vue.nextTick(function(){
                        $("#edayunSkuSelect").selectpicker("refresh");
                    })
                })
            }
		},
		mounted(){
			this.init();
		},
        watch:{
            proId:function(value){
                if(this.couId != ""){
                    this.initEdayunSkuListByCouIdAndProId();
                }
            },
            couId:function(value){
                if(this.proId != ""){
                    this.initEdayunSkuListByCouIdAndProId();
                }
            }
        }
	}
</script>