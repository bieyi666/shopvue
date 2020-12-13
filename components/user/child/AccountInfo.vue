<template>
  <div id="accountinfo">
    <!--      账号信息标题栏-->
    <div id="accountinfo_title" style="">
      <!--        账号信息基本信息标题栏-->
      <div id="jiben_title" style="">
        <el-row>
          <el-col style="margin-top: 7px;position: absolute">
            <span>基本信息</span>
          </el-col>
        </el-row>

      </div>
    </div>
    <!--    个人信息主体-->

<!--更换头像div-->
<div style="display: none">
</div>

    <div id="accountinfo_div" style="">
      <!--      form表单div-->
      <div style="padding-top: 50px;padding-left: 40px">
        <!--      可直接修改用户信息form-->
        <el-form ref="form" :model="form" label-width="80px">
<!--          用户头像form-->
          <el-form-item label="用户头像">
            <el-input v-model="form.photo" style="display: none"></el-input>
            <div class="accountinfo_form_input">
              <el-avatar :size="100" :src="form.photo"></el-avatar>
              <a style="font-size: large">
              <i class="el-icon-edit el-avatar--large"></i>
              </a>
            </div>

<!--            用户idform-->
          </el-form-item>
          <el-form-item label="用户id">
            <el-input v-model="form.uid" style="display: none"></el-input>
            <label class="accountinfo_form_input">{{form.uid}}</label>
          </el-form-item>

<!--          用户名form-->
          <el-form-item label="用户名">
            <el-input class="accountinfo_form_input" v-model="form.uname" style="width: 200px"></el-input>
          </el-form-item>

<!--          手机号form-->
          <el-form-item label="手机号">
            <el-input class="accountinfo_form_input" v-model="form.phone" style="width: 200px"></el-input>
          </el-form-item>

<!--          submi  form-->
          <el-form-item style="padding-left: 50px">
            <el-button type="primary" @click="onSubmit">立即保存</el-button>
          </el-form-item>
        </el-form>

      </div><!---form表单div结束-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "AccountInfo",
    data() {
      return {
        form: {},
        imageUrl: ''
      }
    },
    methods: {
      //获取用户信息
      getUserData() {
        var _this = this;
        this.$axios.get("queryUserInfo.action?uid=" + 2)
          .then(function (result) {
            _this.form = result.data;
          })
          .catch(function (error) {
            alert(error)
          })
      },
      onSubmit() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("uid", _this.form.uid);
        params.append("uName", _this.form.uname);
        params.append("phone", _this.form.phone);
        params.append("password", _this.form.password);
        params.append("photo", _this.form.photo);



        this.$axios.post("editUserInfo.action",params)
          .then(function (result) {
            if(result.data==1){
              alert("修改成功")
            }
          })
          .catch(function (error) {
            alert(error)
          })
      }

    },
    created: function () {
      this.getUserData();
    }
  }
</script>

<style>
  /*基本信息边框*/
  #jiben_title {
    border-top: 5px solid #CC9756; /*上边框*/
    border-right: 1px solid #e8e8e8; /*右边框*/
    border-bottom: 1px solid white; /*下边框*/
    border-left: 1px solid #e8e8e8; /*左边框*/
    width: 100px;
    background: white;
    height: 35px;
    text-align: center
  }

  /*  账号信息div*/
  #accountinfo_div {
    border-top: 0px; /*上边框*/
    border-right: 1px solid #e8e8e8; /*右边框*/
    border-bottom: 1px solid #e8e8e8; /*下边框*/
    border-left: 1px solid #e8e8e8; /*左边框*/
    height: 801px;
  }

  #accountinfo_title {
    height: 40px;
    border: 0px;
    background: #f4f4f4;
    border-top: 1px solid #e8e8e8; /*上边框*/
    border-right: 1px solid #e8e8e8; /*右边框*/
    border-bottom: 1px solid #e8e8e8; /*下边框*/
    border-left: 0px; /*左边框*/
  }

  .accountinfo_form_input {
    padding-left: 60px;
  }
</style>
