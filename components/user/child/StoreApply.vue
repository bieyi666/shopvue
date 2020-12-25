<template>
  <div style="border: 1px solid #e8e8e8;height: 842px">
    <div style="padding-top: 60%;padding-left: 20%">

      <el-button type="info" @click="dialogVisible = true">成为商户</el-button>


<!--      商户申请  dialog-->
      <el-dialog
        title="提交信息"
        :visible.sync="dialogVisible"
        :destroy-on-close="true"
        width="50%"
        :before-close="handleClose">

<!--        商户申请提交的信息-->
        <el-form ref="storeApplyData" :model="storeApplyData" label-width="80px">

          <el-form-item label="用户id">
            {{storeApplyData.uId}}
          </el-form-item>

          <el-form-item label="店铺照片">
            <input type="file" @change="getStoreImg($event)" accept="image/png, image/jpeg, image/gif, image/jpg">
          </el-form-item>

          <el-form-item label="商铺名">
            <el-input style="width: 300px" type="text" v-model="storeApplyData.name" maxlength="10" show-word-limit></el-input>
          </el-form-item>

          <el-form-item label="商铺电话">
            <el-input class="accountinfo_form_input" v-model="storeApplyData.phone" style="width: 200px"></el-input>
          </el-form-item>

          <el-form-item label="地址">
            <el-input class="accountinfo_form_input" v-model="storeApplyData.address" style="width: 300px"></el-input>
          </el-form-item>

          <el-form-item label="说明">
            <el-input class="accountinfo_form_input" type="textarea"
                      placeholder="请输入内容"
                      v-model="storeApplyData.msg"
                      maxlength="200"
                      :autosize="{ minRows: 4, maxRows: 4}"
                      show-word-limit></el-input>
          </el-form-item>

          <!--          submi  form-->
          <el-form-item style="padding-left: 50px">
            <el-button type="primary" @click="SubmitStoreApply()">提交</el-button>
          </el-form-item>

        </el-form>


      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StoreApply",
    data() {
      return {
        username: sessionStorage.getItem('username'),

        storeApplyData:{
          uId: sessionStorage.getItem('uid'),
          photo: '',
          name: '',
          phone: '',
          address: '',
          msg: '',
          img:''

        },
        dialogVisible: false
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      SubmitStoreApply() {
        var _this = this;

        //阻止元素发生默认的行为
        event.preventDefault();
        let formStoreApplyData = new FormData();
        // formData.append("img",this.form.img);
        //将需要提交的表单数据 快速组装为H5定义的类型FormData
        Object.keys(_this.storeApplyData).forEach((key) => {
          formStoreApplyData.append(key, _this.storeApplyData[key]);
        });
        //提交要修改的信息
        this.$axios({
          method: 'post',
          url: 'storeApply.action',
          data: formStoreApplyData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(function (response) {
              alert("提交申请成功")
            dialogVisible: false;
          })
          .catch(function (error) {
            alert(error)
          });

      },
      getStoreImg: function (event) {  //文件每次选中，触发此方法  将选中的文件内容填充到form中的img  后台通过img获取文件内容
        this.storeApplyData.img = event.target.files[0];
      }
    }
  }
</script>

<style scoped>

</style>
