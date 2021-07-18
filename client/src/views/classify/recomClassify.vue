<template>
  <div class="addClassBox">
    <el-page-header :content="$route.meta.name" @back="$router.go(-1)"></el-page-header>
    <el-form label-position="left" label-width="80px" :model="form" class="elForm">
      <el-form-item label="分类名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类">
        <el-cascader
          :options="options"
          :props="{ checkStrictly: true,label:'name',value:'id' }"
          clearable
          v-model="value"
        ></el-cascader>
      </el-form-item>
      <el-button type="primary" class="elButton" @click="recomClass">添加</el-button>
    </el-form>
  </div>
</template>

<script>
import req from "../../../api/request";
export default {
  data() {
    return {
      value: "",
      form: {
        name: ""
      },
      options: [],
      id: ""
    };
  },
  methods: {
    recomClass() {
      console.log(this.value);
      req
        .post("/api/classify/recomClassify", {
          name: this.form.name,
          parent:
            typeof this.value === "object"
              ? this.value.reverse()[0]
              : this.value,
          id: this.id
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.$router.push({ name: "classifyList" });
          }
        });
    },
    getClassList() {
      req.post("/api/classify/getClassList").then(res => {
        if (res.data.code === 200) {
          this.options = res.data.data;
        }
        if (!this.$route.params.id) {
          //没有产品ID 跳转回产品列表页
          this.$router.push({ name: "classifyList" });
          return;
        }
        this.form.name = this.$route.params.name;
        this.value = this.$route.params.parent;
        this.id = this.$route.params.id;
      });
    }
  },
  mounted() {
    this.getClassList();
  }
};
</script>

<style lang="less">
.addClassBox {
  .elForm {
    width: 500px;
    padding: 50px;
    text-align: left;

    .elButton {
      width: 100px;
    }
  }
}
</style>