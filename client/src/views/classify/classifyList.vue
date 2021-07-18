<template>
  <div class="classListBox">
    <el-page-header :content="$route.meta.name" @back="$router.push({path:'/'})"></el-page-header>
    <div class="classListTable">
      <el-table
        :data="classData"
        style="width: 100%"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="recomPro(scope.row)" type="primary">编辑</el-button>
            <el-button size="mini" @click="delPro(scope.row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import req from "../../../api/request";
export default {
  data() {
    return {
      classData: []
    };
  },
  mounted() {
    this.getPro();
  },
  methods: {
    getPro() {
      req
        .post("/api/classify/getClassList", {
          page: this.currentPage,
          size: this.pageSize
        })
        .then(res => {
          this.classData = res.data.data; //产品数据
        });
    },
    recomPro(row) {
      this.$router.push({
        name: "recomClassify",
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
            .post("/api/classify/delClassify", {
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
    }
  }
};
</script>

<style lang="less">
.classListBox {
  .classListTable {
    padding: 50px 0;
  }

  .pageBox {
    padding: 50px 0;
  }
}
</style>