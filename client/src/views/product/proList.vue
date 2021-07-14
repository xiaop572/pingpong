<template>
  <div class="proListBox">
    <el-page-header :content="$route.meta.name"></el-page-header>
    <div class="proListTable">
      <el-table :data="proData" style="width: 100%" border>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="costPrice" label="成本价格"></el-table-column>
        <el-table-column prop="count" label="库存"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="recomPro(scope.row)" type="primary">编辑</el-button>
            <el-button size="mini" @click="delPro(scope.row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox">
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :page-size="pageSize"
          :page-count="pageCount" :total="total" @current-change="changePage" @size-change="changeSize"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import req from "../../../api/request";
  export default {
    data() {
      return {
        proData: [],
        total: 0,
        currentPage: 1,
        pageCount: 1,
        pageSize: 10
      };
    },
    mounted() {
      this.getPro()
    },
    methods: {
      getPro() {
        req
          .post("/api/product/SearchProduct", {
            page: this.currentPage,
            size: this.pageSize
          })
          .then(res => {
            this.proData = res.data.data.data; //产品数据
            this.total = res.data.data.total; //总条数
          });
      },
      changePage(page) {
        this.currentPage = page;
        this.getPro()
      },
      changeSize(size) {
        this.currentPage = 1;
        this.pageSize = size;
        this.getPro();
      },
      recomPro(row) {
        this.$router.push({
          name: "recomPro",
          params: row
        })
      },
      delPro(row) {
        this.$confirm('是否删除该产品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          req
            .post("/api/product/delPro", {
              id: row.id
            })
            .then(res => {
              if (res.data.success) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.getPro()
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

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
  }
</style>