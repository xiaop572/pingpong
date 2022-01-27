<template>
  <div class="proListBox">
    <el-page-header :content="$route.meta.name" @back="$router.push({path:'/'})"></el-page-header>
    <div class="fujia">
      <el-button size="mini" type="primary">监听订单</el-button>
    </div>
    <div class="proListTable">
      <el-table :data="proData" style="width: 100%" border>
        <el-table-column prop="order" label="订单号"></el-table-column>
        <el-table-column prop="sender" label="发件人"></el-table-column>
        <el-table-column prop="receName" label="收件人姓名"></el-table-column>
        <el-table-column prop="recePhone" label="收件人电话"></el-table-column>
        <el-table-column prop="receAddress" label="收件人地址"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="name" label="订单状态">
          <template slot-scope="scope">
            <span v-if="scope.row.orderState==1">待发货</span>
            <span v-if="scope.row.orderState==2">已发货</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="ship(scope.row)"
              type="primary"
              v-if="scope.row.orderState==1"
            >发货</el-button>
            <el-button
              size="mini"
              @click="ship(scope.row)"
              type="primary"
              v-if="scope.row.orderState==2"
            >重打</el-button>
            <el-button
              size="mini"
              @click="read(scope.row)"
              type="primary"
              v-if="scope.row.readState==='0'"
            >待处理</el-button>
            <el-button size="mini" @click="lookOrderPro(scope.row)" type="success">查看订单物品</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="物品清单" :visible.sync="lookProList">
        <el-table :data="proListingData" border>
          <el-table-column property="order" label="订单号"></el-table-column>
          <el-table-column property="name" label="产品名称"></el-table-column>
          <el-table-column property="number" label="数量"></el-table-column>
          <el-table-column property="remark" label="备注"></el-table-column>
        </el-table>
      </el-dialog>
      <div class="pageBox">
        <el-pagination
          background
          layout="total,sizes,prev, pager, next,jumper"
          :page-size="pageSize"
          :page-count="pageCount"
          :total="total"
          @current-change="changePage"
          @size-change="changeSize"
        ></el-pagination>
      </div>
    </div>
    <el-dialog title="快递单号" :visible.sync="lookImg">
      <img :src="imgSrc" alt id="danImg" style="width:350px" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="lookImg = false">取 消</el-button>
        <el-button type="primary" v-print="'#danImg'" @click="lookImg = false">打 印</el-button>
      </div>
    </el-dialog>
    <audio src="../../assets/tishi.wav" ref="audio"></audio>
  </div>
</template>

