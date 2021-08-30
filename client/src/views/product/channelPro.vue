<template>
  <div class="channelProBox">
    <el-page-header :content="$route.meta.name" @back="$router.push({path:'/'})"></el-page-header>
    <div class="header">
      <a href="模板.xlsx" download="模板.xlsx">导入模板</a>
    </div>
    <el-form label-position="left" label-width="80px" :model="form" class="elForm">
      <el-form-item label="产品分类">
        <el-cascader
          :options="options"
          :props="{ checkStrictly: true,label:'name',value:'id' }"
          clearable
          v-model="value"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="上传excel">
        <input
          type="file"
          @change="exportData"
          ref="excelFile"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          class="fileInput"
        />
        <span v-if="delFile" class="delFile" @click="delFileFun">删除文件</span>
      </el-form-item>
      <el-button type="primary" class="elButton" @click="submit">上传</el-button>
    </el-form>
  </div>
</template>
<script>
import req from "../../../api/request";
import XLSX from "xlsx";
export default {
  data() {
    return {
      form: {},
      options: [],
      value: "",
      excelList: [], //excel导入解析后数组
      delFile: false
    };
  },
  mounted() {
    this.getClassList();
  },
  methods: {
    getClassList() {
      req.post("/api/classify/getClassList").then(res => {
        if (res.data.code === 200) {
          this.options = res.data.data;
        }
      });
    },
    exportData(event) {
      if (!event.currentTarget.files.length) {
        return;
      }
      const that = this;
      // 拿取文件对象
      var f = event.currentTarget.files[0];
      // 用FileReader来读取
      var reader = new FileReader();
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var wb; // 读取完成的数据
        var outdata; // 你需要的数据
        var reader = new FileReader();
        reader.onload = function(e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          // 接下来就是xlsx了，具体可看api
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          that.delFile = true;
          that.excelList = XLSX.utils.sheet_to_json(
            wb.Sheets[wb.SheetNames[0]]
          );
        };
        reader.readAsArrayBuffer(f);
      };
      reader.readAsBinaryString(f);
    },
    formatDate(numb) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      return time;
    },

    delFileFun() {
      this.delFile = false;
      this.$refs.excelFile.value = "";
    },
    submit() {
      if (!this.value) {
        this.$message({
          message: "请选择分类",
          type: "warning"
        });
      }
      if (!this.delFile) {
        this.$message({
          message: "请上传excel文件",
          type: "warning"
        });
      }
      req
        .post("/api/product/channelExcel", {
          excelList: this.excelList,
          value: this.value
        })
        .then(res => {
          if (res.data.success) {
            this.$message({
              message: "导入成功",
              type: "success"
            });
            this.value="";
            this.excelList=[];
            this.delFile=false;
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        });
    }
  }
};
</script>
<style lang="less">
.channelProBox {
  .header {
    text-align: left;
    margin: 20px 0;
  }

  .fileInput {
    width: 160px;
  }

  .delFile {
    color: red;
    cursor: pointer;
    text-decoration: solid;
  }

  .elForm {
    width: 800px;
    padding: 50px;
    text-align: left;
  }
}
</style>