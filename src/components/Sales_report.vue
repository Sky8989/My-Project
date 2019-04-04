<template>
  <div id="sales_report" class="container-fluid">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">Home</a></li>
      <li class="breadcrumb-item active">Sales</li>
      <li class="breadcrumb-item active">Business Report</li>
    </ol>

    <div class="row row-margin" v-show = "displayOrHideCompare == 'Hide Compare'">
      <div class="col-xl-3 col-sm-3 mb-3">
        <div class="card o-hidden bg-primary text-white h-100">
          <div class="card-body">
            <div class="card-body-icon">
              <i class="fa fa-fw fa-eye"></i>
            </div>
            <div class="mr-5">
              <h4 class="row ml-2">
                Sessions:
              </h4>
              <div class="row mx-auto">
                <div class="col-lg-6 text-right">
                  {{lastMonth.Time}} {{lastMonth.SessionsTotal}}<br /> {{lastMonth.SessionsAvg}}<br /> {{lastMonth.SessionPercentage}}
                </div>
                <div class="col-lg-6 text-right">
                  {{thisMonth.Time}} {{thisMonth.SessionsTotal}}<br /> {{thisMonth.SessionsAvg}}<br /> {{lastMonth.SessionPercentage}}
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer clearfix z-1" href="#">
	              <span class="float-right">
	                <i class="fa " v-bind:class="{'fa-arrow-up':growthData.Sessions, 'fa-arrow-down':growthData.Sessions<0}"></i>
					{{growthData.Sessions}}%
	              </span>
          </div>
        </div>
      </div>



      <div class="col-xl-3 col-sm-3 mb-3">
        <div class="card o-hidden bg-warning text-white h-100">
          <div class="card-body">
            <div class="card-body-icon">
              <i class="fa fa-fw fa-cube" ></i>
            </div>
            <div class="mr-5">
              <h4 class="row ml-2">
                Unit Ordered:
              </h4>
              <div class="row mx-auto">
                <div class="col-lg-6 text-right">
                  {{lastMonth.Time}} {{lastMonth.UnitOrderedTotal}}<br /> {{lastMonth.UnitOrderedAvg}}
                </div>
                <div class="col-lg-6 text-right">
                  {{thisMonth.Time}} {{thisMonth.UnitOrderedTotal}}<br /> {{thisMonth.UnitOrderedAvg}}
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer clearfix z-1" href="#">
	              <span class="float-right">
	                <i class="fa " v-bind:class="{'fa-arrow-up':growthData.UnitOrdered, 'fa-arrow-down':growthData.UnitOrdered<0}"></i>
	                {{growthData.UnitOrdered}}%
	              </span>
          </div>
        </div>
      </div>


      <div class="col-xl-3 col-sm-3 mb-3">
        <div class="card o-hidden bg-success text-white h-100">
          <div class="card-body">
            <div class="card-body-icon">
              <i class="fa fa-fw fa-cubes"></i>
            </div>
            <div class="mr-5">
              <h4 class="row ml-2">
                Session Percentage:
              </h4>
              <div class="row mx-auto">
                <div class="col-lg-6 text-right">
                  {{lastMonth.Time}} {{lastMonth.SessionPercentage}}<br />
                </div>
                <div class="col-lg-6 text-right">
                  {{thisMonth.Time}} {{thisMonth.SessionPercentage}}<br />
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer clearfix z-1" href="#">
	              <span class="float-right">
	                <i class="fa " v-bind:class="{'fa-arrow-up':growthData.SessionPercentage, 'fa-arrow-down':growthData.SessionPercentage<0}"></i>
	                {{growthData.SessionPercentage}}%
	              </span>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-sm-3 mb-3">
        <div class="card o-hidden bg-danger text-white h-100">
          <div class="card-body">
            <div class="card-body-icon">
              <i class="fa fa-fw fa-dollar"></i>
            </div>
            <div class="mr-3">
              <h4 class="row ml-2">
                Sales:
              </h4>
              <div class="row mx-auto">
                <div class="col-lg-6 text-right">
                  {{lastMonth.Time}} {{lastMonth.SalesTotal}}<br /> {{lastMonth.SalesAvg}}
                </div>
                <div class="col-lg-6 text-right">
                  {{thisMonth.Time}} {{thisMonth.SalesTotal}}<br /> {{thisMonth.SalesAvg}}
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer clearfix z-1" href="#">
	              <span class="float-right">
	                <i class="fa " v-bind:class="{'fa-arrow-up':growthData.SalesAvgPercententage, 'fa-arrow-down':growthData.SalesAvgPercententage<0}"></i>
	                {{growthData.SalesAvgPercententage}}%
	              </span>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 mb-3">
        <!--<select multiple id="selectSeller" data-selected-text-format="count > 2" class="selectpicker" @change="chooseBrand" v-model="selectedSeller" data-actions-box="true" data-live-search="true" title="All Seller">
                  <option v-for="seller in sellerList" :key="seller.sellerId" :value="seller.sellerId">{{seller.sellerName}}</option>
                </select>-->
        <select id="selectBrand" class="selectpicker" v-model="selectedBrandsIds" data-live-search="true" title="Select Seller" multiple data-selected-text-format="count > 2" data-actions-box="true" @change="chooseBrand">
          <option v-for="seller in userBrandsList" :key="seller.brandId" :value="seller.brandId">{{seller.brandName}}</option>
        </select>
        <select multiple id="selectCountry" data-selected-text-format="count > 4"  class="selectpicker" @change="chooseCountry" v-model="selectedCountry" data-actions-box="true" data-live-search="true" title="All Country">
          <option v-for="country in countryList" :key="country.countryId" :value="country.countryId">{{country.countryName}}</option>
        </select>
        <select id="selectBusinessUnitId" class="selectpicker" v-model="selectedBuIds" title="Select BU" data-live-search="true" multiple data-selected-text-format="count > 2" data-actions-box="true" @change="chooseBusinessUnit" >
          <option v-for="fbu in financeBusinessUnitList" :key="fbu.businessUnitId" :value="fbu.businessUnitId">{{fbu.businessUnitName}}</option>
        </select>
        <select multiple id="selectProduct" data-selected-text-format="count > 3" class="selectpicker" @change="chooseProduct" v-model="selectedProduct" data-actions-box="true" data-live-search="true" title="All Product">
          <option v-for="productClass in productClassList" :key="productClass.classId" :value="productClass">{{productClass.className}}</option>
          <option v-if="productClassList.length > 0" data-divider="true"></option>
          <option v-for="product in temproductList" :key="product.productId" :value="product">{{product.productSku}}</option>
        </select>
        <button style="display:inline;width:auto;margin-left: 15px;" class="btn btn-primary" @click="commit_function">Submit</button>
        <button class="btn btn-info btn-sm" @click="smallButtonOnclick($event,'compare')" >{{displayOrHideCompare}}</button>
        <button class="btn btn-default btn-sm" @click="smallButtonOnclick($event,'summary')">{{displayOrHideSummary}}</button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="form-group form-inline">
          <div class="control-label ml-2" for="dateRange">Date Range</div>
          <input id="dateRange" type="text" class="form-control col-lg-2 ml-2 dateRange" placeholder="DateRange" aria-describedby="basic-addon1">
          <div v-show="isLinkRatio" class="form-group ml-2">
            <div class="control-label" for="linkRatiodateRange">Date Range</div>
            <input id="linkRatiodateRange" type="text" class="form-control ml-2 dateRange" placeholder="DateRange" aria-describedby="basic-addon2">
          </div>
          <div class="custom-control custom-checkbox ml-2">
            <input id="linkRatioSwitch" @click="viewDetail" type="checkbox" class="custom-control-input" name="linkRatioSwitch" v-model="isLinkRatio"/>
            <label class="custom-control-label" for="linkRatioSwitch">Link Ratio</label>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-3" v-show = "displayOrHideSummary == 'Hide Summary'">
      <div class="card-header">
        <i class="fa fa-cubes"></i> Summary
      </div>
      <div class="card-body">
        <div class="row row-margin">

          <div class="col-lg-12">
            <table class="table table-bordered" style='width:100%;text-align: center;' >
              <tr>
                <td><span></span></td>
                <td><span >Time Range</span></td>
                <td><span >Sessions</span></td>
                <td><span >Session Percentage</span></td>
                <td><span >UnitsOrdered</span></td>
                <td><span >OrderItems</span></td>
                <td><span >Sales</span></td>
              </tr>
              <tr>
                <td><span>Total</span></td>
                <td><span>{{summary_row_time}}</span></td>
                <td><span>{{summary_row_sessions_total}}</span></td>
                <td><span>{{summary_row_sessionPercentage_total}}</span></td>
                <td><span>{{summary_row_unitsOrdered_total}}</span></td>
                <td><span>{{summary_row_totalOrderItems_total}}</span></td>
                <td><span>{{summary_row_orderedProductSales_total}}</span></td>
              </tr>
              <tr>
                <td><span>AVG</span></td>
                <td><span>{{summary_row_time}}</span></td>
                <td><span>{{summary_row_sessions_avg}}</span></td>
                <td><span>{{summary_row_sessionPercentage_avg}}</span></td>
                <td><span>{{summary_row_unitsOrdered_avg}}</span></td>
                <td><span>{{summary_row_totalOrderItems_avg}}</span></td>
                <td><span>{{summary_row_orderedProductSales_avg}}</span></td>
              </tr>
            </table>

          </div>
        </div>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header">
        <i class="fa fa-calendar"></i> Daily Details
      </div>
      <div class="card-body">
        <div id="toolsBar" >
          <button id="exportBySku" class="btn btn-sm btn-default" @click="exportCSVFile('dateRangeData')">
            <i class="fa fa-fw fa-cloud-download"></i>
            Download
          </button>
        </div>
        <div class="row row-margin">
          <div class="col-lg-12">
            <table id="dateRangeData"></table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  //数组去重
  Array.prototype.reArr = function(){
    var newArr = [];
    for(var i = 0; i < this.length; i++){
      if(newArr.indexOf(this[i])== -1){
        newArr.push(this[i]);
      }
    }
    return newArr;
  }

  import axios from 'axios';
  import moment from 'moment';
  import header from '../header.vue'
  import dragableColumns from "../../js/dragndrop.table.columns.js"
  import Vue from 'vue'
  import TableExport from 'tableexport'
  export default {
    data(){
      return {
        isNotInit:true,
        serverUrl:"",
        token:"",

        userId:0,
        parentId:0,
        sellerList:[{sellerId:1,sellerName:"xxxx"},{sellerId:2,sellerName:"xxx2x"},{sellerId:3,sellerName:"x3xxx"}],
        countryList:[],
        productList:[],
        productClassList:[],

        selectedSeller:[],
        selectedCountry:[],
        selectedProduct:[],

        selectedStartDate:"",
        selectedEndDate:"",

        sellerSaleOnCountryList:[], //用于联动seller与country的
        isLinked:false,

        userBrandsList:[],
        selectedBrandsIds:[],
        financeBusinessUnitList:[],
        selectedBuIds:[],
        buProducts:[],
        temproductList:[],

        isLinkRatio:false,
        selectedLinkRatioStartDate:"",
        selectedLinkRatioEndDate:"",
        displayOrHideCompare:'Display Compare',
        displayOrHideSummary:'Display Summary',
        summary_row_time : '',
        summary_row_sessions_total : '',
        summary_row_sessionPercentage_total : '',
        summary_row_unitsOrdered_total : '',
        summary_row_totalOrderItems_total : '',
        summary_row_orderedProductSales_total : '',

        summary_row_sessions_avg : '',
        summary_row_sessionPercentage_avg : '',
        summary_row_unitsOrdered_avg : '',
        summary_row_totalOrderItems_avg : '',
        summary_row_orderedProductSales_avg	 : '',

        buIncludeProIdLength:0,


        numberCss:{css:{"text-align": "right"}},
        lastMonth:{"Time":"--","SessionsTotal":0,"SessionsAvg":"0","SessionPercentage":"0.0%","UnitOrderedTotal":"0","UnitOrderedAvg":"0","OrderItemTotal":"0","OrderItemAvg":"0","SalesTotal":"0","SalesAvg":"0"},
        thisMonth:{"Time":"--","SessionsTotal":0,"SessionsAvg":"0","SessionPercentage":"0.0%","UnitOrderedTotal":"0","UnitOrderedAvg":"0","OrderItemTotal":"0","OrderItemAvg":"0","SalesTotal":"0","SalesAvg":"0"},
        growthData:{"Time":"--","Orders":"0.0%","Sessions":"0.0%","SessionPercentage":"0.0%","TotalOrder":"0.0%"},

        //main里面的过滤方法
        filterFloat:{},
        filter:{},
      }
    },
    computed:
      {

      },
    mounted() {
      this.init();
    },
    updated() {

    },
    methods:{
      init(){
        if(this.$store.state.baseData && this.isNotInit){
          this.isNotInit=false;
          this.sellerList = this.$store.state.baseData.userSellers;
          this.countryList = this.$store.state.baseData.countries;
          this.productList=this.$store.state.products;
          this.temproductList = this.$store.state.products;
          this.buIncludeProIdLength = this.temproductList.length;
          this.serverUrl=this.$store.state.baseData.pageHandlers;
          this.token = this.$store.state.baseData.userInfo.token;
          this.userId=this.$store.state.baseData.userInfo.userId;
          this.parentId=this.$store.state.baseData.userInfo.parentId;
          this.userBrandsList = this.$store.state.baseData.userBrands;
          this.financeBusinessUnitList = this.$store.state.baseData.financeBusinessUnit;
          this.buProducts = this.$store.state.baseData.productIdList;

          //默认全选
          this.selectedSeller = this.sellerList.map(function (item,index,input) {return item.sellerId;});
          this.selectedCountry = this.countryList.map(function (item,index,input) {return item.countryId;});
          this.selectedProduct = this.temproductList.map(function (item,index,input) {return item;});
          this.selectedBrandsIds = this.userBrandsList.map(function(item,index,input){return item.brandId});
          this.selectedBuIds = this.financeBusinessUnitList.map(function (item,index,input) {return item.businessUnitId;});
          //过滤器
          this.filter = this.$root.filter;
          this.filterFloat = this.$root.filterFloat;

          this.sellerSaleOnCountryList = this.$store.state.baseData.userSellers;

          this.selectedStartDate=moment().subtract(29, 'days');
          this.selectedEndDate=moment();
          this.selectedLinkRatioStartDate=this.selectedStartDate;
          this.selectedLinkRatioEndDate=this.selectedEndDate;
          var that=this;
          Vue.nextTick(function(){

            $('.selectpicker').selectpicker('refresh');
            //初始化控件
//						$("#linkRatioSwitch").bootstrapSwitch();
//						.on('switchChange.bootstrapSwitch',
//							function(event, state) {
//								that.isLinkRatio=state;
//						});

            $('.dateRange').daterangepicker(
              {
                startDate: that.selectedStartDate,
                endDate: that.selectedEndDate,
                "alwaysShowCalendars": true,
                "showCustomRangeLabel": false,
                locale: {
                  format: 'YYYY-MM-DD'
                },
                ranges: {
                  'Today': [moment(), moment()],
                  'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
              },
              function(start, end, label) {
                //alert("A new date range was chosen: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
                if(this.element[0].id=="dateRange"){
                  that.selectedStartDate=start;
                  that.selectedEndDate=end;
                }else{
                  that.selectedLinkRatioStartDate=start;
                  that.selectedLinkRatioEndDate=end;
                }
                that.viewDetail();
              }
            );
          });

          //初始化方法调用
          this.commit_function();
        }
      },
      smallButtonOnclick( the_event,detailType){
        let $btn_elem = $(the_event.toElement);
        $btn_elem.removeClass("btn-default").addClass("btn-info").siblings().removeClass("btn-info").addClass("btn-default");

        let that = this;
        if( 'compare' == detailType){

          if(that.displayOrHideCompare == 'Hide Compare'){
            that.displayOrHideCompare = 'Display Compare';
          }else{
            that.displayOrHideCompare = 'Hide Compare';
          }
        }else if ( 'summary' == detailType){
          if(that.displayOrHideSummary == 'Hide Summary'){
            that.displayOrHideSummary = 'Display Summary';
          }else{
            that.displayOrHideSummary = 'Hide Summary';
          }
        }
      },
      chooseBrand(){

        let that = this;
        let tem_list = [];
        that.selectedSeller = [];
        let _value = that.selectedBrandsIds;
        for(let brand of that.userBrandsList){
          if( _value.includes(brand.brandId)){
            let arr1 = brand.sellerIds;
            for(let ite of arr1){
              if(!tem_list.includes(ite)){
                tem_list.push(ite);
              }
            }

          }
        }

        if(null != tem_list && tem_list.length>0){
          that.selectedSeller=tem_list;
        }
        if(that.selectedSeller.length<1)return;
        var arr = [];
        that.isLinked = true;
        for(var i = 0 ; i < that.sellerSaleOnCountryList.length ;i ++){
          for(var j = 0 ; j<that.selectedSeller.length ; j++){
            if(that.selectedSeller[j] == that.sellerSaleOnCountryList[i].sellerId){
              for(var k = 0 ; k< that.sellerSaleOnCountryList[i].saleOn.length ;k++){
                arr.push(that.sellerSaleOnCountryList[i].saleOn[k])
              }
            }
          }
        }
        that.selectedCountry = arr.reArr()
        $('#selectCountry').selectpicker("val",that.selectedCountry);
        that.isLinked = false;
      },
      chooseBusinessUnit(){
        let that = this;
        if(that.selectedBuIds.length<1){
          this.selectedProduct = [];
          this.temproductList = this.productList;
          Vue.nextTick(function() {
            $("#selectProduct").selectpicker('refresh');
          });
          return;
        }
        let temid_list=[], tempro_list = [];
        for(let bu of that.buProducts){		//根据选择的bu初始化productIds.
          if(that.selectedBuIds.includes(bu.businessUnitId)){
            for(let i of bu.productIdList){
              temid_list.push(i);
            }
          }
        }
        if(temid_list.length<1)return;
        for(let one_id of temid_list){
          that.productList.map(function (item,index,input) {
            if(item.productId == one_id){
              tempro_list.push(item);
            }
          });
        }
        if(tempro_list.length<1)return;
        this.temproductList = tempro_list;
        this.selectedProduct = tempro_list;
        this.buIncludeProIdLength = tempro_list.length;
        Vue.nextTick(function() {
          $("#selectProduct").selectpicker('refresh');
        });
      },
      chooseCountry(){

      },
      chooseProduct(){
        console.log('selectedProduct');
        console.log(this.selectedProduct);
      },
      commit_function(){
        if(this.isLinked == true || this.selectedSeller.length<1
          || this.selectedCountry.length<1 || this.selectedProduct.length<1 ){
          return
        }
        this.view_link_ratio();
        this.viewDetail();
      },
      floatFormat(value, row, index) {
        return value.toFixed(2);
      },
      pencentFormat(value, row, index) {
        return value.toFixed(2)+"%";
      },
      viewDetail(startDate, endDate){
        var that=this;
        let temp_asin_id = this.selectedProduct.map(
          function (item,index,input) {
            return item.asinIdList.map(function (item,index,input) {return item;});
          }).join(',');
        if( undefined == temp_asin_id || '' == temp_asin_id){

          $("#dateRangeData").bootstrapTable('destroy');
          return;
        }
        axios.post(this.serverUrl+'amzReportConversionRate/getSaleDataTotal',
          {
            "seller": this.selectedSeller.join(','),
            "country": this.selectedCountry.join(','),
            "asinId": temp_asin_id,
            "startDate": this.selectedStartDate,
            "endDate": this.selectedEndDate
          },
          {headers:{"Access-Token":this.token}})
          .then((res)=>{
            if(res.data.code == "200") {
              var rows = res.data.data;
              var sumTable=that.calSummary(that.selectedStartDate.format('YYYY-MM-DD')+"<br/>"+that.selectedEndDate.format('YYYY-MM-DD'),
                rows);
              if(that.isLinkRatio){
                axios.post(that.serverUrl+'amzReportConversionRate/getSaleDataTotal',
                  {
                    "seller": that.selectedSeller.join(','),
                    "country": that.selectedCountry.join(','),
                    "asinId": that.selectedProduct.map(
                      function (item,index,input) {
                        return item.asinIdList.map(function (item,index,input) {return item;});
                      }).join(','),
                    "startDate": that.selectedLinkRatioStartDate,
                    "endDate": that.selectedLinkRatioEndDate
                  },
                  {headers:{"Access-Token":that.token}})
                  .then((res)=>{
                    if(res.data.code == "200") {
                      var linkRatioSumTable=that.calSummary(that.selectedLinkRatioStartDate.format('YYYY-MM-DD')+"<br/>"+that.selectedLinkRatioEndDate.format('YYYY-MM-DD'),
                        res.data.data);
                      sumTable.push(linkRatioSumTable[0]);
                      that.viewSumTable(sumTable);

                      var linkRatioRows=res.data.data;
                      var offset=rows.length-linkRatioRows.length;
                      if(offset<0)offset=0;
                      for(var i = 0; i < rows.length; i++) {
                        var column=rows[i];
                        console.log(i+"  "+(i-offset))
                        if(i>=offset && linkRatioRows.length>=(i-offset)){
                          column.ratiobuyBoxPercentage=linkRatioRows[i-offset].buyBoxPercentage
                          column.ratioorderedProductSales=linkRatioRows[i-offset].orderedProductSales
                          column.ratiopageViews=linkRatioRows[i-offset].pageViews
                          column.ratiopageViewsPercentage=linkRatioRows[i-offset].pageViewsPercentage
                          column.ratiorecordDate=linkRatioRows[i-offset].recordDate
                          column.ratiosessionPercentage=linkRatioRows[i-offset].sessionPercentage
                          column.ratiosessions=linkRatioRows[i-offset].sessions
                          column.ratiototalOrderItems=linkRatioRows[i-offset].totalOrderItems
                          column.ratiounitSessionPercentage=linkRatioRows[i-offset].unitSessionPercentage
                          column.ratiounitsOrdered=linkRatioRows[i-offset].unitsOrdered
                        }else{

                          column.ratiobuyBoxPercentage=0
                          column.ratioorderedProductSales=0
                          column.ratiopageViews=0
                          column.ratiopageViewsPercentage=0
                          column.ratiorecordDate=0
                          column.ratiosessionPercentage=0
                          column.ratiosessions=0
                          column.ratiototalOrderItems=0
                          column.ratiounitSessionPercentage=0
                          column.ratiounitsOrdered=0
                        }
                      }

                      that.view_data_range(rows);
                    }else{
                      that.$root.requestError(res);
                    }
                  }).catch(err => {
                  that.$root.requestError(err);
                });
              }else{
                that.viewSumTable(sumTable);
                that.view_data_range(rows);
              }
            }else{
              that.$root.requestError(res);
            }
          }).catch(err =>{
          that.$root.requestError(err);
        });
      },
      view_data_range(rows){
        let that = this;
        var showcolumns=[
//					{
//				        field: 'selected',
//				        checkbox : true,
//				        formatter:function (value, row, index) {
//				        	 return {
//					            checked : true//设置选中
//					        };
//				        }
//				   	},
          {
            field: 'recordDate',
            title: 'Date',
            sortable:true,
            order:"desc",
            formatter: function (value, row, index) {
              if(value!=0){
                return moment(value).format("YYYY-MM-DD ddd");
              }else{
                return "-"
              }
            }
          }, {
            field: 'sessions',
            title: 'Sessions',
            cellStyle: this.numberCss,
          }, {
            field: 'sessionPercentage',
            title: 'Session%',
            formatter: this.pencentFormat,
            cellStyle: this.numberCss
          }, {
            field: 'pageViews',
            title: 'PageViews',
            cellStyle: this.numberCss,
          },{
            field: 'pageViewsPercentage',
            title: 'PageViews%',
            formatter: this.pencentFormat,
            cellStyle: this.numberCss
          },{
            field: 'buyBoxPercentage',
            title: 'BuyBox%',
            formatter: this.pencentFormat,
            cellStyle: this.numberCss
          },{
            field: 'unitsOrdered',
            title: 'UnitsOrdered',
            cellStyle: this.numberCss,
          },{
            field: 'unitSessionPercentage',
            title: 'UnitSession%',
            formatter: this.pencentFormat,
            cellStyle: this.numberCss
          },{
            field: 'totalOrderItems',
            title: 'OrderItems',
            cellStyle: this.numberCss,
          },{
            field: 'orderedProductSales',
            title: 'Sales',
            formatter: this.floatFormat,
            cellStyle: this.numberCss,
            formatter:function(value){
              return that.filterFloat(value)
            }
          },{
            field: 'orderedProductSales',
            title: 'Price(DAY)',
            cellStyle: this.numberCss,
            formatter:function(value, row, index){
              let result = parseFloat(row['orderedProductSales'])/ parseFloat(row['unitsOrdered']);
              return result.toFixed(2);
            }
          }

        ];

        if(this.isLinkRatio)
        {
          var tempColumns=new Array();
          for(var i=0; i<showcolumns.length; i++){
            tempColumns.push(showcolumns[i]);
          }
          for(var i=0; i<showcolumns.length; i++){
            var tempColumn=$.extend(true, {}, showcolumns[i]);//JSON.parse(JSON.stringify(showcolumns[i]));
            tempColumn.field="ratio"+tempColumn.field;
            tempColumn.title="R"+tempColumn.title;
            tempColumns.push(tempColumn);
          }
          showcolumns=tempColumns;

          /*
                     * date
                     * session
                     * order
                     * sales
                     */
          for(var i=0; i<showcolumns.length; i++){
            var column=showcolumns[i];
            if(column.field.toLowerCase().indexOf("date")>=0
              || column.field.toLowerCase()==("sessions")
              || column.field.toLowerCase()==("ratiosessions")
              || column.field.toLowerCase().indexOf("order")>=0
              || column.field.toLowerCase().indexOf("sales")>=0
            )
            {
              column.visible=true;
            }else{
              column.visible=false;
            }
          }
        }
        $("#dateRangeData").bootstrapTable('destroy');
        $("#dateRangeData").bootstrapTable({
          showColumns:true,
          columns:showcolumns,

          toolbar :"#toolsBar",
          data:rows
        });
        $('#dateRangeData tr').addClass("dnd-moved");
        $('#dateRangeData').dragableColumns();
      },
      calSummary(showTime,rows)
      {
        //用于汇总
        var summary = {
          sessions: 0,
          sessionPercentage: 0,
          unitsOrdered: 0,
          orderedProductSales: 0,
          totalOrderItems: 0,
        };

        //遍历汇总
        for(var i = 0; i < rows.length; i++) {
          summary.sessions=summary.sessions+rows[i].sessions;
          summary.unitsOrdered=summary.unitsOrdered+rows[i].unitsOrdered;
          summary.orderedProductSales=summary.orderedProductSales+rows[i].orderedProductSales;
          summary.totalOrderItems=summary.totalOrderItems+rows[i].totalOrderItems;
        }

        if(summary.sessions == 0){
          summary.sessionPercentage = "0.00%";
        }else{
          summary.sessionPercentage = ((summary.unitsOrdered/summary.sessions)*100).toFixed(2)+"%";
          console.log(summary.sessionPercentage)
        }

        //算平均数
        var avage = {};
        if(summary.sessionPercentage == "0.00%"){
          avage = {
            sessions:"0.00",
            sessionPercentage:"0.00%",
            unitsOrdered:"0.00",
            orderedProductSales:"0.00",
            totalOrderItems:"0.00"
          }
          summary.Time=showTime;
          summary.sessions=summary.sessions+"(Tot)<br/>"+avage.sessions+"(Avg)";
          summary.sessionPercentage = summary.sessionPercentage+"(Tot)<br/>"+avage.sessionPercentage+"(Avg)";
          summary.unitsOrdered=summary.unitsOrdered+"(Tot)<br/>"+avage.unitsOrdered+"(Avg)";
          summary.orderedProductSales=summary.orderedProductSales+"(Tot)<br/>"+avage.orderedProductSales+"(Avg)";
          summary.totalOrderItems=summary.totalOrderItems+"(Tot)<br/>"+avage.totalOrderItems+"(Avg)";
        }else{
          avage = {
            sessions: summary.sessions/rows.length,
            // pageViews: summary.pageViews/rows.length,
            unitsOrdered: summary.unitsOrdered/rows.length,
            orderedProductSales: summary.orderedProductSales/rows.length,
            totalOrderItems: summary.totalOrderItems/rows.length,
          };
          avage.sessionPercentage = ((avage.unitsOrdered/avage.sessions)*100).toFixed(2)+"%"
          summary.Time=showTime;
          summary.sessions=this.filter(summary.sessions.toFixed(2))+"(Tot)<br/>"+this.filter(avage.sessions.toFixed(2))+"(Avg)";
          summary.sessionPercentage = summary.sessionPercentage+"(Tot)<br/>"+avage.sessionPercentage+"(Avg)";
          summary.unitsOrdered=this.filter(summary.unitsOrdered.toFixed(2))+"(Tot)<br/>"+this.filter(avage.unitsOrdered.toFixed(2))+"(Avg)";
          summary.orderedProductSales=this.filter(summary.orderedProductSales.toFixed(2))+"(Tot)<br/>"+this.filter(avage.orderedProductSales.toFixed(2))+"(Avg)";
          summary.totalOrderItems= this.filter(summary.totalOrderItems.toFixed(2))+"(Tot)<br/>"+this.filter(avage.totalOrderItems.toFixed(2))+"(Avg)";
        }

        return new Array(summary);
      },
      viewSumTable(summary)
      {
        debugger;
        let that = this;

        that.summary_row_time = summary[0].Time.split("<br/>").join(" to ");
        that.summary_row_sessions_total = summary[0].sessions.split("<br/>")[0];
        that.summary_row_sessionPercentage_total = summary[0].sessionPercentage.split("<br/>")[0];
        that.summary_row_unitsOrdered_total = summary[0].unitsOrdered.split("<br/>")[0];
        that.summary_row_totalOrderItems_total = summary[0].totalOrderItems.split("<br/>")[0];
        that.summary_row_orderedProductSales_total = summary[0].orderedProductSales.split("<br/>")[0];

        that.summary_row_sessions_avg = summary[0].sessions.split("<br/>")[1];
        that.summary_row_sessionPercentage_avg = summary[0].sessionPercentage.split("<br/>")[1];
        that.summary_row_unitsOrdered_avg = summary[0].unitsOrdered.split("<br/>")[1];
        that.summary_row_totalOrderItems_avg = summary[0].totalOrderItems.split("<br/>")[1];
        that.summary_row_orderedProductSales_avg = summary[0].orderedProductSales.split("<br/>")[1];


      },
      exportCSVFile(tableID){
        var exportInstance = new TableExport(document.getElementById(tableID), {
          formats: ['csv'],
          exportButtons: false
        });
        var exportData=exportInstance.getExportData();
        var exportDataCSV = exportData[tableID]["csv"];
        exportInstance.export2file(exportDataCSV.data, exportDataCSV.mimeType, "SalesReport"+this.selectedLinkRatioStartDate.format('YYYY-MM-DD')+"_"+this.selectedLinkRatioEndDate.format('YYYY-MM-DD'), exportDataCSV.fileExtension);
      },
      view_link_ratio()
      {
        var numberCss={css:{"text-align": "right"}};
        var that=this;
        let temp_product_id = this.selectedProduct.map(
          function (item,index,input) {
            return item.asinIdList.map(function (item,index,input) {return item;});
          }).join(',');
        if( undefined == temp_product_id || '' == temp_product_id){

          $("#dateRangeData").bootstrapTable('destroy');
          return;
        }
        axios.get(this.serverUrl+'amzReportConversionRate/getSalesAnalyze',{
          params:{
            sellerIds:this.selectedSeller.join(','),
            countryId:this.selectedCountry.join(','),
            productId:temp_product_id,
          },
          headers:{"Access-Token":this.token}
        }).then((res)=>{
          if(res.data.code == "200"){
            that.lastMonth=res.data.data[0];
            that.thisMonth=res.data.data[1];
            that.growthData=res.data.data[2];
//      				this.salesSumData = res.data.data;
//      				var total = this.salesSumData.length;
//      				this.$refs.salesSumTable.setData(this.salesSumData,total,total,false,true)
            /*
                            OrderItemAvg:"7128.93"
                            OrderItemTotal:"199610.00"
                            SalesAvg:"723168.78"
                            SalesTotal:"20248725.89"
                            SessionPercentage:"48.19%"
                            SessionsAvg:"17510.07"
                            SessionsTotal:490282
                            Time:"February"
                            UnitOrderedAvg:"8438.50"
                            UnitOrderedTotal:"236278.00"
                         */
//						$("#link_ratio").bootstrapTable('destroy');
//						$("#link_ratio").bootstrapTable({
//							columns: [{
//						        field: 'Time',
//						        title: 'Month'
//							}, {
//						        field: 'Sessions',
//						        title: 'Sessions',
//						        cellStyle:numberCss
//						    }, {
//						    	field: 'Orders',
//						        title: 'Units Ordered',
//						        cellStyle:numberCss
//							}, {
//						    	field: 'SessionPercentage',
//						        title: 'Session Percentage',
//						        cellStyle:numberCss
//						    },{
//						    	field: 'TotalOrder',
//						        title: 'Order Items',
//						        cellStyle:numberCss
//						    }],
//						    data:res.data.data
//						});
          }else{
            that.$root.requestError(res);
          }
        }).catch(err =>{
          that.$root.requestError(err);
        })

      },

    },
    watch:{
      thisMonth(val){
        var value = val;
        value.SessionsTotal = this.filter(val.SessionsTotal);
        value.SessionsAvg = this.filter(val.SessionsAvg);
        value.UnitOrderedTotal = this.filter(val.UnitOrderedTotal);
        value.UnitOrderedAvg = this.filter(val.UnitOrderedAvg);
        value.OrderItemTotal = this.filter(val.OrderItemTotal);
        value.OrderItemAvg = this.filter(val.OrderItemAvg);
        value.SalesTotal = this.filter(val.SalesTotal);
        value.SalesAvg = this.filter(val.SalesAvg);
        return value
      },
      lastMonth(val){
        var value = val;
        value.SessionsTotal = this.filter(val.SessionsTotal);
        value.SessionsAvg = this.filter(val.SessionsAvg);
        value.UnitOrderedTotal = this.filter(val.UnitOrderedTotal);
        value.UnitOrderedAvg = this.filter(val.UnitOrderedAvg);
        value.OrderItemTotal = this.filter(val.OrderItemTotal);
        value.OrderItemAvg = this.filter(val.OrderItemAvg);
        value.SalesTotal = this.filter(val.SalesTotal);
        value.SalesAvg = this.filter(val.SalesAvg);
        return value
      }
    }
  }
</script>

<style>
  th[draggable] a,
  th[draggable] {
    cursor: move;
  }
  th[draggable] a:hover,
  th[draggable] a {
    display: block;
    text-decoration: none;
    color: #333333;
  }
  .drag {
    background-color: rgba(0, 0, 0,0.25);
    opacity: 0.8
  }

  .dnd-drag {
    opacity: 0.25
  }

  .over {
    background-color: #286090;
    opacity: 0.25
  }
</style>
