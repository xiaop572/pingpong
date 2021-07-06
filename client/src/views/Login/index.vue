<template>
  <div id="login">
    <div class="loginBox">
      <h4>系统</h4>
      <el-form ref="form" :model="form" class="loginForm">
        <el-input v-model="form.username" placeholder="用户名"></el-input>
        <el-input
          v-model="form.password"
          placeholder="密码"
          type="password"
          @keydown.enter.native="onSubmit"
        ></el-input>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import req from "../../../api/request.js";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      req.post("/api/user/login", this.form).then(res => {
        if (res.data.code === 200) {
          localStorage.setItem("token", res.data.data.token);
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.$store.commit("changUserInfo", res.data.data.userInfo);
          this.$store.commit("changeLoginState", true);
        } else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
#login {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #1e87c1, #004f90);
  .loginForm {
    width: 90%;
    margin: 40px auto 0 auto;
    .el-input {
      margin: 0 auto 30px auto;
    }
    .el-button {
      margin: 20px 0 0 0;
      width: 90%;
    }
  }
}
.loginBox {
  width: 360px;
  height: 400px;
  box-shadow: 0 0 0px 10px rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 1);
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  h4 {
    line-height: 60px;
    font-size: 30px;
    margin-top: 40px;
    color: #666;
  }
}
</style>