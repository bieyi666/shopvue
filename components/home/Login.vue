<!--登录页面-->
<template>
  <div>
<!--    <el-image src="./src/assets/image/login.jpg">-->
    <!--输入框登录-->
    <div style="margin-left: 150px">
      <h1>登录</h1>
    </div>
    <el-row>

      <el-col :span="24">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                 style="width: 300px"
                 label-position="right" size="mini"
                 class="demo-ruleForm">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="ruleForm.phone" style="width: 200px;"></el-input>
            <br>
          </el-form-item>
          <el-form-item label="输入密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item >
            &emsp;
          </el-form-item>
          &emsp;&emsp;&emsp;<el-button type="primary" @click="open('ruleForm')">登录</el-button>

          &emsp;&emsp;&emsp;没有用户？

          <a href="#" @click="login">
            立即注册
          </a>
        </el-form>
      </el-col>
    </el-row>
  </div>
  <!--aa-->
</template>
<script>
  export default {
    name: "MainUser",
    data() {
      return {
        ruleForm:{
          phone: '',
          password: ''
        },
        rules:{
          phone:[
            {
              required:true,
              message: '请输入手机号',
              trigger: 'blur'
            }
          ],
          password:[
            {
              required:true,
              message: '请输入密码',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      login(){
        if (this.$route.path === "/login"){
          this.$router.push("/register");
        }else if(this.$route.path === "/logis"){
          this.$router.push("/registers");
        }else {
          this.$router.push("/registera");
        }

      },
      open: function () {
        var _this = this;
        var params = new URLSearchParams();
        params.append("phone", this.ruleForm.phone);
        params.append("password", this.ruleForm.password);
        if(this.phone!=''){
          this.$axios.post('queryerUserInfo.action',params).then(function (result) {
            if(result.data.code =="0"){
              _this.$message({
                showClose: true,
                message: result.data.msg,
                type: 'success'
              });
              sessionStorage.setItem("username",result.data.username);
              sessionStorage.setItem("uid",result.data.uid);

              _this.$parent.$parent.dialogVisible = false;
              _this.$parent.$parent.show=true;
              _this.$parent.$parent.shoa=false;
              if (this.$route.path === "/logins"){
                _this.$router.push("/mainDetailed");
              }else {
                _this.$router.push("/mainPage");
              }


            }else {
              //弹出消息  停留在该页面
              _this.$message({
                showClose: true,
                message:result.data.msg,
                type: 'error'
              });
            }
          }).catch(function (error) {
          });
        }else {

        }
      },
    }
  }

</script>

<style scoped>
  .div-vertical-middle {
    line-height: 50px;
    vertical-align: middle;
    display: table-cell;
  }
</style>
