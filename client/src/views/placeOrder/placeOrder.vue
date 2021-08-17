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
            <el-table-column label="产品价格" width="110">
              <template slot-scope="scope">
                {{scope.row.price}}
              </template>
            </el-table-column>
            <el-table-column label="产品数量" width="110">
              <template slot-scope="scope">
                <el-input v-model="scope.row.number" placeholder="默认为1" style="width: 80px;"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" placeholder="备注"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot="header" slot-scope="scope">
                <el-button type="primary" @click="addRow">添加行</el-button>
              </template>
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="delRow(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="remarkBox">
            <h4>备注:</h4>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="粘拍"></el-checkbox>
              <el-checkbox label="护边"></el-checkbox>
              <el-checkbox label="护膜"></el-checkbox>
            </el-checkbox-group>
          </div>
          <el-button type="primary" class="placeBtn" @click="placeSub">下单</el-button>
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
        checkList: [],
        targetObj: {},
        tableData: [{}, {}, {}, {}],
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
        this.$set(this.targetObj, 'id', item.id)
        this.$set(this.targetObj, 'price', item.price)
      },
      //添加行
      addRow() {
        this.tableData.push({})
      },
      //删除行数据
      delRow(row) {
        console.log(this.tableData);
        this.tableData.forEach((item, index) => {
          if (item === row) {
            this.tableData.splice(index, 1);
          }
        })
      },
      placeSub() {
        if (!this.sendName || !this.sendPhone || !this.sendAddress) {
          this.$message({
            message: "请输入发件人信息",
            type: "error"
          });
          return;
        } else if (!this.receName || !this.recePhone || !this.receAddress) {
          this.$message({
            message: "请输入收件人信息",
            type: "error"
          });
          return;
        }
        let state = false;
        this.tableData.forEach(item => {
          if (item.id) {
            state = true;
          }
        })
        if (!state) {
          this.$message({
            message: "请添加产品",
            type: "error"
          });
          return;
        }
        req.post('/api/placeOrder/createOrder', {
          sender: this.sendName + " " + this.sendPhone + " " + this.sendAddress,
          receName: this.receName,
          recePhone: this.recePhone,
          receAddress: this.receAddress,
          remark: this.checkList,
          productList: this.tableData
        }).then(res => {
          if (res.data.success) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.sendKeyFillValue="";
            this.keyfillValue="";
            this.sendName="";
            this.sendPhone="";
            this.sendAddress="";
            this.receName="";
            this.recePhone="";
            this.receAddress="";
            this.checkList=[];
            this.tableData=[{}, {}, {}, {}];
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
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

      .placeBtn {
        margin: 50px 30px;
        width: 100px;
      }

      .remarkBox {
        margin-left: 30px;

        h4 {
          margin: 20px 0;
        }
      }

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

      .proList {
        .inline-input {
          width: 100%;
        }
      }
    }
  }
</style>