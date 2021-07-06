<template>
  <div id="headers">
    <h4>代理系统</h4>
    <span>
      {{username}}
      <i @click="closeLogin">退出</i>
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.state.userInfo.username;
    }
  },
  methods: {
    closeLogin() {
      this.$store.commit("changeLoginState", false);
      localStorage.clear();
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
    margin: auto;
    line-height: 60px;
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