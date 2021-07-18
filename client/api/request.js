import axios from 'axios';
import Vue from 'vue';
let v = new Vue();
import store from '../src/store/index'
let request = axios.create({})
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = localStorage.getItem("token");
  config.headers.token = token;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
request.interceptors.response.use(function (config) {
  if (config.config.url !== "/api/user/getUserInfo" && config.data.code === 450) {
    console.log(config);
    localStorage.clear();
    v.$message({
      message: config.data.msg,
      type: "error"
    });
    store.commit("changUserInfo", {});
    store.commit('changeLoginState', false)
  }
  return config;
})
export default request;