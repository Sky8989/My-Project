<template>



  <div id="app">
    <h1>{{msg}}</h1>


   <el-radio v-model="radio" label="1">单选按钮1</el-radio>
    <el-radio v-model="radio" label="2">单选按钮2</el-radio>

    <p>爱好</p>
    <el-checkbox v-model="checked" label="3">游泳</el-checkbox>
    <el-checkbox v-model="checked" label="1">打球</el-checkbox>
    <el-checkbox v-model="checked" label="2">看书</el-checkbox>

    <p>爱好组</p>
    <el-checkbox-group v-model = "checkLists">
      <el-checkbox  label="3">游泳</el-checkbox>
      <el-checkbox  label="1">打球</el-checkbox>
      <el-checkbox  label="2">看书</el-checkbox>
    </el-checkbox-group>


    <br><br>
    <el-table-header> 表头 </el-table-header>

    <el-table :data="tableData" style="width: 80%" border height="350px">

      <el-table-column type="selection"></el-table-column>

      <el-table-column sortable prop="date" label="日期" width="180"
                       :filters="[{text: '2016-05-01', value: '2016-05-01'},{text: '2016-05-02', value: '2016-05-02'},{text: '2016-05-03', value: '2016-05-03'}]"
                       :filter-method="filterHandler"
                       >
      </el-table-column>

      <el-table-column sortable fixed="left" prop="name" label="姓名" width="180">          </el-table-column>




      <el-table-column sortable prop="age" label="年龄"
                       :filters="[{ text: '20', value: 20 }, { text: '21', value: 21}]"
                       :filter-method="filterAge" ></el-table-column>

      <el-table-column prop="address" label="地址" >
          <el-table-column sortable prop="province" label="省份"></el-table-column>
          <el-table-column sortable prop="city" label="市"></el-table-column>
      </el-table-column>
    </el-table>

  </div>





  <!--<div id="app">
    <template>
      <el-button @click="resetDateFilter">清除日期过滤器</el-button>
      <el-button @click="clearFilter">清除所有过滤器</el-button>
      <el-table
        ref="filterTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180"
          column-key="date"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          width="100"
          :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>-->


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
      msg: 'Welcome to Your Vue.js App !!!',
      radio: '1',
      checked:true,
      checkLists:['3',"1"],

      tableData: [{
        date: '2016-05-02',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄',
        age: 20,
        province:"湖南"
        ,city: "长沙"
      }, {
        date: '2016-05-04',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 1517 弄',
        age: 21,
        province:"湖南",city: "长沙"
      }, {
        date: '2016-05-01',
        name: '王小虎3',
        address: '上海市普陀区金沙江路 1519 弄',
        age: 30,
        province:"湖南",city: "长沙"
      }, {
        date: '2016-05-03',
        name: '王小虎4',
        address: '上海市普陀区金沙江路 1516 弄',
        age: 40,
        province:"湖南",city: "长沙"
      }],

    }
  },

  /*data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '公司'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '公司'
      }]
    }
  },*/
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.date;
    },
    filterAge(value, row) {
      /* 过滤年龄这列 值相等 过滤*/
      return row.age === value;
      // return row.age;
    },
    filterHandler(value, row, column) {
      const property = column['property'];       //获取当前列的 prop属性中的值
      return row[property] === value;
    }
  }
}

/*var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')*/



</script>


<!-- 引入 element-ui 样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">

