<template>
  <div class="placeOrderBox">
    <el-page-header :content="$route.meta.name"></el-page-header>
    <div class="elForm">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="发件人">
          <el-input v-model="form.name" placeholder="一键填充"></el-input>
        </el-form-item>
        <el-form-item label="收件人">
          <el-input v-model="keyfillValue" placeholder="一键填充" @input="keyFill"></el-input>
        </el-form-item>
        <div class="addresser">

        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import req from "../../../api/request";
  export default {
    data() {
      return {
        keyfillValue:"",
        form: {

        },
        timer:null
      };
    },
    methods:{
      keyFill(){
        clearTimeout(this.timer);
        this.timer=setTimeout(() => {
            req.post('/api/placeOrder/explainAddress',{
              keyfillValue:this.keyfillValue
            })
        }, 1000);
      }
    }
  };
</script>
<style lang="less">
  .placeOrderBox {
    .elForm {
      width: 1000px;
      padding: 50px;
      text-align: left;
      float: left;
      .el-form-item{
        margin-bottom: 15px !important;
      }
      .addresser{
        border:1px solid #eee;
        margin-left: 30px;
        height: 200px;
      }
      h4 {
        margin: 10px 0;
      }

      h2 {
        margin: 10px 0;
      }

      .el-form-item {
        margin-bottom: 0;
      }

      .address {
        margin: 20px 0;

        .el-input {
          margin: 10px 0;
        }

        p {
          line-height: 40px;
        }
      }

      .el-input {
        width: 400px;
      }

      .proBlock {
        background: #eee;
        width: 200px;
        padding: 20px;
        line-height: 30px;
        margin: 20px 0;
        float: left;
        margin-right: 20px;

        .el-input {
          width: 160px;
        }

        .el-tag {
          margin-right: 10px;
        }

        .kongzhi {
          margin: 10px 0;
        }
      }
    }
  }
</style>