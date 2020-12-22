<template>
  <div style="height: 100%;width: 1385px;margin-top: -8px;margin-left: -27px">
    <el-container>
      <el-header style="height: 50px;">
        <div style="background-color: #333;height: 36px;width: 1350px;">
          <el-row>
            <el-col :span="14">
              <el-row align="middle">
                <el-col :span="5">aa</el-col>
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
          <el-col :span="3">1</el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="10">
                <div style="background-color: red;width: 500px;height: 300px;">
                  <vue-photo-zoom-pro style="width: 500px;height: 300px;"
                                      url="./src/assets/image/login.jpg" out-show>
                  </vue-photo-zoom-pro>
                </div>
                <br>
                <div style="border: 1px solid red; width: 500px; height: 90px; text-align: center">
                  <div style="width: 100px; height: 90px;float: left"   >
                    <el-image :src="aa.img" @click="imagea(aa.img)"></el-image>
                  </div>
                  <div style="float: left;">1</div>

                </div>
              </el-col>
              <el-col :span="1">2</el-col>
              <el-col :span="13">3</el-col>
            </el-row>
          </el-col>
          <el-col :span="3">3</el-col>
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
        shuju: [{img: "./src/assets/image/login.jpg"},
          {img: "./src/assets/image/login.jpg"},
          {img: "./src/assets/image/login.jpg"}]
      }
    },
    methods: {
      EF() {
        var ca = sessionStorage.getItem("username");
        if (ca != null) {
          this.show = true;
          this.shoa = false;
        }
      },
      imagea(imguel) {
        alert(imguel)
      }
    },
    created() {
      this.EF();
    }
  }
</script>

<style scoped>

</style>
