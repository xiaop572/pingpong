<template>
  <div class="addProBox">
    <el-page-header :content="$route.meta.name" @back="$router.go(-1)"></el-page-header>
    <el-form label-position="left" label-width="80px" :model="form" class="elForm">
      <el-form-item label="产品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="产品分类">
        <el-cascader
          :options="options"
          :props="{ checkStrictly: true,label:'name',value:'id' }"
          clearable
          v-model="value"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="产品规格">
        <el-tag
          :key="tag"
          v-for="tag in size"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加规格</el-button>
      </el-form-item>
      <el-form-item label="成本价格">
        <el-input v-model="form.costPrice" type="number"></el-input>
      </el-form-item>
      <el-form-item label="库存">
        <el-input v-model="form.count" type="number"></el-input>
      </el-form-item>
      <el-form-item label="代理价格">
        <el-table :data="agencyPrice" style="width: 100%" border>
          <el-table-column prop="name" label="代理等级"></el-table-column>
          <el-table-column label="代理价格">
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.price"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-button type="primary" class="elButton" @click="onSubmit">修改</el-button>
    </el-form>
  </div>
</template>
<script>
import req from "../../../api/request";
export default {
  data() {
    return {
      id: "",
      value: null,
      form: {},
      options: [],
      size: [],
      inputVisible: false,
      inputValue: "",
      agencyPrice: [
        {
          name: "代理1",
          price: ""
        },
        {
          name: "代理2",
          price: ""
        },
        {
          name: "代理3",
          price: ""
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      this.$confirm("是否修改产品数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.submit()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      
    },
    submit(){
      if (!this.value || !this.form.name || !this.form.costPrice) {
        this.$message({
          message: "名称、成本价、分类不能为空",
          type: "error"
        });
        return;
      }
      let classify =typeof this.value==='object'? this.value.reverse()[0]:this.value;
      req
        .post("/api/product/addProduct", {
          ...this.form,
          size: this.size,
          agencyPrice: this.agencyPrice,
          classify
        })
        .then(res => {
          if (res.data.success) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.value = "";
            this.form = {};
            this.agencyPrice = [
              {
                name: "代理1",
                price: ""
              },
              {
                name: "代理2",
                price: ""
              },
              {
                name: "代理3",
                price: ""
              }
            ];
            this.size = [];
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        });
    },
    getClassList() {
      req.post("/api/classify/getClassList").then(res => {
        if (res.data.code === 200) {
          this.options = res.data.data;
        }
      });
    },
    handleClose(tag) {
      this.size.splice(this.size.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.size.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  mounted() {
    this.getClassList();
    if (!this.$route.params.id) {
      //没有产品ID 跳转回产品列表页
      this.$router.push({ name: "proList" });
      return;
    }
    this.id = this.$route.params.id;
    this.form = this.$route.params;
    this.value = this.$route.params.classify;
    this.size = JSON.parse(this.$route.params.size);
    this.agencyPrice = JSON.parse(this.$route.params.agencyPrice);
  }
};
</script>
<style lang="less">
.addProBox {
  .elForm {
    width: 800px;
    padding: 50px;
    text-align: left;

    .elButton {
      width: 100px;
    }
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>