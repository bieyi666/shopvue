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
        <el-row>
          <el-col :span="3">&emsp;</el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="10">
                <div style="width: 450px;height: 300px;">
                    <el-carousel>
                      <el-carousel-item v-for="item in shuju" :key="item">
                        <el-image :src="item.img" style="width: 100%;height: 100%"></el-image>
                      </el-carousel-item>
                    </el-carousel>
                </div>
                <br>
                <div style="width: 450px; height: 90px; text-align: center">
                  <div style="width: 100px; height: 90px;float: left"   v-for="aa in shuju">
                    <el-image :src="aa.img" @click="imagea(aa.img)"></el-image>
                  </div>
                  <div style="float: left;"></div>
                </div>
              </el-col>
              <el-col :span="1">&emsp;</el-col>
              <el-col :span="13">
                <div v-for="aa in shujua">
                  <el-tag type="success"  >商品介绍:</el-tag><a style="font-size: 15px;color: #DCDFE6">&emsp;{{aa.introduce}}</a><br><br>
                  <el-tag type="success" >价格:</el-tag><a >&emsp;￥{{aa.price}}</a><br><br>
                  <el-tag type="info" >名称:</el-tag><a>&emsp;{{aa.cname}}</a><br><br>
                  <el-tag type="warning" >数量:</el-tag><a>&emsp;{{aa.warehouseGoods.stock}}</a><br><br><br><br><br><br>
                 <!-- <el-tag type="danger">标签五:</el-tag><br><br>-->

                  <el-button type="danger"@click="purchase" style="text-align: center;width: 130px;">购买</el-button>&emsp;
                  <el-button type="danger" @click="shoppingcar" style="text-align: center;width: 150px;">购物车</el-button>
                </div>

              </el-col>
            </el-row>
            <el-image style="width: 100%;" src="./src/assets/image/guang.jpg"></el-image>
          </el-col>
          <el-col :span="3">&emsp;</el-col>
        </el-row>

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
      :before-close="handleClose"
      center>
      <span>
        <router-view>

        </router-view>
      </span>
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
  </div>
<!--AA-->
</template>

<script>

  export default {
    name: "MainDetailed",
    data() {
      return {
        show: false,
        shoa: true,
        dialogVisible: false,
        shujua:[{}],
        shuju: [{img: "./src/assets/image/login.jpg"},
          {img: "./src/assets/image/logo.png"},
          {img: "./src/assets/image/logo.png"}],
        imgaa:'',
      }
    },
    methods: {
      //打开登录/注册
      login() {
        this.dialogVisible = true
        this.$router.push("/logins")
        ;
      },
      //注销
      logout() {
        sessionStorage.removeItem("username");  //从浏览器session清空数据
        this.show = !this.show;
        this.shoa = !this.shoa;
        this.$message({
          showClose: true,
          message: '注销成功',
          type: 'error'
        });
      },
      EF() {
        var ca = sessionStorage.getItem("username");
        if (ca != null) {
          this.show = true;
          this.shoa = false;
        }
      },
      //根据id查询单条
      getAlldanshu(){
        var _this=this;
        var cid=sessionStorage.getItem("cid");
        this.$axios.post("queryAllCommodity.action?cId="+cid).then(function (result) {
          _this.shujua=result.data.rows
        }).catch(function (error) {
          alert(error);
          console.log(error);
        });
      },
      //图片切换
      imagea(imguel) {
        this.imgaa=this.shuju.img[1];
      },
      //购买
      purchase(){
        var username=sessionStorage.getItem("username");
        if(!username){
          this.$message({
            showClose: true,
            message: '请登录',
            type: 'error'
          });
          /*this.dialogVisible = true
          this.$router.push("/logins")*/
        }else {
          this.$message({
            showClose: true,
            message: '购买成功',
            type: 'success'
          });
        }
      },
      //购物车
      shoppingcar(){

      }
    },
    created() {
      this.EF();
      this.getAlldanshu();
    }
  }
</script>

<style scoped>
  .dialog .el-dialog {
    background-image: url(http://localhost:8080/shop/img/30.png);
    background-size: 120%;
    padding: 10px;
    height: 400px;
  }
</style>
