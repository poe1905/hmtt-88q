<template>
<el-container >
  <el-aside  style="width:200px">
    <div class="vvue " >
      <img src="../../assets/images/logo_admin.png" alt="">
    </div>
    <el-menu class="log-menu" style="width:201px"  background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b" router>
       <el-menu-item index="/login"> 首页</el-menu-item >
        <el-submenu  index="2">
          <template slot="title">内容整理</template>
          <el-menu-item index="/article">发布内容</el-menu-item>
          <el-menu-item index="/publish">内容列表</el-menu-item>
          <el-menu-item >评论列表</el-menu-item>
          <el-menu-item >素材管理</el-menu-item>
       </el-submenu>
        <el-submenu index="3" >
          <template slot="title">粉丝管理</template>
          <el-menu-item >图文数据</el-menu-item>
          <el-menu-item >粉丝管理</el-menu-item>
          <el-menu-item >粉丝管理</el-menu-item>
          <el-menu-item >粉丝列表</el-menu-item>
       </el-submenu>
       <el-menu-item > 账户列表</el-menu-item >
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>
      <!-- 顶部内容中的区域 -->

      <about></about>
    </el-header>
    <el-main>
      <!-- 底部的二级路由区域 -->
      <router-view />
      </el-main>
  </el-container>
</el-container>
</template>

<script>

import about from './toop.vue'
export default {
  data () {
    return {
      msg: '四川成都'
    }
  },
  components: {
    about
  }

}
</script>

<style>
.olist {
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
}
.vvue{
  background-color: #353b4e;
  text-align: center;
  padding: 15px 0;
}
.log-menu{
  /* width:230px ; */
  height: 100vh;
  overflow: hidden;
}

</style>
