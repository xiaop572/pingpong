<template>
  <div class="menuListBox">
    <el-page-header :content="$route.meta.name"></el-page-header>
    <div class="menuHeader">
      <el-button type="primary" @click="dialogFormVisible=!dialogFormVisible">添加菜单</el-button>
    </div>
    <div class="elForm">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="name" label="菜单名">
        </el-table-column>
        <el-table-column prop="path" label="路径">
        </el-table-column>
        <el-table-column prop="parent" label="父级">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加菜单" :visible.sync="dialogFormVisible" class="addMenuDialog">
      <el-form :model="form" label-width="80px">
        <el-form-item label="菜单名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="父级菜单">
          <el-select v-model="form.parent" placeholder="请选择">
            <el-option label="" value="">
            </el-option>
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMenu()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import req from "../../../api/request.js";
  export default {
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        form: {},
        options: []
      }
    },
    methods: {
      addMenu() {
        this.dialogFormVisible = false;
        req.post('/api/menu/addMenu', this.form).then(res => {
          if (res.data.code === 200) {
            this.getMenuList();
            this.form = {};
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }

        })
      },
      getMenuList() {
        req.post('/api/menu/getMenuList').then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data;
            this.options = res.data.data;
            console.log(res.data);
          }
        })
      }
    },
    mounted() {
      this.getMenuList()
    }
  };
</script>

<style lang="less">
  .menuListBox {
    .menuHeader {
      text-align: left;
      padding: 20px 50px;
    }

    .addMenuDialog {
      text-align: left;

      .el-dialog {
        width: 600px;

        .el-input {
          width: 80%;
        }
      }

    }

    .elForm {
      padding: 0 50px 0 50px;
      width: 800px;
    }
  }
</style>