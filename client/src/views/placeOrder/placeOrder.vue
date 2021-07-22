<template>
  <div class="placeOrderBox">
    <el-page-header :content="$route.meta.name"></el-page-header>
    <div class="elForm">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="发件人">
          <el-input v-model="sendKeyFillValue" placeholder="一键填充" @input="senKeyFill"></el-input>
        </el-form-item>
        <el-form-item label="收件人">
          <el-input v-model="keyfillValue" placeholder="一键填充" @input="keyFill"></el-input>
        </el-form-item>
        <div class="addresser">
          <div class="Receive">
            <span>发货人:</span>
            <el-input v-model="sendName" placeholder="姓名" class="name"></el-input>
            <el-input v-model="sendPhone" placeholder="电话" class="phone"></el-input>
            <el-input v-model="sendAddress" placeholder="地址" class="address"></el-input>
          </div>
          <div class="Receive">
            <span>收件人:</span>
            <el-input v-model="receName" placeholder="姓名" class="name"></el-input>
            <el-input v-model="recePhone" placeholder="电话" class="phone"></el-input>
            <el-input v-model="receAddress" placeholder="地址" class="address"></el-input>
          </div>
        </div>
        <el-input type="textarea" placeholder="暂存框" v-model="textarea" class="textarea"></el-input>
        <div class="proList">
          <el-table :data="tableData" border>
            <el-table-column label="产品名称" width="260">
              <template slot-scope="scope">
                <el-autocomplete class="inline-input" v-model="scope.row.name" :fetch-suggestions="querySearch"
                  placeholder="请输入内容" :trigger-on-focus="false" value-key="name" @select="handleSelect"
                  @focus="focusinput(scope.row)"></el-autocomplete>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
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
        sendKeyFillValue: "",
        keyfillValue: "",
        form: {

        },
        targetObj: {},
        tableData: [{
          id: "11"
        }, {}, {}],
        textarea: "",
        timer: null,
        timer1: null,
        sendName: "",
        sendPhone: "",
        sendAddress: "",
        receName: "",
        recePhone: "",
        receAddress: "",
        restaurants: [], //产品列表
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      senKeyFill() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          req.post('/api/placeOrder/explainAddress', {
            keyfillValue: this.sendKeyFillValue
          }).then(res => {
            if (res.data.code == 200) {
              let data = res.data.data[0];
              this.sendName = data.name;
              this.sendPhone = data.mobile;
              this.sendAddress = data.province_name + data.city_name + data.county_name + data.detail;
            }
          })
        }, 1000);
      },
      focusinput(row) {
        this.targetObj = row;
      },
      keyFill() {
        clearTimeout(this.timer1);
        this.timer1 = setTimeout(() => {
          req.post('/api/placeOrder/explainAddress', {
            keyfillValue: this.keyfillValue
          }).then(res => {
            if (res.data.code == 200) {
              let data = res.data.data[0];
              this.receName = data.name;
              this.recePhone = data.mobile;
              this.receAddress = data.province_name + data.city_name + data.county_name + data.detail;
            }
          })
        }, 1000);
      },
      getProductList() {
        req.post('/api/product/getProductNameList').then(res => {
          if (res.data.success) {
            this.restaurants = res.data.data
          }
        })
      },
      handleSelect(item) {
        this.targetObj.id = item.id;
      }
    },
    mounted() {
      this.getProductList()
    },
  };
</script>
<style lang="less">
  .placeOrderBox {
    .elForm {
      width: 1000px;
      padding: 50px;
      text-align: left;
      float: left;

      .el-table {
        width: 970px;
        margin-top: 40px;
        margin-left: 30px;
      }

      .el-form-item {
        margin-bottom: 15px !important;
      }

      .textarea {
        height: 160px;
        margin-left: 30px;
        margin-top: 30px;
        width: 970px;

        textarea {
          height: 100%;
        }
      }

      .addresser {
        border: 1px solid #eee;
        margin-left: 30px;
        height: 110px;
        padding: 20px 0;

        .Receive {
          margin: 10px 20px;

          .name {
            width: 120px;
            margin: 0 10px;
          }

          .phone {
            width: 140px;
            margin: 0 10px;
          }

          .address {
            width: 400px;
            margin: 0 10px;
          }
        }
      }
      .proList{
        .inline-input{
            width: 100%;
        }
      }
    }
  }
</style>