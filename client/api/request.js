import axios from 'axios';
let request=axios.create({
})
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token=localStorage.getItem("token");
    config.headers.token=token;
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
export default request;