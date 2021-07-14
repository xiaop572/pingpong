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
      <template v-for="item in menus">
        <template v-if="item.children">
          <el-submenu :key="item.id" :index="String(item.id)">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="it in item.children" :index="it.path" :key="it.id">{{it.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.id">
            <i class="el-icon-setting"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import req from "../../../api/request";
export default {
  data() {
    return {
      defaultPath: "/",
      menus: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getMenu() {
      req.post("/api/menu/getMenu").then(res => {
        if (res.data.success) {
          this.menus = res.data.data;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.defaultPath = this.$route.fullPath;
    }
  },
  mounted() {
    this.getMenu();
    this.defaultPath = this.$route.fullPath;
  }
};
</script>

<style lang="less">
#menu {
  width: 200px;
  height: calc(100% - 60px);
  position: relative;
  background-color: #4c5e79;
  overflow-y: auto;
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