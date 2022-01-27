<template>
  <div id="headers">
    <h4>代理系统</h4>
    <span class="user">
      {{username}}
      <i @click="closeLogin">退出</i>
      <ul>
        <li @click="rAddress">地址薄</li>
      </ul>
      我的欠款：{{debt}}
    </span>
  </div>
</template>

<script>
  export default {
    computed: {
      username() {
        return this.$store.state.userInfo.username;
      },
      debt(){
        return this.$store.state.userInfo.debt;
      }
    },
    methods: {
      closeLogin() {
        this.$store.commit("changeLoginState", false);
        localStorage.clear();
      },
      rAddress(){
        this.$router.push('address');
      }
    }
  };
</script>

<style lang="less">
  #headers {
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-bottom: 2px solid #0068b7;
    box-sizing: border-box;
    position: relative;
    .user ul{
      display: none;
      list-style:none;
      border:1px solid #ccc;
      width:200px;
      position: absolute;
      right:0;
      background:#fff;
      top:30px;
      li{
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        &:hover{
          background: #2ecc71;
          color:#fff;
        }
      }
    }
    .user:hover ul {
      display: block;
    }
    h4 {
      color: #2f4b76;
      text-align: left;
      font-size: 28px;
      margin-left: 40px;
      line-height: 60px;
    }

    span {
      position: absolute;
      right: 40px;
      top: 0;
      bottom: 0;
      margin:20px auto 0 auto;
      i {
        font-style: normal;
        margin-left: 10px;
        cursor: pointer;

        &:hover {
          color: #999;
        }
      }
    }
  }
</style>