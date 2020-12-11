<template>
  <div id="mine_page">

    <div id="User_Header">
      <el-row>
        <!--        个人中心logo-->
        <el-col :span="2" :offset="4" style="margin-top: 35px">
          <label style="font-size: 24px">哥谭市</label>
        </el-col><!--          标题logo结束-->

        <el-col :span="2" style="margin-top: 35px">
          <span style="user-select: none;font-size: 24px;color: #CC9756">个人中心</span>
        </el-col>
      </el-row>
    </div>

    <!--个人中心主身体-->
    <div class="Mine_main" style="margin-top: 20px">
      <!--      左侧菜单栏-->
      <div id="User_leftMain">
        <el-col :span="2" :offset="4">
          <!--          左侧菜单栏主体-->
          <div style="border: 1px solid #eaeaea;height: 842px">


            <div class="hd_sideText">账号管理</div>
            <div>
              <ul class="bd">
                <li>
                  <router-link to="/mineCenter" style="" id="minecenter_a">个人中心</router-link>
                </li>
                <li>
                  <!--                  accountInfo-->
                  <router-link to="/accountInfo">账号信息</router-link>
                </li>
                <li>
                  <a href="#">账号安全</a>
                </li>
                <li>
                  <router-link to="/addressManagement">地址管理</router-link>
                </li>
              </ul>
            </div>

            <div class="hd_sideText">交易管理</div>
            <div>
              <ul class="bd">
                <li>
                  <a href="#">订单管理</a>
                </li>
              </ul>
            </div>

            <div class="hd_sideText">服务中心</div>
            <div>
              <ul class="bd">
                <li>
                  <a href="#">成为商户</a>
                </li>
                <li>
                  <a href="#">客服</a>
                </li>
              </ul>
            </div>
          </div>

        </el-col>
      </div><!--左侧菜单栏结束-->

      <!--      中间主体-->
      <el-row>
        <el-col :span="14" style="margin-left: 20px">
          <router-view>


          </router-view>
        </el-col>
      </el-row>


    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserCenter',
    data() {
      return {
        data: {}
      }
    },
    methods: {

    }
  }

  //  左侧菜单a标签点击事件

  //   #CC9756   border-left-color: #BEA988;

</script>

<style>
  /*消除html的内边距和外边距*/
  * {
    padding: 0; /*清除内边距*/

    margin: 0; /*清除外边距*/

  }

  /*消除无序列表的标识符*/
  li {

    list-style-type: none;

  }

  /*头部栏*/
  #User_Header {
    width: 100%;
    height: 100px;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .1);
    border-left-color: #BEA988;
  }


  /*  左侧菜单栏标题*/
  .hd_sideText {
    padding-left: 43px;
    /*font-size: 18px;*/
    color: #333;
    font-weight: 700;
    margin-bottom: 10px;
    margin-top: 37px;

  }

  /*  左侧菜单栏子菜单*/
  .bd {
    list-style-type: none;
    font-size: 14px;
    padding-left: 43px;
    margin-bottom: 40px;
    line-height: 40px;

    position: relative;z-index: 1;

  }
  /*设置点击的菜单属性*/
  selectS{
    color: red;
  }




  /*  a标签事件*/

  a {
    color: #666;
    text-decoration: none;
  }

  /*正常的未被访问过的链接*/
  a:link {
    color: #666;
    text-decoration: none;
  }

  /*已经访问过的链接*/
  a:visited {
    color: #666;
    text-decoration: none;
  }

  /*鼠标划过(停留)的链接*/
  a:hover {
    color: #CC9756;
    text-decoration: none;
  }

  /* 正在点击的链接，鼠标在元素上按下还没有松开*/
  a:active {
    color: #CC9756;
    text-decoration: none;

  }

  /* 获得焦点的时候 鼠标松开时显示的颜色*/
  a:focus {
    color: #666;
    text-decoration: none;

  }
</style>
