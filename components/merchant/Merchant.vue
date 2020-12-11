<!--商户中心-->
<template>

  <div>
    <!--头部菜单-->
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <router-link to="/mainPage">
          返回购物中心
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">注销登录</el-menu-item>
      <el-menu-item index="3">
        <router-link to="/merchantMain">
          商户首页
        </router-link>
      </el-menu-item>
    </el-menu>

    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <div class="grid-content bg-purple">


          <!--主体部分-->
          <el-container>
            <!-- 左边菜单-->
            <div>
              <el-header style="height: 250px;text-align: center">
                <!--这里是商户名称-->
                <span>
          {{store.name}}
          </span>
                <br>
                <!--这里是商户图片-->
                <router-link to="/merchantInfo">
                  <el-avatar :size="80" :src="store.photo" :key="store.photo"></el-avatar>
                </router-link>

                <br>
                <!--这里是设置-->
                <span>
            <!--路由地址-->
             <router-link to="/merchantInfo">
               <i class="el-icon-setting"></i>
             </router-link>

          </span>
                <!--<el-image :src="'./image/'+store.photo" style="height: 60px">
                </el-image>-->
              </el-header>
              <!--左 菜单折叠按钮-->
              <!-- <el-button @click="handle">
                 <i :class="icon"></i>
               </el-button>-->
              <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
                <el-menu-item index="1">
                  <i class="el-icon-document"></i>
                  <span slot="title">
              <router-link to="/merchantOrder">
               我的订单
              </router-link>
            </span>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-document"></i>
                  <span slot="title">团队订单</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-document"></i>
                  <span slot="title">
              <router-link to="/merchantIncome">
              我的收入
              </router-link>
            </span>
                </el-menu-item>
              </el-menu>
            </div>

            <!--主体内容-->
            <el-main>
              <!--路由展示-->
              <router-view>

              </router-view>

            </el-main>
          </el-container>


      </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>

  export default {
    name: "merchant",
    data() {
      return {
        isCollapse: false, //初始打开菜单
        icon: "el-icon-s-fold", //折叠按钮图标
        store: {},
        display: "block" //block
      }
    },
    methods: {
      //打开 or 关闭菜单
      handle() {
        if (this.isCollapse == true) {
          this.icon = "el-icon-s-fold";
          this.isCollapse = false;
        } else {
          this.icon = "el-icon-s-unfold";
          this.isCollapse = true;
        }

      },
      //获取商户数据
      getStoreData() {
        var _this = this;
        this.$axios.get("queryStoreByUid.action?uid=" + 1)
          .then(function (result) {
            _this.store = result.data;
          })
          .catch(function (error) {
            alert(error)
          })
      }
    },
    components: {
    },
    created: function () {
      this.getStoreData();
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-header {
    background-color: aliceblue;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  /*导航菜单*/
  .el-menu-demo {
    min-height: 100px;
  }


</style>
