<template>
  <!--background-color: aqua;-->
  <div style="height: 100%;width: 1385px;margin-top: -8px;margin-left: -27px">
    <shopping-cat-com/>
    <el-badge :value="shoppingCatNumSum" class="shopping_cart_btn_item" type="primary">
      <el-button @click="$children[0].shoppingBool = true" icon="el-icon-shopping-cart-1" circle type="warning"
                 class="shopping_cart_btn"></el-button>
    </el-badge>
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
                      <a href="#" @click="myorder" style="color: #ccc;font-size: 10px;text-decoration:none;">个人中心 &emsp;|
                        &emsp;</a>
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
        <div style="height: 300px;width: 1365px;margin-top: -23px;margin-left: 0px">
          <div>
            <el-row>
              <el-col :span="2">&emsp;</el-col>
              <el-col :span="4">
                <el-image style="width:100%;height:100%;object-fit: cover;" @click="hui"
                          src="./src/assets/image/logo.png"></el-image>
              </el-col>
              <el-col :span="3">&emsp;</el-col>
              <el-col :span="11">
                <div class="aaaa"
                     style="margin-top: 30px;background-color: #ffffff;border-color: #ffffff; width: 580px;">
                  <el-input placeholder="请输入内容" v-model="input1" class="aaa"
                            style="outline: none;background-color: #ffffff;border-color: #DCDFE6">
                    <el-button slot="append"
                               style="border-color: #ffffff;background-color: #ffffff;" @click="queyrCid">
                      <i class="el-icon-search"></i>
                    </el-button>
                  </el-input>
                </div>
              </el-col>
              <el-col :span="4">
                <div style="margin-top: 30px">
                  <el-badge :value="shoppingCatNumSum" class="shopping_cart_btn_item1" type="primary">
                    <el-button @click="$children[0].shoppingBool = true" round><i class="el-icon-shopping-cart-2"
                                                                                  style="font-size: 18px"></i>&emsp;<a
                      style="font-size: 18px">购物车</a></el-button>
                  </el-badge>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="2"> &emsp;</el-col>
            <el-col :span="20">
              <el-tabs @tab-click="handleClick" v-model="activeName" :style="{width:b,height:s,backgroundcolor:t}">
                <el-tab-pane :label="type.tname" :name="type.tid" v-for="type in cheye">
                  <div>
                    <div style="width: 100px;height: 200px; float: left;text-align:center;" v-for="mm in chtype">
                      <el-tag type="danger">{{mm.tname}}</el-tag>
                      <hr style="width: 70px;">
                      <a v-for="aa in chcype" v-if="mm.tid==aa.tsan" @click="queyrCname(aa.tid)">
                        <el-tag type="success">{{aa.tname}}</el-tag>
                        <br></a>
                      <br>
                      <br>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-col>
            <el-col :span="2"> &emsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="block" style="text-align: center">
                <!--                <el-carousel>
                                  <el-carousel-item v-for="imaaa in imageaa" :key="item">
                                    <el-image :src="imaaa.image"></el-image>
                                  </el-carousel-item>
                                </el-carousel>-->
                <el-carousel :interval="4000" type="card" height="300px">
                  <el-carousel-item v-for="imaaa in imageaa" :key="item">
                    <el-image :src="imaaa.image"></el-image>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </el-col>
          </el-row>
          <div>
            <el-row>

            </el-row>
          </div>
          <div style="width: 1350px">
            <el-row >
              <el-col :span="2">&emsp;</el-col>
              <el-col :span="20">
                <div style="width: 100%;height: 500px;">
                  <div style="height: 100%; width: 26%; float: left">
                    <div style="width: 100%;height: 10%;">
                      <h1>热门商品</h1>
                    </div>
                    <div style="width: 100%;height: 60%;">
                      <el-image src="./src/assets/image/mao.webp" style="width: 100%;height: 100%;">
                      </el-image>
                    </div>

                    <div style="width: 100%;height: 30%;background-color: #ffffff;text-align:center;">
                      <br>
                      <a>每一口都有七种肉，全价猫粮 1.8千克</a>
                      <br>
                      <a>¥88</a>
                    </div>
                  </div>
                  <div style="height: 100%; width: 74%; float: left">
                    <div style="width: 275px; height: 50%;background-color: #ffffff;float: left" v-for="aam in tu">
                      <div @click="gou(aam.cid)">
                        <el-card shadow="hover" style="width: 270px;height: 160px;margin-left: 2px">
                          <el-image style="width: 260px;height: 140px;top: -10px;left: -15px"
                                    :src="'http://localhost:8080/img/'+aam.picture"></el-image>
                        </el-card>
                      </div>
                      <div style="width: 100%;height: 40%;text-align:center;">
                        <br>
                        <span @click="gou(aam.cid)">{{aam.cname}}</span>
                        <br>
                        <span @click="gou(aam.cid)" style="color: red">￥<span
                          style="color: red">{{aam.price}}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="2">&emsp;</el-col>
            </el-row>

          </div>
          <br> <br> <br>
          <div style="width: 1350px">
            <el-row >
              <el-col :span="2">&emsp;</el-col>
              <el-col :span="20">
                <div style="width: 100%;height: 500px;">
                  <div style="height: 100%; width: 26%; float: left">
                    <div style="width: 100%;height: 10%;">
                      <h1>哥谭军火</h1>
                    </div>
                    <div style="width: 100%;height: 60%;">
                      <el-image src="./src/assets/image/mao.webp" style="width: 100%;height: 100%;">
                      </el-image>
                    </div>

                    <div style="width: 100%;height: 30%;background-color: #ffffff;text-align:center;">
                      <br>
                      <a>每一口都有七种肉，全价猫粮 1.8千克</a>
                      <br>
                      <a>¥88</a>
                    </div>
                  </div>
                  <div style="height: 100%; width: 74%; float: left">
                    <div style="width: 275px; height: 50%;background-color: #ffffff;float: left" v-for="aam in Ak47">
                      <div @click="gou(aam.cid)">
                        <el-card shadow="hover" style="width: 270px;height: 160px;margin-left: 2px">
                          <el-image style="width: 260px;height: 140px;top: -10px;left: -15px"
                                    :src="'http://localhost:8080/img/'+aam.picture"></el-image>
                        </el-card>
                      </div>
                      <div style="width: 100%;height: 40%;text-align:center;">
                        <br>
                        <span @click="gou(aam.cid)">{{aam.cname}}</span>
                        <br>
                        <span @click="gou(aam.cid)" style="color: red">￥<span
                          style="color: red">{{aam.price}}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="2">&emsp;</el-col>
            </el-row>

          </div>
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
    <!--    登录-->
    <el-dialog
      class="dialog"
      :visible.sync="dialogVisible"
      width="50%"
      center>
      <span>
        <router-view>

        </router-view>
      </span>
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
    <!--AAA-->
  </div>
  <!--aa-->

