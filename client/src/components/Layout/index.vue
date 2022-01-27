<template>
  <div id="layout">
    <audio src="../../assets/tishi.wav" ref="audio"></audio>
    <headers></headers>
    <menus></menus>
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import headers from "../header/";
import menus from "../menu/";
import req from "../../../api/request";
export default {
  components: {
    headers,
    menus
  },
  data() {
    return {
      timer: null
    };
  },
  methods: {
    getPro() {
      req
        .post("/api/placeOrder/getOrderListSearch", {
          page: 1,
          size: 30,
          orderState: 1
        })
        .then(res => {
          this.getNewOrder(res.data.data.data);
        });
    },
    getNewOrder(data) {
      if (data.length <= 0) {
        return;
      }
      data.forEach(item => {
        if (item.readState === "0") {
          this.$refs.audio.play();
        }
      });
    }
  },
  mounted() {
    if (this.$store.state.userInfo.level === "0") {
      this.timer = setInterval(() => {
        this.getPro();
      }, 10000);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style>
#layout {
  height: 100%;
}
#main {
  width: calc(100% - 200px);
  height: calc(100% - 80px);
  float: left;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 20px;
}
</style>