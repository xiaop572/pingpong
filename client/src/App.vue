<template>
  <div id="app">
    <Layout v-if="loginState"></Layout>
    <Login v-else></Login>
    <button @click="changToken">点击</button>
  </div>
</template>
<script>
  import Layout from './components/Layout';
  import Login from './views/Login';
  import req from '../api/request.js'
  export default {
    data() {
      return {
        loginState: false
      }
    },
    components: {
      Layout,
      Login
    },
    methods: {
      changToken() {
        req.post('/api/user/login',{
          username:"admin",
          password:'123456'
        }).then(res=>{
          if(res.data.code===200){
            localStorage.setItem('token',res.data.data.token);
            this.loginState=true;
          }
        })
      }
    },
    mounted() {
      req.post('/api/user/getUserInfo').then(res=>{
        console.log(res);
      })
    },
  };
</script>
<style lang="less">
  * {
    padding: 0;
    margin: 0;
  }

  html,
  body {
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