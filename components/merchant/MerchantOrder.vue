<!--商户订单-->
<template>
  <div>

    <div class="block">
      <!--      <span class="demonstration">起始日期时刻为 12:00:00，结束日期时刻为 08:00:00</span>-->
      <el-date-picker
        format="yyyy 年 MM 月 dd 日 hh 时:mm分:ss秒"
        value-format="yyyy-MM-dd hh:mm:ss"
        v-model="value2"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00', '08:00:00']">
      </el-date-picker>
    </div>

    <el-table
      :data="tableData"
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
              <hr>
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
        <template slot-scope="scope">
          <span v-if="scope.row.state1 === 0">
            未发货
          </span>
          <span v-if="scope.row.state1 === 1">
            <span v-if="scope.row.state2 === 0">
              待确认送达
            </span>
            <span v-if="scope.row.state2 === 1">
              <span v-if="scope.row.state3 === 0">
              待取货
              </span>
             <span v-if="scope.row.state3 === 1">
              已取货
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
          <div v-if="scope.row.state1 === 1 && scope.row.state2 === 0">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">确认送达
            </el-button>
          </div>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "MerchantOrder",
    data() {
      return {
        tableData: [],
        search: '',
        value2: '',
        orderTime1:null,
        orderTime2:null
      }
    },
    methods: {
      //获取订单数据
      getOrderData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("storeid", 1);
        //params.append("orderTime1",this.value2)
        this.$axios.get("queryAllOrderInfoBySid.action", {
          params
        }).then(function (result) {
          _this.tableData = result.data.rows;
        }).catch(function (error) {
          alert(error)
        })
      }
    },
    created() {
      this.getOrderData();
    },
    watch: {
      value2: function (newval) {
        for (var i=0 ;i <newval.length;i++){
         this.orderTime=newval[i];
        }
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
