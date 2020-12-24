<template>
  <div id="shoppingCatCom" v-if="shoppingBool">
    <!--遮盖层-->
    <div class="cover"></div>
    <!--购物车页面-->
    <div class="shoppingView" :class="shoppingViewClass">
      <!--关闭按钮-->
      <div class="shoppingCloseBtn">
        <el-button type="text" @click="shoppingCloseBtnClick">
          <i class="el-icon-close" ></i>
        </el-button>
      </div>
      <!--标题-->
      <div class="myShoppingCat">
        <h3>我的购物车</h3>
      </div>
      <!--商品内容-->
      <div></div>
      <!--页尾-->
      <div>
        <!--全选-->
        <!--删除-->
        <!--总数量-->
        <!--总价格-->
        <!--结算-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "shoppingCatCom",
    data() {
      return {
        shoppingBool: false,
        shoppingViewClass: "shoppingViewAn"
      }
    },
    methods: {
      // 关闭购物车窗口div
      shoppingCloseBtnClick() {
        // 添加结束动画
        this.shoppingViewClass = "shoppingViewCloseAn";
        // 动画执行完毕后关闭页面
        setTimeout(() => {
          this.shoppingBool = false;
          this.shoppingViewClass = "shoppingViewAn";
        }, 1000);
      }
    }
  }
</script>

<style scoped>
  .cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    opacity: 0.6;
    z-index: 11;
  }

  .shoppingView {
    position: fixed;
    left: 1400px;
    top: 100px;
    z-index: 12;
    width: 900px;
    height: 500px;
    background: #ffffff;
    box-shadow: 0 0 5px #999;
    display: flex;
    overflow: auto;
    border-radius: 10px;
  }

  .shoppingViewAn {
    animation: shoppingViewAn 1s;
    animation-fill-mode: forwards;
  }

  @keyframes shoppingViewAn {
    to {
      left: 250px
    }
  }

  .shoppingCloseBtn {
    position: absolute;
    top: 12px;
    right: 29px;
    padding: 0;
  }

  .shoppingCloseBtn .el-button {
    padding: 0px;
  }

  .shoppingCloseBtn button i {
    color: #909399;
    font-size: 16px;
  }

  .shoppingCloseBtn button i:hover {
    color: blue;
  }

  .shoppingViewCloseAn {
    left: 250px;
    animation: shoppingViewCloseAn 1s;
    animation-fill-mode: forwards;
  }

  @keyframes shoppingViewCloseAn {
    to {
      left: 1400px
    }
  }

  .myShoppingCat {
    margin: 0 auto;
  }
</style>
