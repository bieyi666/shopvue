<!--商户订单-->
<template>
  <div>

    <div class="block">
      <!--      <span class="demonstration">起始日期时刻为 12:00:00，结束日期时刻为 08:00:00</span>-->
      <!--      format="yyyy 年 MM 月 dd 日 hh 时:mm分:ss秒"-->
      <el-date-picker
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd HH:mm:ss"
        v-model="value2"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00', '08:00:00']">
      </el-date-picker>
    </div>

    <el-table
      :data="tableData.filter(data => !search || data.userInfo.uname.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单编号">
              <span>{{ props.row.orderid }}</span>
            </el-form-item>
            <el-form-item label="收货商铺">
              <span>{{ props.row.storeInfo.name }}</span>
            </el-form-item>
            <el-form-item label="购买用户">
              <span>{{ props.row.userInfo.uname }}</span>
            </el-form-item>
            <el-form-item label="用户号码">
              <span>{{ props.row.userInfo.phone }}</span>
            </el-form-item>
            <el-form-item label="下单时间">
              <span>{{ props.row.orderTime }}</span>
            </el-form-item>
            <el-form-item label="收货时间">
              <span>{{ props.row.receiptTime }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ props.row.storeInfo.address }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="订单编号"
        prop="orderid">
      </el-table-column>
      <el-table-column
        label="收货地"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{scope.row.storeInfo.address}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>......</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="购买用户 "
        prop="userInfo.uname">
      </el-table-column>
      <el-table-column
        label="用户号码"
        prop="userInfo.phone">
      </el-table-column>
      <el-table-column
        label="下单日期"
        prop="orderTime">
      </el-table-column>
      <el-table-column
        label="购买商品"
        width="180px">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">

            <div v-for="o in scope.row.orderGoods">

              名称：{{o.commodity.cname}}
              <br>
              价格：{{o.commodity.price}}
              <br>
              数量：{{o.number}}
              <br>
              预估收益：{{(o.commodity.price - o.commodity.purchasePrice) * 0.05 * 5}}
              <hr>
            </div>
            <div>
            </div>
            <div slot="reference" class="name-wrapper">
              <el-tag>查看商品</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"

      >
        <template slot="header">
          <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    状态<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">待付款</el-dropdown-item>
              <el-dropdown-item command="2">待发货</el-dropdown-item>
              <!--<el-dropdown-item command="3">待确认收货</el-dropdown-item>-->
              <el-dropdown-item command="4">已收货</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>


        </template>
        <template slot-scope="scope">
           <span v-if="scope.row.state3 === 1">
              待付款
           </span>
          <span v-if="scope.row.state3 != 1 ">

            <span v-if="scope.row.state1 === 0">
              未发货
            </span>

            <span v-if="scope.row.state1 === 1">
              <!--<span v-if="scope.row.state2 === 0">
                待确认收货
              </span>-->
              <span v-if="scope.row.state2 === 1">
               <span v-if="scope.row.state3 === 2">
                待取货
                </span>
                <span v-if="scope.row.state3 === 3">
                已收货
                </span>
              </span>
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>


        </template>
        <template slot-scope="scope">
          <div v-if="scope.row.state1 === 1 && scope.row.state2 === 0 && scope.row.state3 != 1">
            <el-button
              size="mini"
              type="danger"
              @click="updateOrder(scope.$index, scope.row)">确认送达
            </el-button>
          </div>

        </template>

      </el-table-column>
    </el-table>
    <!--        分页-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  export default {
    name: "MerchantOrder",
    data() {
      return {
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              },
            },
            {
              text: '最近半年',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一年',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                picker.$emit('pick', [start, end]);
              }
            }]
        },
        tableData: [],
        rows: '',
        page: '',
        total: 0,
        search: '',
        value2: '',
        orderTime1: null,
        orderTime2: null,
        state: "",
        sumPrice:0,
      }
    },
    methods: {
      handleCommand(command) {
        this.state = command;
        this.getOrderData();
      },
      //pageSize（每页条数） 改变时触发
      handleSizeChange(val) {
        this.rows = val;
        this.getOrderData();
      },
      //改变页码时触发
      handleCurrentChange(val) {
        this.page = val;
        this.getOrderData();
      },
      //获取订单数据
      getOrderData() {
        var _this = this;
        var params = new URLSearchParams();
        var storeid = sessionStorage.getItem("storeid");
        params.append("storeid", storeid);
        params.append("orderTime1", this.orderTime1);
        params.append("orderTime2", this.orderTime2);
        params.append("page", this.page);
        params.append("rows", this.rows);
        params.append("state", this.state);
        this.$axios.get("queryAllOrderInfoBySid.action", {
          params
        }).then(function (result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
        }).catch(function (error) {
          alert(error)
        })
      },
      updateOrder(index, row) {
        var _this = this;
        this.$axios.get("updateOrderInfoBySid.action", {
          params: {
            orderid: row.orderid
          }
        }).then((res => {
          if (res.data == "修改成功") {
            _this.$message({
              message: res.data,
              type: 'success'
            });
            _this.getOrderData();
          } else {
            _this.$message({
              message: res.data,
              type: 'error'
            });
          }

        })).catch(error => (
          alert(error)
        ))
      }
    },
    created() {
      this.getOrderData();
    },
    watch: {
      value2: function (newval) {

        if (newval == null) {
          this.orderTime1 = null;
          this.orderTime2 = null;
        } else {
          this.orderTime1 = newval[0];
          this.orderTime2 = newval[1];
        }

        this.getOrderData();
      }
    }

  }
</script>

<style>

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
