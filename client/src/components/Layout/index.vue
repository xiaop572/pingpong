<template>
  <div id="layout">
    <headers></headers>
    <menus></menus>
    <div id="main">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import headers from '../header/'
import menus from '../menu/'
export default {
    components:{
        headers,
        menus
    }
};
</script>

<style>
#layout{
    height: 100%;
}
#main{
    width: calc(100% - 200px);
    height: calc(100% - 80px);
    float: left;
    overflow-y: auto;
}
</style>