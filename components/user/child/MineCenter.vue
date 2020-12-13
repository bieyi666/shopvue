<template>
  <div id="mineCenter">

    <div style="border: 1px solid #eaeaea;height: 230px ;background-image: linear-gradient(white, rgb(245,240,228))">
      <div class="avatar" style="margin-left: 70px;margin-top: 90px">
        <!--            头像-->
        <el-avatar :size="100" :src="Users.photo"></el-avatar>
        <!--            昵称-->
        <label>{{Users.uname}}</label>
      </div>
    </div>


    <div style="border: 1px solid #eaeaea;height: 590px;margin-top: 20px">
      <!--         未完成订单头部标题-->
      <div style="height: 40px;border: 0px ;background: #f4f4f4">
        <el-row>
          <el-col :span="4" :offset="1" style="margin-top: 9px">
            未完成订单
          </el-col>
          <el-col :span="4" :offset="15" style="margin-top: 9px">
            <a href="#" style="font-size: 14px">查看全部订单</a>
          </el-col>
        </el-row>
      </div>
      <!--        未完成订单页-->

      <!--    无订单显示页-->
      <div id="noOrder" style="">
        <div class="noOrderDiv" style="display: flex;
        justify-content: center;
        align-items: center">
          <img class="noOrderImg" src="src/assets/image/noOrder.png"><span></span>
        </div>
        <button>去逛逛</button>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "MineCenter",
    data() {
      return {
        Users: {}

      }
    },
    methods: {
      //获取用户信息
      getUserData() {
        var _this = this;
        this.$axios.get("queryUserInfo.action?uid=" + 2)
          .then(function (result) {
            _this.Users = result.data;
          })
          .catch(function (error) {
            alert(error)
          })
      }
    },
    created: function () {
      this.getUserData();
    }
  }
</script>

<style>

/*<!--  无未完成订单图片居中-->*/
  .noOrderDiv {
    /*border: 1px solid #ccc;*/
    height: 500px;
    width: 500px;
    text-align: center;
    margin: 0 auto;
    /*background: #ccc;*/
  }

  .noOrderImg {
    vertical-align: middle;
  }

  .noOrderDiv span {
    height: 100%;
    width: 0;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle
  }
</style>
