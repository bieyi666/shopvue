<template>
  <div id="MyOrderInfo">
    <!--    订单表格标题-->


    <el-row :gutter="20">
      <el-col :span="2">
        <a href="#" @click="getUserOrder(null)">全部订单</a>
      </el-col>
      <el-col :span="2">
        <a href="#" @click="getUserOrder(1)">待付款</a>
      </el-col>
      <el-col :span="2">
        <a href="#" @click="getUserOrder(2)">待提货</a>
      </el-col>
      <el-col :span="2">
        <a href="#" @click="getUserOrder(3)">已提货</a>
      </el-col>
    </el-row>
    <div>
      <div style="width: 100%;margin-top: 20px;border: 1px silver solid">
        <table style="width: 100%;font-size: 12px;color: #3c3c3c;background: #f5f5f5">
          <tr style="height: 40px">
            <th style="width: 60%">订单</th>
            <th style="width: 15%">单价（元）</th>
            <th style="width: 10%">数量</th>
            <th style="width: 15%">操作订单</th>
          </tr>
        </table>
      </div>

      <!--      我的订单信息-->
      <div style="width: 100%;margin-top: 0px;">

        <table
          style="width: 100%;text-align: center;border-collapse: collapse;margin-top: 25px;margin-bottom: 25px;border: 1px silver solid"
          v-for="(o,index) in MyorderInfo">

          <thead style="border: 1px silver solid">
          <!--          订单号等信息-->
          <tr style="height: 40px;font-size: 10px;background: #f5f5f5">
            <td style="width: 60%;" colspan="2" >
              <label
                style="padding-left: 20px;float: left"><b>{{o.orderTime}}</b>&nbsp;&nbsp;&nbsp;订单号：{{o.orderid}}
              </label>

              <label style="text-align: right">商户id：{{o.storeid}}</label>
            </td>
            <td style="width: 5%" colspan="">
              <!--            状态判断-->
              <label style="color: red" v-if="o.state3==1">待付款</label>
              <label v-if="o.state3==2">待提货</label>
              <label style="color: lime" v-if="o.state3==3">已提货</label>
            </td>
            <td>
              <!--              删除订单-->
              <a style="font-size: 30px;"><i class="el-icon-delete-solid"></i></a>
            </td>

          </tr>
          </thead>
          <!--          订单内的商品信息-->

          <tr v-for="(og,index1) in o.orderGoods" style="font-size: 12px;border-top: 1px silver solid">
            <td width="60%" colspan="">
              <div style="float: left;padding-left: 10px;padding-top: 10px;padding-bottom: 10px">
                <!--                商品图片-->
                <el-image
                  style="width: 80px; height: 80px"
                  :src="$host+og.commodity.picture"
                  :preview-src-list="[$host+og.commodity.picture]">
                </el-image>
              </div>
              <div>
                <!--                商品名-->
                <label style="padding-left: 10px;padding-top:10px;float: left">{{og.commodity.cname}}</label>
              </div>
            </td>
            <!--        单价-->
            <td style="width: 15%">￥{{og.commodity.price}}</td>
            <!--            数量-->
            <td style="width: 10%">{{og.number}}</td>
            <!--            单价x数量，可删除-->
            <td style="width: 15%"></td>
          </tr>


          <tr style="border-top: 1px silver solid">
            <td>
              <label>总金额：</label><b>{{getMoney(index)}}</b>
              <lable>（元）</lable>
            </td>
            <td>

            </td>
            <td>
            </td>
            <td >
              <div style="padding-bottom: 10px;padding-top: 10px">
                <el-button type="warning" plain v-if="o.state3==1">前往付款</el-button>
                <el-button type="success" plain v-if="o.state3==2" @click="qdOrder(o.orderid)">确认收货</el-button>
              </div>
            </td>
          </tr>
        </table>

      </div>
      <!--      下方分页-->

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="15"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </div>
  </div>
</template>

<script>
  export default {
    name: "MyOrderInfo",
    data() {
      return {
        state3: null,

        userId: sessionStorage.getItem('uid'),
        total: 0,
        page: '',
        rows: '',
        MyorderInfo: [],

      }
    },
    methods: {
      handleSizeChange(val) {
        var _this = this;
        this.rows = val;
        this.getUserOrder(_this.state3);
      },
      handleCurrentChange(val) {
        var _this = this;
        this.page = val;
        this.getUserOrder(_this.state3);
      },
      getUserOrder(state3) {
        var _this = this;
        this.state3 = state3;
        var params = new URLSearchParams();
        params.append("page", _this.page);
        params.append("rows", _this.rows);
        params.append("uid", _this.userId);
        if(state3!=null){
          params.append("state3", _this.state3);
        }

        this.$axios.post("userOrder.action", params)
          .then(function (result) {
            _this.MyorderInfo = result.data.rows[0].orderInfo;
            _this.total = result.data.total;
          })
          .catch(function (error) {
          })
      },

      //计算总金额 （按钮直接调用此方法得到总金额）
      getMoney(index) {
        var sum = 0;
        var _this = this;
        _this.MyorderInfo[index].orderGoods.forEach(function (value) {
          sum += value.number * value.commodity.price
        })
        return sum
      },
      qdOrder(id) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("orderid", id);
        params.append("state3", 3);
        this.$axios.post("qdOrder.action", params)
          .then(function (result) {
            _this.getUserOrder(3)
          })
          .catch(function (error) {
            alert(error)
          })
      }
    },
    created: function () {
      this.getUserOrder()
    }
  }
</script>

<style scoped>
table tr{

}
</style>
