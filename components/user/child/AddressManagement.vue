<template>
  <div id="AddressManagement_div">

    <div id="Address" style="height: 842px;border: 1px solid #e8e8e8;">

      <!--      &lt;!&ndash;      无收货地址div&ndash;&gt;-->
      <!--      <div class="noAddressDiv" style="display: flex;-->
      <!--        justify-content: center;-->
      <!--        align-items: center">-->
      <!--        <img class="noAddressImg" src="src/assets/image/noAdd.png"><span></span>-->
      <!--        <button style="position: absolute;left: 54.5%;top: 34%">新建</button>-->
      <!--      </div>&lt;!&ndash;无收获地址div结束&ndash;&gt;-->


      <!--    有收获地址div显示-->
      <div id="haveAddress">
        <template>
          <el-table
            :data="tableData"
            style="width: 100%;padding-left: 30px;padding-right: 30px;padding-top: 40px">

            <el-table-column
              label="信息"
              width="">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>商户名: {{ scope.row.name }}</p>
                  <p>提货地址: {{ scope.row.address }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag type="warning" size="medium">{{ scope.row.name }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>


            <el-table-column
              label="联系方式"
              width="">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.phone }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="标签"
              width="">
              <template slot-scope="scope">
                <el-tag type="" size="medium">{{ scope.row.tag }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template slot="header" slot-scope="scope">
                <el-button type="primary" size="mini" @click="dialogFormVisible = true">新增收货地址</el-button>
              </template>
              <template slot-scope="scope">
                <el-button type="warning" plain
                           size="mini"
                           @click="EditAddress(scope.row)"
                            v-if="defaultStoreid!=scope.row.storeid"
                >设为默认
                </el-button>
              </template>
            </el-table-column>
            <el-table-column align="left">
              <template slot-scope="scope">
                <div @click="delUserAddress(scope.row)">
                  <i class="el-icon-delete"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </div><!--有收获地址div结束-->
    </div>

    <el-dialog title="新增收货地址" :visible.sync="dialogFormVisible" width="30%" @close="closeDialog">
      <el-form>

        <el-form-item label="选择商户">
          <el-button size="mini" @click="dialogTableVisible=true, getAllStore()">选择</el-button>
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="sstoreid"
            style="width: 220px;display: none"
          />
          <el-input
            type="text"
            placeholder=""
            v-model="sname" :disabled="true" size="mini"
            style="width: 180px"
          />
        </el-form-item>

        <el-form-item label="添加标签">
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="stag"
            maxlength="10"
            show-word-limit
            style="width: 240px"
          />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false,addAddress()">添 加</el-button>
      </div>
    </el-dialog>

    <el-dialog title="商户列表" :visible.sync="dialogTableVisible" width="30%">
      <el-input
        v-model="search"
        @input="getAllStore"
        size="mini"
        placeholder="输入商户名搜索"/>
      <el-table
        :data="storeData"
        style="width: 100%"
        @row-dblclick="dblclick"
      >
        <el-table-column
          label="商铺名"
          width=""
          align="center">
          <template slot-scope="scope">
            <i class="el-icon-house"></i>
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="信息"
          width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>地址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.phone}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>


    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: "AddressManagement",
    data() {
      return {
        sname:'',

        sstoreid: '',
        stag: '',
        uid: sessionStorage.getItem('uid'),


        defaultStoreid: sessionStorage.getItem('shstoreid'),

        dialogFormVisible: false,
        dialogTableVisible: false,


        sel: '',
        tableData: [],

        total: 0,
        page: '',
        rows: '',
        storeData: [],
        search: ''
      }
    },
    methods: {
      closeDialog(){
        var _this = this;
        _this.sname = '';
        _this.sstoreid = '';
      },

      delUserAddress(row){
        var _this = this;
        this.$axios.get("delUserAddress.action?aid=" + row.aid)
          .then(function () {
            _this.getUserAddress();
            this.$message.success('删除成功');
          })
          .catch(function (error) {
            alert(error)
          })
      },

      //添加地址按钮
      addAddress(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("uid", _this.uid);
        params.append("shstoreid", _this.sstoreid);
        params.append("tag", _this.stag);

        this.$axios.post("addUserAddress.action", params)
          .then(function () {
            _this.getUserAddress();
            _this.dialogFormVisible = false
          })
          .catch(function (error) {
            alert(error)
          })
      },

      getAllStore() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("page", _this.page);
        params.append("rows", _this.rows);
        params.append("name", _this.search);

        this.$axios.post("queryAllStore.action", params)
          .then(function (result) {
            _this.storeData = result.data.rows;
            _this.total = result.data.total;
          })
          .catch(function (error) {
            alert(error)
          })
      },
      dblclick(row){
        var _this = this
        _this.sname = row.name;
        _this.sstoreid = row.storeId;
        _this.dialogTableVisible = false
      },


      getUserAddress() {
        var _this = this;
        this.$axios.get("queryUserAddress.action?uid=" + _this.uid)
          .then(function (result) {
            _this.tableData = result.data;
          })
          .catch(function (error) {
            alert(error)
          })
      },
      EditAddress(row) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("shstoreid", row.storeid);
        params.append("uid", _this.uid);
        this.$axios.post("editUserAddress.action", params)
          .then(function (result) {

            sessionStorage.removeItem("shstoreid");
            sessionStorage.setItem("shstoreid", row.storeid);

            _this.getUserAddress()
          })
          .catch(function (error) {
            alert(error)
          })
      }
    },
    created: function () {
      this.getUserAddress();
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
