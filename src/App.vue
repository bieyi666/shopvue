<template>
  <div id="app">
    <router-view>

    </router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style>
  ::-webkit-scrollbar {
    width: 13px;
    height: 13px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: pink;
    background-clip: padding-box;
    border: 3px solid transparent;
    border-radius: 7px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
</style>
