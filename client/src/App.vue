<template>
  <div id="app">
    <Layout v-if="loginState"></Layout>
    <Login v-else></Login>
  </div>
</template>
<script>
  import Layout from './components/Layout';
  import Login from './views/Login';
  import req from '../api/request.js'
  export default {
    data() {
      return {
      }
    },
    components: {
      Layout,
      Login
    },
    methods: {
    },
    mounted() {
      req.post('/api/user/getUserInfo').then(res=>{
        if(res.data.code===200){
          this.$store.commit("changUserInfo", res.data.data.userInfo);
          this.$store.commit('changeLoginState',true)
        }
      })
    },
    computed:{
        loginState(){
          return this.$store.state.loginState
        }
    }
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