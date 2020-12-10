<template>
  <div id="app">
    <merchant></merchant>
  </div>
</template>

<script>
  import Merchant from '../components/merchant/Merchant.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: ''
    }
  },
  components:{
    "merchant":Merchant
  }
}
</script>

<style>

</style>
