<template>
  <div style="width: 360px;height: 300px;background-image:url('./src/assets/image/login.jpg')">
    <div>
      <!--输入框注册-->
      <div style="text-align: center">
        <h1>注册</h1>
      </div>
      <el-row>

        <el-col :span="24">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="ruleForm.phone" style="width: 200px;"></el-input>
              <br>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="passworda">
              <el-input type="password" v-model="ruleForm.passworda" autocomplete="off"
                        style="width: 200px;"></el-input>
            </el-form-item>
            &emsp;&emsp;&emsp;<el-button type="primary" @click="querycha('ruleForm')">注册</el-button>

            &emsp;&emsp;&emsp;已有用户？
            <router-link to="/login">
              立即登录
            </router-link>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
  <!--aa-->
</template>

<script>
  export default {
    name: "register",
    data() {
      return {
        ruleForm: {
          phone: '',
          password: '',
          passworda: ''
        },
        rules: {
          // 手机号
          phone: [
            {
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
              message: "请输入正确手机号码"
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            }
          ],
          passworda: [
            {
              required: true,
              message: '请输入确认密码',
              trigger: 'blur'
            }
          ]
        },
      }
    },
    methods: {
      querycha() {

        var _this = this;
        var params = new URLSearchParams();
        params.append("phone", this.ruleForm.phone);
        params.append("password", this.ruleForm.password);
        this.$axios.post("queryerUserInfo.action?phone=" + this.ruleForm.phone).then(function (result) {
          if (result.data.code == "0") {
            _this.$message({
              showClose: true,
              message: "手机号码重复",
              type: 'error'
            });
          } else {
            if (_this.ruleForm.password >= 6) {
              if (_this.ruleForm.password == _this.ruleForm.passworda) {

                _this.$axios.post("insertUserInfo.action", params).then(function (result) {
                  if (result.data.code == "0") {
                    _this.$message({
                      showClose: true,
                      message: result.data.msg,
                      type: 'success'
                    });
                    _this.$router.push("/login");
                  } else {
                    _this.$message({
                      showClose: true,
                      message: result.data.msg,
                      type: 'error'
                    });
                  }
                })
              } else {
                _this.$message({
                  showClose: true,
                  message: "两处密码不相同",
                  type: 'error'
                });
              }
            } else {
              _this.$message({
                showClose: true,
                message: "密码要大于6位",
                type: 'error'
              });
            }
          }
        })
      },
    }
  }
</script>

<style>

</style>
