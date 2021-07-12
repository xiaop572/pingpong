<template>
  <div class="powerManBox">
    <el-page-header :content="$route.meta.name"></el-page-header>
    <div class="powerTable">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.power"
              placeholder="请选择"
              @change="changUser(scope.row)"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.rolename"
                :value="item.id"
              ></el-option>
            </el-select>
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
      value: "",
      tableData: [],
      options: []
    };
  },
  methods: {
    getUserList() {
      req.post("/api/user/getUserList").then(res => {
        if (res.data.success) {
          this.tableData = res.data.data;
        }
      });
    },
    changUser(row, value) {
      req.post("/api/user/changePowerInfo", row).then(res => {
        if (res.data.success) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    getRoleList() {
      req.post("/api/role/getRoleList").then(res => {
        if (res.data.success) {
          res.data.data = res.data.data.map(item => {
            return { ...item, id: item.id.toString() };
          });
          console.log(res.data.data);
          this.options = res.data.data;
          console.log(this.options);
        }
      });
    }
  },
  mounted() {
    this.getUserList();
    this.getRoleList();
  }
};
</script>
<style lang="less">
.powerTable {
  width: 600px;
  padding: 50px;
}
</style>