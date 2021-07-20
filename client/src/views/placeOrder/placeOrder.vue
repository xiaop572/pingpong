<template>
  <div class="placeOrderBox">
    <el-page-header :content="$route.meta.name"></el-page-header>
    <div class="elForm">
      <el-input v-model="input" placeholder="请输入名称或者编码" class="el-input"></el-input>
      <div>
        <div class="proBlock">
          <el-form>
            <h4>狂3</h4>
            <span>¥70</span>
            <el-form-item label="数量">
              <el-input placeholder="数量" size="mini" v-model="text"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input placeholder="备注" size="mini" v-model="text2"></el-input>
            </el-form-item>
            <div class="kongzhi">
              <el-button type="primary" size="mini">添加</el-button>
            </div>
          </el-form>
        </div>
        <div class="proBlock">
          <el-form>
            <h4>省狂3</h4>
            <span>¥150</span>
            <el-form-item label="数量">
              <el-input placeholder="数量" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input placeholder="备注" size="mini"></el-input>
            </el-form-item>
            <div class="kongzhi">
              <el-button type="primary" size="mini">添加</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div class="elForm">
      <h2>已选物品列表</h2>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="name" label="物品名"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="guige" label="规格"></el-table-column>
      </el-table>
      <div>
        <h4>服务:</h4>
        <el-checkbox-group v-model="checkList" class="group">
          <el-checkbox label="粘拍"></el-checkbox>
          <el-checkbox label="护边"></el-checkbox>
          <el-checkbox label="护膜"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="address">
          <h4>收件人信息</h4>
        <el-input v-model="text3" placeholder="姓名" class="el-input"></el-input>
        <el-input v-model="text3" placeholder="手机号" class="el-input"></el-input>
        <el-input v-model="address" placeholder="地址" class="el-input"></el-input>
        <p>浙江省温州市瓯海区温州大学</p>
      </div>
      <el-button type="primary">下单</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "",
      text2: "",
      text3: "",
      input: "",
      address: "温州大学",
      tableData: [
        {
          name: "龙五",
          price: 650,
          guige: "横"
        }
      ],
      checkList: []
    };
  }
};
</script>
<style lang="less">
.placeOrderBox {
  .elForm {
    width: 600px;
    padding: 50px;
    text-align: left;
    float: left;
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
      .el-input{
          margin:10px 0;
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