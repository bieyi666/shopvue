<template>
  <div>
    <h1>支付成功</h1>
  </div>
</template>

<script>
  export default {
    name: "",
    created() {
      this.$message("购买成功");
      // 支付成功改变订单状态、
      let data = new URLSearchParams();
      data.set("orderId", sessionStorage.getItem('message'));
      this.$axios.post("upOrderInfo.action", data);
    }
  }
</script>

<style scoped>

</style>
