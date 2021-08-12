<template>
  <div class="home"><img :src="imgSrc" alt=""></div>
</template>

<script>
// @ is an alias to /src
import req from "../../api/request";
export default {
  name: "Home",
  data(){
    return{
      imgSrc:""
    }
  },
  mounted() {
  }
};
</script>
