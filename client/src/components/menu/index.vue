<template>
  <div id="menu">
    <el-menu
      :default-active="defaultPath"
      router
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#4c5e79"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item index="/">
        <i class="el-icon-setting"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">用户列表</el-menu-item>
          <el-menu-item index="1-2">添加用户</el-menu-item>
          <el-menu-item index="/powerMan">权限管理</el-menu-item>
          <el-menu-item index="/roleMenu">角色菜单管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/menuList">
        <i class="el-icon-setting"></i>
        <span slot="title">菜单管理</span>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>产品分类管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/ClassifyList">分类列表</el-menu-item>
          <el-menu-item index="/addClassify">添加分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>产品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/ClassifyList">产品列表</el-menu-item>
          <el-menu-item index="/addProduct">添加产品</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data(){
    return{
      defaultPath:"/"
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted(){
    this.defaultPath=this.$route.fullPath;
  }
};
</script>

<style lang="less">
#menu {
  width: 200px;
  height: calc(100% - 60px);
  position: relative;
  background-color: #4c5e79;
  overflow: hidden;
  float: left;
  h4 {
    text-align: center;
    height: 60px;
    line-height: 60px;
  }
  .el-menu {
    border: none;
    height: 100%;
    text-align: left;
  }
  .el-menu-item.is-active {
    background-color: #2ecc71 !important;
  }
}
</style>