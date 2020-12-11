<template>
  <div id="AddressManagement_div">
    <!--      无收货地址div-->
    <div id="noAddress" style="height: 842px;border: 1px solid #e8e8e8;">
      <div class="noAddressDiv" style="display: flex;
        justify-content: center;
        align-items: center">
        <img class="noAddressImg" src="src/assets/image/noAdd.png"><span></span>
      </div>
      <button>新建</button>
    </div><!--无收获地址div结束-->

    <!--    有收获地址div显示-->
    <div id="haveAddress" style="display: none">
      <template>
        <el-table
          :data="tableData"
          style="width: 100%;padding-left: 30px;padding-top: 20px">
          <el-table-column
            prop="name"
            label="店长"
            width="150">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="500">
          </el-table-column>

          <el-table-column label="门店照片">
            <template slot-scope="scope">

              <el-image
                style="width: 100px; height: 100px"
                :src="url"
                :preview-src-list="srcList">
              </el-image>

            </template>
          </el-table-column>
        </el-table>
      </template>
    </div><!--有收获地址div结束-->
  </div>
</template>

<script>
  export default {
    name: "AddressManagement",
    data() {
      return {
        tableData: [{
          name: '张三',
          phone: '13922222222',
          address: '上海市普陀区金沙江路 1518 弄',
          photo: './src/assets/image/noAdd.png'
        }, {
          name: '张三',
          phone: '120',
          address: '上海市普陀区金沙江路 1518 弄',
          photo: './src/assets/image/1601080951299.jpg'
        }, {
          name: '张三',
          phone: '120',
          address: '上海市普陀区金沙江路 1518 弄',
          photo: './src/assets/image/1601080951299.jpg'
        }, {
          name: '张三',
          phone: '120',
          address: '上海市普陀区金沙江路 1518 弄',
          photo: './src/assets/image/1601080951299.jpg'
        }],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
      }
    }
  }
</script>

<style scoped>
  /*<!--  无未完成订单图片居中-->*/
  .noAddressDiv {
    /*border: 1px solid #ccc;*/
    height: 750px;
    width: 750px;
    text-align: center;
    margin: 0 auto;
    /*background: #ccc;*/
  }

  .noAddressImg {
    vertical-align: middle;
  }

  .noAddressDiv span {
    height: 100%;
    width: 0;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle
  }
</style>
