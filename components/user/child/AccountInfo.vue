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
    <div id="accountinfo_div" style="">
      <!--      form表单div-->
      <div style="padding-top: 50px;padding-left: 40px">
        <!--      可直接修改用户信息form-->
        <el-form ref="form" :model="form" label-width="80px">
          <!--          用户头像form-->
          <el-form-item label="用户头像">
<!--                        <el-input v-model="form.photo"></el-input>-->
            <div class="accountinfo_form_input">
              <a @click="dialogVisible = true">
                <img :src="$host+form.photo" style="width: 100px;height: 100px;border-radius:50%">
              </a>

<!--          更换头像dialog-->
              <el-dialog
                title="设置头像"
                :visible.sync="dialogVisible"
                width="30%"
              >
                <br>
                <div class="a-upload" style="margin-left: 33%">
                  <input type="file" @change="getFile($event)" accept="image/png, image/jpeg, image/gif, image/jpg">点击上传图片
                </div>
                <br>
                <br>
                <br>
              </el-dialog>
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
        usersId: sessionStorage.getItem('uid'),

        //更换头像div可见属性
        dialogVisible: false,
        //
        form: {
          uid: 0,
          uname: '',
          phone: '',
          photo: '',
          shstoreid:sessionStorage.getItem("shstoreid"),
          img: ''  //保存文件内容
        }
      }
    },
    methods: {
      //获取用户信息
      getUserData() {
        var _this = this;
        this.$axios.get("queryUserInfo.action?uid=" + _this.usersId)
          .then(function (result) {
            _this.form = result.data;
          })
          .catch(function (error) {
            alert(error)
          })
      },

      //确认修改信息
      onSubmit() {
        var _this = this;

        //阻止元素发生默认的行为
        event.preventDefault();
        let formData = new FormData();
        // formData.append("img",this.form.img);
        //将需要提交的表单数据 快速组装为H5定义的类型FormData
        Object.keys(_this.form).forEach((key) => {
            formData.append(key, _this.form[key]);
            // alert(key+""+_this.form[key])
            formData.delete("orderInfo");

        });
        //提交要修改的信息
        this.$axios({
          method: 'post',
          url: 'QeditUserInfo.action',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(function (response) {
            _this.getUserData();
          })
          .catch(function (error) {
            alert(error)
          });

      },
      getFile: function (event) {  //文件每次选中，触发此方法  将选中的文件内容填充到form中的img  后台通过img获取文件内容
        this.form.img = event.target.files[0];
        this.dialogVisible = false;
        this.onSubmit()
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


  /*  头像上传*/
  .a-upload {
    text-align: center;
    padding: 4px 10px;
    height: 50px;
    width: 150px;
    line-height: 50px;
    position: relative;
    cursor: pointer;
    color: #888;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1
  }

  .a-upload input {
    position: absolute;
    font-size: 150px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
  }

  /*.a-upload:hover {*/
  /*  color: #444;*/
  /*  background: #eee;*/
  /*  border-color: #ccc;*/
  /*  text-decoration: none*/
  /*}*/
</style>
