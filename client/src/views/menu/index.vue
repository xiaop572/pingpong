<template>
  <div class="menuListBox">
    <el-page-header :content="$route.meta.name"></el-page-header>
  </div>
</template>

<script>
import req from "../../../api/request.js";
export default {
  mounted() {
      req.post('/api/menu/getMenuList').then(res=>{
        console.log(res)
      })
  }
};
</script>

<style>
</style>