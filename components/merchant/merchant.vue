<template>
  <div>
    <!--头部菜单-->
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>

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
          <el-avatar  :size="80" :src="store.photo" :key="store.photo"></el-avatar>
         <br>
          <span>
              <i class="el-icon-setting"></i>
          </span>
          <!--<el-image :src="'./image/'+store.photo" style="height: 60px">
          </el-image>-->
        </el-header>
        <!--左 菜单折叠按钮-->
        <!-- <el-button @click="handle">
           <i :class="icon"></i>
         </el-button>-->
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </div>

      <!--主体内容-->
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "merchant",
    data() {
      return {
        isCollapse: false, //初始打开菜单
        icon: "el-icon-s-fold", //折叠按钮图标
        store:{},
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
        var _this=this;
        this.$axios.get("queryStoreByUid.action?uid="+1)
          .then(function (result) {
            _this.store=result.data;
          })
          .catch(function (error) {
            alert(error)
          })
      }
    },
    created:function () {
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
    background-color: #fadb05;
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


</style>
