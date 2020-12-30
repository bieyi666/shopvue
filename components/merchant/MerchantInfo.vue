<!--商户信息-->
<template>
  <div>
    <el-form :model="storeFrom" status-icon :rules="rules" ref="storeFrom" label-width="100px" class="demo-storeFrom">
      <el-form-item label="名称" prop="name">
        <el-input type="text" v-model="storeFrom.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input type="text" v-model="storeFrom.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input disabled v-model="storeFrom.address"></el-input>
      </el-form-item>
      <el-form-item label="店铺图片" :label-width="labelWidth" >
        <!--<input type="file" @change="getFile($event)">-->
        <el-upload
          class="avatar-uploader"
          :action="this.$upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img style="height: 100px" v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateMerchantInfo('storeFrom')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "MerchantInfo",
    data() {
      return {
        imageUrl: null,
        labelWidth: '120px',
        photo: '', //头像
        storeFrom: {
          storeId: '',
          uId: '',
          name: '',
          phone: '',
          address: '',
          photo: '',
          state: '',
          msg: '',
          image: ''
        },
        rules: {
          image: [{
            required: true, //是否必填
            message: '图片不能为空', //规则提示
            trigger: 'blur' //何事件触发
          }],
        }
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
        response!=null && response!=""?this.photo=response:null;
        this.imageUrl = URL.createObjectURL(file.raw);
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

      /**
       * 修改数据
       */
      updateMerchantInfo(){
        /* formData格式提交： */
        var _this=this;
        let formData = new URLSearchParams();
        for(var key in this.storeFrom){
          if(key!='orderInfo'){
            formData.append(key,this.storeFrom[key]);
          }

        }
        formData.delete("photo");
        formData.append("photo",this.photo);
        this.$axios.post("updateStoreInfoBySid.action",formData).then((res)=>{
          if (res.data == '修改成功'){
            _this.$message({
              message: '修改成功',
              type: 'success'
            });
            _this.$router.push({path: '/hc'});
            setTimeout(() => {
              _this.$router.push({path: '/MerchantMain'});
            }, 1);
          }else {
            _this.$message({
              message: '修改失败',
              type: 'error'
            });
          }


        }).catch((reason => {
          alert(reason)
        }));
      }

      /*submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /!*!//阻止元素发生默认的行为
            event.preventDefault();*!/
            let formData = new FormData();
            // formData.append("img",this.addform.img);
            //将需要提交的表单数据 快速组装为H5定义的类型FormData
            Object.keys(_this.storeFrom).forEach((key) => {
              formData.append(key, _this.storeFrom[key]);
            });

            //此处使用原生的axios，因为文件提交 要设置 类型Content-Type=multipart/form-data，切记，需要post提交
            //此处axios原生类似于 jquery的 原生  $.ajax 和 $.get  $.post
            this.$axios({
              method: 'post',
              url: 'updateStoreInfoBySid.action',
              data: formData,
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
              .then(function (response) {
                _this.$message({
                  message: response.data,
                  type: 'success'
                });
                _this.$router.push("/merchant");
              })
              .catch(function (error) {
                alert("上传失败");
                console.log(error);
              });


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },*/
      /* getFile: function (event) {  //文件每次选中，触发此方法  将选中的文件内容填充到addform中的img  后台通过img获取文件内容
         this.storeFrom.image = event.target.files[0];
         this.storeFrom.photo = event.target.files[0].name;
       }*/

    },
    created() {
      this.storeFrom = this.$route.query.store;
      this.photo = this.$route.query.store.photo;
      this.imageUrl = this.$host + this.$route.query.store.photo;
    }
  }
</script>

<style scoped>

</style>
