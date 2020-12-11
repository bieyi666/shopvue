<template>
  <div>
    这是前端首页
    <!--路由展示-->
    <router-link to="/merchant">
      商户首页
    </router-link>
    <router-link to="/userCenter">
      用户首页
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "MainPage",
    data() {
      return {
        onLine: navigator.onLine,
      }
    },
  }

</script>

<style>

</style>
