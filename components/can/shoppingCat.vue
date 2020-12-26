<template>
  <div id="shoppingCatCom" v-if="shoppingBool">
    <!--遮盖层-->
    <div class="cover"></div>
    <!--购物车页面-->
    <div class="shoppingView" :class="shoppingViewClass" @scroll="Scroll">
      <!--关闭按钮-->
      <div class="shoppingCloseBtn" v-if="shoppingCloseBtnBool">
        <el-button @click="shoppingCloseBtnClick" icon="el-icon-close" circle></el-button>
      </div>
      <!--标题-->
      <div class="myShoppingCat">
        <h3>我的购物车</h3>
      </div>
      <!--商品内容-->
      <div class="goodsContent">
        <el-table
          :data="shop"
          style="width: 100%">
          <template slot="empty">
            <img style="width: 350px" src="../../src/assets/test/kkry.png"/>
          </template>
          <el-table-column width="80px">
            <template slot="header" slot-scope="[]">
              <el-checkbox v-if="allCheckedBool" v-model="allChecked" :indeterminate="halfChecked"
                           @change="shoppingCheckBox = true">全选
              </el-checkbox>
              <el-checkbox disabled v-else>全选</el-checkbox>
            </template>
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked" @change="shoppingCheckBox = true"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column width="112px">
            <template slot-scope="scope">
              <el-image
                :src="'../../src/assets/test/'+scope.row.img"
                :preview-src-list="['../../src/assets/test/'+scope.row.img]">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column width="190.85px">
            <template slot-scope="scope">
              <span class="goodsName">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价(元)" align="center">
            <template slot-scope="scope">
              <span>￥{{scope.row.price}}</span>
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center" width="141px">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number" :min="1"
                               :max="scope.row.inventory" size="mini"
                               @change="shoppingCatGoodsNumberChange(scope.row.id)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="小计(元)" align="center">
            <template slot-scope="scope">
              <span style="color: #e70404">￥{{scope.row.subtotal}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template slot="header" slot-scope="[]">
              <el-button type="text" @click="setEditCloseBtn" v-if="allCheckedBool">{{editText}}</el-button>
              <el-button type="text" v-else disabled>{{editText}}</el-button>
            </template>
            <template slot-scope="scope">
              <div class="elIconCloseBtn" v-if="editCloseBtn" @click="CloseGoodsBtnClick(scope.row)">
                <i class="el-icon-close"></i>
              </div>
              <span v-else>- -</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--      <div class="shoppingCatFooter" v-if="shoppingCatFooterClass === 'shoppingCatFooterFixed'">-->
      <!--      </div>-->
      <!--页尾-->
      <div :class="shoppingCatFooterClass" :style="`top: ${shoppingCatFooterTop}px`">
        <!--全选-->
        <div class="shoppingCheckBoxFooter">
          <el-checkbox v-if="allCheckedBool" v-model="allChecked" :indeterminate="halfChecked"
                       @change="shoppingCheckBox = true">全选
          </el-checkbox>
          <el-checkbox disabled v-else>全选</el-checkbox>
        </div>
        <!--删除-->
        <div class="shoppingCloseBtnFooter">
          <el-button type="text" @click="GoodsDelChecked" v-if="allCheckedBool">删除已选中</el-button>
          <el-button type="text" v-else disabled>删除已选中</el-button>
        </div>
        <!--数量-->
        <div class="shoppingNumberFooter">
          <span>共5件商品， 已选择
            <span style="color: #00c3f5;font-size: 15px;margin-right: 3px">0</span>件
          </span>
        </div>
        <!--结算-->
        <div class="shoppingCatSettlementFooter">
          <el-button type="danger" size="mini" disabled v-if="!shoppingCatSettlementFooterBtn">去结算</el-button>
          <el-button type="danger" size="mini" v-else>去结算</el-button>
        </div>
        <!--总价格-->
        <div class="shoppingPriceSumFooter">
          <span>合计(不含运费)：</span>
          <span class="span">￥150002.88</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "shoppingCatCom",
    data() {
      return {
        // true 窗口打开
        shoppingBool: false,
        // 动画，开始动画和结束动画
        shoppingViewClass: "shoppingViewAn",
        // 商品数组
        shop: [
          {
            id: 1,
            name: "ak47",
            inventory: 200,
            number: 1,
            price: 1300,
            img: "ak47.jpg",
            type: "自动步枪",
            subtotal: 1300,
            checked: false
          },
          {
            id: 2,
            name: "ak74",
            inventory: 150,
            number: 1,
            price: 2300,
            img: "ak74.jpg",
            type: "突击步枪",
            subtotal: 2300,
            checked: false
          },
          {
            id: 3,
            name: "HK416",
            inventory: 50,
            number: 1,
            price: 2400,
            img: "HK416.jpg",
            type: "自动步枪",
            subtotal: 2400,
            checked: false
          },
          {
            id: 4,
            name: "m4a1",
            inventory: 500,
            number: 1,
            price: 1400,
            img: "m4a1.jpg",
            type: "突击步枪",
            subtotal: 1400,
            checked: false
          },
          {
            id: 5,
            name: "mk47",
            inventory: 20,
            number: 1,
            price: 3500,
            img: "mk47.jpg",
            type: "自动步枪",
            subtotal: 3500,
            checked: false
          },
          {
            id: 6,
            name: "uzi",
            inventory: 600,
            number: 1,
            price: 1000,
            img: "uzi.jpg",
            type: "冲锋枪",
            subtotal: 1000,
            checked: false
          },
          {
            id: 7,
            name: "s686",
            inventory: 100,
            number: 1,
            price: 800,
            img: "s686.jpg",
            type: "霰弹枪",
            subtotal: 800,
            checked: false
          },
        ],
        // 删除按钮是否显示
        editCloseBtn: false,
        // 提示 编辑/完成
        editText: "编辑",
        // 是否全选
        allChecked: false,
        // 是否半选
        halfChecked: false,
        // 判断shop的属性值变动是不是因为checkBox
        shoppingCheckBox: false,
        // 页尾样式
        shoppingCatFooterClass: "shoppingCatFooter",
        // 关闭按钮是否显示
        shoppingCloseBtnBool: true,
        // 结算按钮可用不可用
        shoppingCatSettlementFooterBtn: false,
        // 页脚的位置，随商品的对少变化
        shoppingCatFooterTop: 0,
        // 全选框是否能用
        allCheckedBool: true
      }
    },
    methods: {
      // 监听滚动事件
      Scroll(e) {
        if (this.shop.length > 4) {
          // 判断滚动条将滚动到底部时
          if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight - 150) {
            this.shoppingCatFooterClass = "shoppingCatFooter";
            this.shoppingCatFooterTop = (this.shop.length + 1) * 125;
          } else {
            this.shoppingCatFooterClass = "shoppingCatFooterFixed";
            this.shoppingCatFooterTop = 540;
          }
        }
      },
      // 关闭购物车窗口div
      shoppingCloseBtnClick() {
        // 添加结束动画
        this.shoppingViewClass = "shoppingViewCloseAn";
        // 隐藏关闭按钮
        this.shoppingCloseBtnBool = false;
        //
        setTimeout(() => {
          this.shoppingCatFooterClass = "";
        }, 1);
        // 动画执行完毕后关闭页面
        setTimeout(() => {
          this.shoppingBool = false;
          this.shoppingViewClass = "shoppingViewAn";
          this.shoppingCatFooterClass = "shoppingCatFooter";
          this.shoppingCloseBtnBool = true;
        }, 500);
      },
      // 显示/关闭删除按钮
      setEditCloseBtn() {
        this.halfChecked = false;
        if (this.editCloseBtn) {
          this.editCloseBtn = false;
          this.editText = "编辑";
        } else {
          this.editCloseBtn = true;
          this.editText = "完成";
        }
      },
      // 购物车商品数量变动
      shoppingCatGoodsNumberChange(id) {
        this.shop.forEach((item) => {
          if (item.id === id) {
            item.subtotal = item.number * item.price;
          }
        });
      },
      // 删除当前行商品 row 行数据
      CloseGoodsBtnClick(row) {
        // 弹出提示框，您确定要删除该商品吗？
        this.$confirm('您确定要删除该商品吗？', '删除', {
          confirmButtonText: '取消',
          cancelButtonText: '删除'
        }).then(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 1000
          });
        }).catch(() => {
          // 先删除页面商品数组中的商品
          this.shop.forEach((item, index) => {
            if (item.id === row.id) {
              this.shop.splice(index, 1);
            }
          });
          // 再删除后台购物车表中的商品
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1000
          });
        });
      },
      // 删除选中商品
      GoodsDelChecked() {
        if (this.shop.search("checked", true).size > 0) {
          // 弹出提示框，您确定要删除该商品吗？
          this.$confirm('您确定要删除该商品吗？', '删除', {
            confirmButtonText: '取消',
            cancelButtonText: '删除'
          }).then(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
              duration: 1000
            });
          }).catch(() => {
            // 将这个变成true 让监听可以满足条件
            this.shoppingCheckBox = true;
            // 删除选中的商品
            let goods = this.shop.remove("checked", true);
            // 删除数据库购物车表的数据
            console.log(goods);
          });
        } else {
          this.$message({message: "请选择您要删除的商品", type: "warning"});
        }
      }
    },
    watch: {
      allChecked(val) {
        if (val) {
          this.shop.forEach((item) => {
            item.checked = true;
          });
        } else {
          this.shop.forEach((item) => {
            item.checked = false;
          });
        }
      },
      shop: {
        handler(val) {
          // 判断shop的属性值变动是不是因为checkBox
          if (this.shoppingCheckBox) {
            if (val.length > 0) {
              // 如果是则判断全选框的选中状态  半选 选中 未选中
              let a = 0;
              val.forEach((item) => {
                if (!item.checked) {
                  a = 1;
                }
              });
              if (a === 1) {
                val.forEach((item) => {
                  if (item.checked) {
                    a = 2;
                  }
                });
                if (a === 2) {
                  this.shoppingCatSettlementFooterBtn = true;
                  this.halfChecked = true;
                } else {
                  this.halfChecked = false;
                  this.allChecked = false;
                  this.shoppingCatSettlementFooterBtn = false;
                }
              } else {
                this.halfChecked = false;
                this.allChecked = true;
                this.shoppingCatSettlementFooterBtn = true;
              }
            } else {
              this.halfChecked = false;
              this.allChecked = false;
              this.shoppingCatSettlementFooterBtn = false;
              this.allCheckedBool = false;
            }
            this.shoppingCheckBox = false;
          }
          // 当商品长度减少是，页脚页随之变化
          if (val.length <= 4) {
            this.shoppingCatFooterClass = "shoppingCatFooter";
          }
          if (val.length > 2) {
            if (this.shoppingCatFooterClass === "shoppingCatFooter") {
              this.shoppingCatFooterTop = (val.length + 1) * 125;
            }
          } else {
            this.shoppingCatFooterTop = 439;
          }
        },
        deep: true
      }
    },
    created() {
      this.shoppingCatFooterTop = (this.shop.length + 1) * 125;
    }
  }
