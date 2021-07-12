<template>
  <div class="powerManBox">
    <el-page-header :content="$route.meta.name"></el-page-header>
    <div class="roleMenuBox">
      <div class="roleLeft">
        <ul>
          <li
            v-for="item in roles"
            :key="item.id"
            :class="value==item.id?'active':''"
            @click="changeRole(item.id)"
          >{{item.rolename}}</li>
        </ul>
      </div>
      <div class="roleRight">
        <ul>
          <li v-for="item in menuList" :key="item.id">
            <el-checkbox v-model="item.checked" @change="changeRoleMenu(item)">{{item.name}}</el-checkbox>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import req from "../../../api/request";
export default {
  data() {
    return {
      value: "",
      roles: [],
      menuList: []
    };
  },
  methods: {
    getRoleList() {
      req.post("/api/role/getRoleList").then(res => {
        if (res.data.success) {
          this.roles = res.data.data;
          this.value = this.roles[0].id;
          this.getRoleMenuStateList(this.roles[0].id);
        }
      });
    },
    getRoleMenuStateList(id) {
      req.post("/api/roleMenu/getRoleMenuStateList", { id }).then(res => {
        if (res.data.success) {
          this.menuList = res.data.data;
        }
      });
    },
    changeRole(id) {
      this.value = id;
    },
    changeRoleMenu(item) {
      req
        .post("/api/roleMenu/changeRoleMenuState", {
          id: this.value,
          menuId: item.id,
          state: item.checked
        })
        .then(res => {
          if (res.data.success) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          }else{
              this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        });
    }
  },
  mounted() {
    this.getRoleList();
  }
};
</script>
<style lang="less">
.roleMenuBox {
  padding: 50px;
  .roleLeft {
    width: 120px;
    height: 400px;
    float: left;
    border: 1px solid #ddd;
    li {
      list-style: none;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      color: #666;
      &:hover {
        background: #2ecc71;
        color: #fff;
      }
    }
    .active {
      background: #2ecc71;
      color: #fff;
    }
  }
  .roleRight {
    float: left;
    width: 160px;
    height: 400px;
    overflow-y: auto;
    margin-left: 10px;
    border: 1px solid #ddd;
    li {
      list-style: none;
      height: 40px;
      line-height: 40px;
      text-align: left;
      padding: 0 20px;
    }
  }
}
</style>