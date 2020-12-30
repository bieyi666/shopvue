<template>
  <div style="border: 1px solid #e8e8e8;height: 842px">
    <div style="margin-left: 30%;margin-top: 200px">
      <p>只要您拥有或租有一间房子</p>
      <p>无论您是<b>宝妈</b>，<b>租客</b>或是<b>在家办公人员等工作者</b></p>
      <p>都有资格成为一位商户</p>
    </div>
    <div style="margin-left: 30%;margin-top: 100px">
      <p>1.请确保您拥有足够空间来置放客户购买的商品</p>
      <p>2.请确保您有空闲的时间摆放或发放客户购买的一系列商品</p>
    </div>
    <div style="padding-top: 10%;padding-left: 30%">


      <el-button type="info" @click="dialogVisible = true" style="margin-left: 10%">成为商户</el-button>
      <p>在您申请成为商户后请留意总店打来的的电话，</p>
      <p>我们会与您联系并且于您的住宅进行考察</p>

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
            <img class="Img12" id="StoreImgFile">
            <input type="file" class="ImgFile1" @change="getStoreImg($event)" accept="image/png, image/jpeg, image/gif, image/jpg">
          </el-form-item>

          <el-form-item label="商铺名">
            <el-input style="width: 300px" type="text" v-model="storeApplyData.name" maxlength="10"
                      show-word-limit></el-input>
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

        imageUrl:'',
        storeApplyData: {
          uId: sessionStorage.getItem('uid'),
          photo: '',
          name: '',
          phone: '',
          address: '',
          msg: '',
          img: ''

        },
        dialogVisible: false
      }
    },
    methods: {
      /**
       * 上传单张图片
       * 上传后
       * @param response 返回值
       * @param file
       */
      handleAvatarSuccess(response, file) {
        var _this = this;
      },
      //上传前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        var is = "";
        if (isJPG || isPNG) {
          !isJPG ? is = isPNG : isJPG;
        } else {
          this.$message.error('上传头像图片只能是 JPG、PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return is && isLt2M;
      },

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
          .then(function () {

            _this.dialogVisible = false;
            _this.$message('已提交申请，请留意手机电话');
          })
          .catch(function (error) {
            alert(error)
          });

      },
      getStoreImg: function (event) {  //文件每次选中，触发此方法  将选中的文件内容填充到form中的img  后台通过img获取文件内容
        let img = event.target.files[0];
        let reader = new FileReader();
        //使用该对象读取file文件
        reader.readAsDataURL(img);
        //读取文件成功后执行的方法函数
        reader.onload = function (e) {
          //读取成功后返回的一个参数e，整个的一个进度事件
          // console.log(e);
          //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
          //的base64编码格式的地址
          document.getElementById('StoreImgFile').src = e.target.result;
          // $('#imgshow').get(0).src = e.target.result;
        }
      }
    }
  }
</script>

<style scoped>

  .ImgFile1 {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 108px;
    height: 108px;
    opacity: 0;
    cursor: pointer;
  }

  .Img12 {
    width: 108px;
    height: 108px;
  }
</style>