<script>
import req from "../../../api/request";
export default {
  data() {
    return {
      lookImg: false,
      proData: [],
      total: 0,
      currentPage: 1,
      pageCount: 1,
      pageSize: 10,
      lookProList: false,
      lookProData: {},
      proListingData: [],
      socket: null,
      content: {},
      num: [],
      defaultPrinter: undefined,
      imgSrc: ""
    };
  },
  mounted() {
    this.getPro();
    // this.webSocket();
  },
  methods: {
    getPro() {
      req
        .post("/api/placeOrder/getOrderListSearch", {
          page: this.currentPage,
          size: this.pageSize,
          orderState: 1
        })
        .then(res => {
          this.proData = res.data.data.data; //产品数据
          this.total = res.data.data.total; //总条数
        });
    },
    read(row) {
      req.post("/api/placeOrder/readOrder", row).then(res => {
        this.getPro()
      });
    },
    changePage(page) {
      this.currentPage = page;
      this.getPro();
    },
    changeSize(size) {
      this.currentPage = 1;
      this.pageSize = size;
      this.getPro();
    },
    ship(row) {
      this.getOdd(row);
      // this.$confirm("是否生成电子单号?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.getOdd(row);
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消删除"
      //     });
      //   });
    },
    getOdd(row) {
      console.log(row);
      req
        .post("/api/logistics/getOdd", {
          order: row.order,
          sender: row.sender,
          receName: row.receName,
          recePhone: row.recePhone,
          receAddress: row.receAddress,
          remark: row.remark
        })
        .then(res => {
          if (res.data.code === 200) {
            let base64 = JSON.parse(res.data.data.OrderImg)[0];
            this.imgSrc = "data:image/jpeg;base64," + base64;
            this.lookImg = true;
            this.getPro();
            // this.initData(row, res); //初始化数据
            // this.doPrint(this.defaultPrinter,this.num)
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        });
    },
    initData(row, res) {
      this.num = [
        {
          waybillCode: res.data.data.kuaidinum,
          printData: {
            data: "",
            templateURL:
              "http://cloudprint.cainiao.com/template/standard/101/123"
          },
          objectId: "1"
        }
      ];
      let senderArr = row.sender.split(" ");
      this.content = {
        data: {
          _dataFrom: "waybill",
          cpCode: "YUANTONG",
          needEncrypt: false,
          parent: false,
          recipient: {
            address: {
              city: "",
              detail: row.receAddress,
              district: "",
              province: ""
            },
            mobile: "",
            name: row.receName,
            phone: row.recePhone
          },
          sender: {
            address: {
              city: "",
              detail: senderArr[2],
              district: "",
              province: ""
            },
            mobile: senderArr[1],
            name: senderArr[0],
            phone: senderArr[1]
          },
          shippingOption: {
            code: "STANDARD_EXPRESS",
            title: "标准快递"
          },
          waybillCode: res.data.data.kuaidinum
        },
        signature: "MD:C1b9cw46jbUP6/O2rl77Vg==",
        templateURL: "http://cloudprint.cainiao.com/template/standard/401/177"
      };
    },
    recomPro(row) {
      this.$router.push({
        name: "recomPro",
        params: row
      });
    },
    delPro(row) {
      this.$confirm("是否删除该产品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          req
            .post("/api/product/delPro", {
              id: row.id
            })
            .then(res => {
              if (res.data.success) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getPro();
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    lookOrderPro(row) {
      req
        .post("/api/placeOrder/getOrderPro", {
          order: row.order
        })
        .then(res => {
          this.proListingData = res.data.data;
          this.lookProList = true;
        });
    },
    webSocket() {
      this.socket = new WebSocket("ws://localhost:13528");
      //连接成功
      this.socket.addEventListener("open", event => {
        this.$message({
          showClose: true,
          message: "成功连接到打印组件",
          type: "success"
        });
        this.socket.onmessage = function(event) {};
        this.socket.addEventListener("close", event => {
          this.$message({
            showClose: true,
            message: "打印组件已关闭",
            type: "error"
          });
          this.newConnect();
        });
      });
      //连接失败
      this.socket.addEventListener("error", event => {
        this.$message({
          showClose: true,
          message: "无法连接到打印组件，请确保打印组件已打开",
          type: "error"
        });
        this.newConnect();
      });
    },
    newConnect() {
      setTimeout(() => {
        this.$message({
          showClose: true,
          message: "正在尝试重连",
          type: "info"
        });
        this.webSocket();
      }, 2000);
    },
    getUUID(len, radix) {
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
        ""
      );
      var uuid = [],
        i;
      radix = radix || chars.length;
      if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
      } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | (Math.random() * 16);
            uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
          }
        }
      }
      return uuid.join("");
    },
    getRequestObject(cmd) {
      var request = new Object();
      request.requestID = this.getUUID(8, 16);
      request.version = "1.0";
      request.cmd = cmd;
      return request;
    },
    getCustomAreaData(waybillNO) {
      //获取waybill对应的自定义区的JSON object，此处的ajaxGet函数是伪代码
      //var jsonObject = {jiade:1234}//ajaxGet(waybillNO);
      var ret = new Object();
      ret.templateURL = this.content.templateURL;
      ret.data = this.content.data;
      return ret;
    },
    getWaybillJson(waybillNO) {
      //获取waybill对应的json object，此处的ajaxGet函数是伪代码
      var jsonObject = { jiade: waybillNO }; // ajaxGet(waybillNO);
      return jsonObject;
    },
    getPrintList() {
      var request = getRequestObject("getPrinters");
      if (this.socket.readyState === 1) {
        console.log(request);
        this.socket.send(JSON.stringify(request));
      }
    },
    getPrintInPop() {
      var request = getRequestObject("printerConfig");

      if (this.socket.readyState === 1) {
        console.log(request);
        this.socket.send(JSON.stringify(request));
      }
    },
    doPrint(printer, waybillArray) {
      var request = this.getRequestObject("print");
      request.task = new Object();
      request.task.taskID = this.getUUID(8, 10);
      request.task.preview = false;
      request.task.printer = printer;
      var documents = new Array();
      for (let i = 0; i < waybillArray.length; i++) {
        var doc = new Object();
        doc.documentID = waybillArray[i];
        var content = new Array();
        var waybillJson = this.getWaybillJson(waybillArray[i]);
        var customAreaData = this.getCustomAreaData(waybillArray[i]);
        content.push(waybillJson, customAreaData);
        doc.contents = content;
        documents.push(doc);
      }
      request.task.documents = documents;
      this.socket.send(JSON.stringify(request));
    }
  }
};
</script>

<style lang="less">
.proListBox {
  .proListTable {
    padding: 50px 0;
  }

  .pageBox {
    padding: 50px 0;
  }
  .fujia {
    padding: 30px 0;
    text-align: left;
  }
}
</style>