</script>

<style scoped>
  .cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    opacity: 0.6;
    z-index: 11;
  }

  .shoppingView {
    position: fixed;
    left: 1400px;
    top: 100px;
    z-index: 12;
    width: 900px;
    height: 500px;
    background: #ffffff;
    box-shadow: 0px 0px 50px #a5a0a0;
    display: flex;
    overflow: auto;
    border-radius: 10px;
  }

  .shoppingViewAn {
    animation: shoppingViewAn 0.5s;
    animation-fill-mode: forwards;
  }

  @keyframes shoppingViewAn {
    to {
      left: 250px
    }
  }

  .shoppingCloseBtn {
    position: fixed;
    top: 73px;
    right: 126px;
    padding: 0;
    animation: shoppingCloseBtnAn 2s;
    animation-fill-mode: forwards;
    opacity: 0;
  }

  @keyframes shoppingCloseBtnAn {
    to {
      opacity: 1
    }
  }

  .shoppingViewCloseAn {
    left: 250px;
    animation: shoppingViewCloseAn 0.5s;
    animation-fill-mode: forwards;
  }

  @keyframes shoppingViewCloseAn {
    to {
      left: 1400px
    }
  }

  .myShoppingCat {
    position: absolute;
    margin-left: 400px;
  }

  .goodsContent {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
  }

  .goodsName {
    margin-left: 30px;
  }

  .elIconCloseBtn {
    font-size: 15px;
    cursor: pointer;
    width: 22px;
    border-radius: 50%;
    position: relative;
    left: 37px;
  }

  .elIconCloseBtn:hover {
    color: white;
    background: rgb(0, 195, 245);
    transition: background 1s;
  }

  ::-webkit-scrollbar {
    width: 13px;
    height: 13px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: pink;
    background-clip: padding-box;
    border: 3px solid transparent;
    border-radius: 7px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  .shoppingCatFooter {
    position: relative;
    width: 98%;
    height: 60px;
    border-top: 1px solid #EBEEF5;
  }

  .shoppingCatFooterFixed {
    position: fixed;
    left: 250px;
    right: 0;
    height: 60px;
    width: 885px;
    background-color: #fff;
    z-index: 13;
    filter: drop-shadow(0px -4px 4px #a5a0a0);
    border-bottom-left-radius: 10px;
  }

  .shoppingCheckBoxFooter {
    position: relative;
    top: 18px;
    left: 10px;
  }

  .shoppingCloseBtnFooter {
    position: absolute;
    left: 75px;
    top: 10.5px;
    color: #888;
  }

  .shoppingNumberFooter {
    position: absolute;
    left: 160px;
    top: 19.6px;
    font-size: 14px;
    color: #888;
  }

  .shoppingPriceSumFooter {
    position: relative;
    bottom: 6px;
    font-size: 14px;
    color: #888;
    float: right;
  }

  .shoppingPriceSumFooter > .span {
    font-size: 1.3rem;
    font-weight: 600;
    color: rgb(224, 43, 65);
    position: relative;
    top: 2px;
    left: -9px;
  }

  .shoppingCatSettlementFooter {
    position: relative;
    bottom: 5px;
    color: #888;
    float: right;
    right: 25px;
    margin-left: 40px;
  }
</style>

<style>
  .shoppingView .el-table tr td {
    height: 125px;
  }

  .shoppingView .el-button--text, .el-checkbox {
    color: #888;
  }

  .goodsContent .el-button--text {
    color: rgb(46, 144, 214);
  }

  .shoppingView .shoppingCloseBtnFooter > button:hover {
    color: rgb(46, 144, 214);
  }
</style>
