<template>
  <div style="height: 100%;width: 1385px;margin-top: -8px;margin-left: -27px">
    <el-container>
      <el-header style="height: 50px;">
        <div style="background-color: #333;height: 36px;width: 1350px;">
          <el-row>
            <el-col :span="14">
              <el-row align="middle">
                <el-col :span="5">&emsp;</el-col>
                <el-col :span="18">
                  <i class="el-icon-loading" style="color: khaki;margin-top: 10px">

                  </i> <a href="#" style="color: khaki; font-size: 10px">关于防止近期不法分子冒充客服实施诈骗的公告</a>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-row>
                <el-col :span="24">
                  <ul style="margin-top: 5px">
                    <il>
                      <a href="#" style="color: #ccc;font-size: 10px;text-decoration:none;" v-if="shoa">
                          <span @click="login">
                            登录/注册
                          </span>
                        &emsp;| &emsp;</a>
                    </il>
                    <il>
                      <a href="#" style="color: #ccc;font-size: 10px;text-decoration:none;" v-if="show">
                          <span @click="logout">
                            注销
                          </span>
                        &emsp;| &emsp;</a>
                    </il>
                    <il>
                      <a href="#" style="color: #ccc;font-size: 10px;text-decoration:none;">我的订单 &emsp;| &emsp;</a>
                    </il>
                    <il>
                      <a href="#" style="color: #ccc;font-size: 10px;text-decoration:none;">客服 &emsp;| &emsp;</a>
                    </il>
                    <il>
                      <a style="color: aliceblue;font-size: 13px">444-8888-6666 </a>
                    </il>
                    <il>
                      <el-popover
                        placement="top-start"
                        title=""
                        width="200"
                        trigger="hover">
                        <div style="width:200px;height:200px;">
                          <el-img
                            style="width:100%;height:100%;object-fit: cover;"
                            src="./src/assets/image/noOrder.png"
                          ></el-img>
                        </div>
                        <a style="color: #ccc;font-size: 10px;text-decoration:none;" slot="reference"> &emsp;| &emsp;<i
                          class="el-icon-user" style="color: #ccc"></i> App</a>
                      </el-popover>

                    </il>
                  </ul>
                </el-col>
                <el-col :span="4"></el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main>
        <div>
          <el-row>
            <el-col :span="2">&emsp;</el-col>
            <el-col :span="4">
              <el-image style="width:100%;height:100%;object-fit: cover;"
                        src="./src/assets/image/logo.png"></el-image>
            </el-col>
            <el-col :span="3">&emsp;</el-col>
            <el-col :span="11">
              <div class="aaaa"
                   style="margin-top: 30px;background-color: #ffffff;border-color: #ffffff; width: 580px;">
                <el-input placeholder="请输入内容" v-model="input1" class="aaa"
                          style="outline: none;background-color: #ffffff;border-color: #DCDFE6">
                  <el-button slot="append"
                             style="border-color: #ffffff;background-color: #ffffff;" @click="queyrCname">
                    <i class="el-icon-search"></i>
                  </el-button>
                </el-input>
              </div>
            </el-col>
            <el-col :span="4">
              <div style="margin-top: 30px">
                <el-button round><i class="el-icon-shopping-cart-2" style="font-size: 18px"></i>&emsp;<a
                  style="font-size: 18px">购物车</a></el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">&emsp;</el-col>
            <el-col :span="20">
              <div style="width: 270px; height: 300px;background-color: #ffffff;float: left" v-for="aam in CommodityData" @click="gou(aam.cid)">
                <el-image style="width: 100%;height: 60%;" :src="aam.picture"></el-image>
                <div style="width: 100%;height: 40%;text-align:center;">
                  <br>
                  <span >{{aam.cname}}</span>
                  <br>
                  <span style="color: red">￥<span style="color: red" >{{aam.price}}</span></span>
                </div>
              </div>
            </el-col>
            <el-col :span="2">&emsp;</el-col>
          </el-row>
        </div>
      </el-main>
      <el-footer>
        <div>
          <el-image src="./src/assets/image/dizho.png"></el-image>
          <br>
          <el-image src="./src/assets/image/di.png"></el-image>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Goodsquery",
    data() {
      return {
        CommodityData:[{}],
        input1:'',
      }
    },
    methods:{
      getAllShop(){
        var cname=sessionStorage.getItem("cname");
        var _this=this;
        this.$axios.post("queryAllCommoditysan.action?cName="+cname).then(function (result) {
          _this.CommodityData=result.data;
        }).catch(function (error) {
          alert(error)
        })
      },
      queyrCname(){
        var cname=this.input1
        sessionStorage.setItem("cname",cname);
        this.getAllShop();
      },
    },
    created() {
      this.getAllShop();
    }
  }
</script>

<style scoped>

</style>
