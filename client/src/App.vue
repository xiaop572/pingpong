<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>
<script>
import Layout from './components/Layout'
export default {
  components:{
    Layout
  }
};
</script>
<style lang="less">
*{
  padding: 0;
  margin: 0;
}
html,body{
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