</template>

<script>
  import ShoppingCatCom from "../can/shoppingCat";

  export default {
    name: "MainPage",
    components: {ShoppingCatCom},
    data() {
      return {
        dialogVisible: false,
        input1: '',
        t: "",
        b: "",
        s: "",
        show: false,
        shoa: true,
        activeName: '',
        onLine: navigator.onLine,
        imageaa: [{image: "./src/assets/image/page1.jpg"},
          {image: "./src/assets/image/page2.png"},
          {image: "./src/assets/image/page3.jpg"},
          {image: "./src/assets/image/page4.jpg"},
          {image: "./src/assets/image/page5.jpg"},],
        cheye: [{}],
        chtype: [{}],
        chcype: [{}],
        tu: [],
        Ak47: [],
        shoppingCatNumSum: 0,
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        this.cheye.forEach(item => {
          if (tab.name == item.tid) {
            // 触发‘配置管理’事件
            this.second(item.tid);
          }
        })
      },
      second(data) {
        var _this = this;
        this.$axios.post("queryAllzho.action?ter=" + data).then(function (result1) {
          _this.chtype = result1.data;
          _this.$axios.post("queryAllciq.action?ter=" + data).then(function (result) {
            _this.chcype = result.data;
          }).catch(function (error) {
            alert(error)
          })
        }).catch(function (error) {
          alert(error)
        })

      },
      //异步查询主数据
      getAllCommType() {
        var _this = this;
        this.$axios.post("queryAllzhu.action").then(function (result) {
          _this.cheye = result.data;
        }).catch(function (error) {
          alert(error)
        })
      },
      //打开登录/注册
      login() {
        this.$router.push("/login")
        this.dialogVisible = true;
      },
      //注销
      logout() {
        sessionStorage.removeItem("username");  //从浏览器session清空数据
        sessionStorage.removeItem("uid");
        sessionStorage.removeItem("storeid")
        sessionStorage.removeItem("shstoreid")
        this.show = !this.show;
        this.shoa = !this.shoa;
        this.$message({
          showClose: true,
          message: '注销成功',
          type: 'error'
        });
        this.shoppingCatNumSum = 0;
      },
      //展示商品
      getAllCommodityyou() {
        var _this = this;
        var params = new URLSearchParams()
        params.append("page", "1");
        params.append("rows", "6");
        //异步
        this.$axios.post("queryAllCommodity.action", params).then(function (result) {
          //保存到tu数组里
          _this.tu = result.data.rows;
        })
      },
      //展示武器
      getAllCommodityAK() {
        var _this = this;
        var params = new URLSearchParams()
        params.append("page", "2");
        params.append("rows", "6");
        //异步
        this.$axios.post("queryAllCommodity.action", params).then(function (result) {
          //保存到Ak47json数组
          _this.Ak47 = result.data.rows;
        })
      },
      //点击商品拿取id跳转页面
      gou(index) {
        var cid = index
        sessionStorage.setItem("cid", cid);
        this.$router.push("/mainDetailed")
      },
      //查询商品
      //点击查询带名字调整页面
      queyrCid() {
        var cname = this.input1
        sessionStorage.setItem("cname", cname);
        this.$router.push("/goodsquery")
      },
      //查询商品
      //点击查询带id调整页面
      queyrCname(index) {
        sessionStorage.setItem("tid", index);
        sessionStorage.setItem("cname", ' ');
        this.$router.push("/goodsquery");
      },
      //页面进来判断是否登录
      EF() {
        var ca = sessionStorage.getItem("username");
        if (ca != null) {
          this.show = true;
          this.shoa = false;
        }
      },
      //点击个人中心查询是否登录
      myorder() {
        var username = sessionStorage.getItem("username");
        //判断是否为空
        if (username == null) {
          this.$message({
            showClose: true,
            message: '请登录',
            type: 'error'
          });
        } else {
          this.$router.push("/userCenter")
        }
      },
      //返回首页
      hui() {
        this.$router.push("/mainPage")
      }
    },
    //挂钩子
    created() {
      this.EF();
      this.getAllCommodityAK();
      this.getAllCommodityyou();
      this.getAllCommType();
    }
  }

</script>

<style>
  /* 三种方法选择自己喜欢的一个即可 */
  .dialog .el-dialog {
    background-image: url(http://localhost:8080/shop/img/30.png);
    background-size: 120%;
    padding: 10px;
    height: 400px;
  }

  .el-input--small .el-input__inner {
    border: none;
  }

  .shopping_cart_btn {
    font-size: 35px;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: 0 0 5px #999;
  }

  .shopping_cart_btn_item {
    position: fixed;
    left: 1293px;
    bottom: 200px;
    z-index: 10;
  }

  .shopping_cart_btn_item .el-badge__content.is-fixed {
    top: -21px;
    right: 47px;
  }

  .shopping_cart_btn_item1 .el-badge__content.is-fixed {
    top: 5px;
    right: 15px;
  }

  .el-badge__content {
    border: 0px;
  }
</style>
