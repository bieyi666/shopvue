<template>
  <div id="MyOrderInfo">
    <!--    订单表格标题-->

    <div>
      <div style="width: 100%;margin-top: 30px;border: 1px silver solid">
        <table style="width: 100%">
          <tr style="height: 40px">
            <th style="width: 35%;padding-top: 7px">订单</th>
            <th style="width: 15%;padding-top: 7px">单价</th>
            <th style="width: 10%;padding-top: 7px">数量</th>
            <th style="width: 20%;padding-top: 7px">实付款</th>
            <th style="width: 10%;padding-top: 7px">交易状态</th>
            <th style="width: 10%;padding-top: 7px">交易操作</th>
          </tr>
        </table>
      </div>
      <!--      我的订单信息-->
      <div style="width: 100%;margin-top: 30px" v-for="(o,index) in MyorderInfo">
        <table style="width: 100%">
          <!--          订单号等信息-->
          <tr style="background: #E9EEF3;height: 40px">
            <td style="width: 35%;font-size: 10px">
              <label style="padding-left: 20px">{{o.orderTime}}&nbsp;&nbsp;&nbsp;订单号：{{o.orderid}}</label>
            </td>
            <td style="width: 20%">{{o.storeid}}</td>
            <td></td>
            <td></td>
            <td></td>
            <th style="width: 10%;font-size: 25px"><i class="el-icon-delete-solid"></i></th>
          </tr>
          <!--          订单内的商品信息-->
          <tbody style="font-size: 14px">
          <tr v-for="og in o.orderGoods">

            <el-image
              style="width: 100px; height: 100px"
              :src="$host+og.commodity.picture"
              :preview-src-list="[$host+og.commodity.picture]">
            </el-image>
            <label style="padding-left: 20px">{{og.commodity.cname}}</label>
            <td width="30%">

            </td>
          </tr>
          </tbody>
        </table>
      </div>


    </div>
  </div>
</template>

<script>
  export default {
    name: "MyOrderInfo",
    data() {
      return {
        total: 0,
        page: '',
        rows: '',
        MyorderInfo: []
      }
    },
    methods: {
      getUserOrder() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("page", _this.page);
        params.append("rows", _this.rows);
        this.$axios.get("userOrder.action", params)
          .then(function (result) {
            _this.MyorderInfo = result.data.rows[0].orderInfo;
            console.log(_this.MyorderInfo);
          })
          .catch(function (error) {
            alert(error)
          })
      },
    },
    created: function () {
      this.getUserOrder()
    }
  }
</script>

<style scoped>

</style>
