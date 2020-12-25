<!--文件上传-->
<template>
  <div>
    <el-upload action=""
               :file-list="fileList"
               list-type="picture-card"
               multiple
               ref="upload_img"
               accept=".jpg, .jpeg, .png"
               :http-request="handleTestSuccess">
      <i class="el-icon-plus"></i>
    </el-upload>


    <el-upload
      class="avatar-uploader"
      :action="this.$upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

  </div>
</template>

<script>
  export default {
    name: "TestUpload",
    data() {
      return {
        fileList: [
          {
            name: "测试", url: this.$host + "30.png"
          }
        ],
        imageUrl: this.$host + "30.png"
      };
    },
    methods: {
      //多张上传图片
      handleTestSuccess(file) {

        // 验证图片格式
        if (file.file.type.indexOf('image') == -1) {
          // 文件格式
          this.$message.error('请上传图片类型的文件')
          //删除上传失败的图片，不然会占位
          this.$refs.upload_img.uploadFiles = this.$refs.upload_img.uploadFiles.filter(
            (item) => {
              return file.file.name != item.name
            }
          )
          return
        }
        //构建一个formData对象，因为这里要求表单类型的数据
        const formData = new FormData()
        formData.append('image', file.file)
        this.$axios.post('insertCommodityPrint.action', formData, {
          headers: {
            //携带的参数
          },
        })
          .then((res) => {
            if (res.status === 200) {
              //数据处理
              this.$message.success('上传检测表附件成功!')
            }
          })
          .catch((err) => {
            //删除上传失败的图片，不然会占位
            this.$refs.upload_img.uploadFiles = this.$refs.upload_img.uploadFiles.filter(
              (item) => {
                return file.file.name != item.name
              }
            )
            this.$message.error('上传失败!')
          })
      },


      /**
       * 上传单张图片
       * 上传后
       * @param response 返回值
       * @param file
       */
      handleAvatarSuccess(response, file) {
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
      }

    },
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
