<template>
  <div>
    这里是用户中心
    <router-link :to="url">
      测试商户首页
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "UserCenter",
    data() {
      return {
        url:'/merchant'
      }
    }

  }
</script>

<style scoped>

</style>
