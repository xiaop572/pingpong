<template>
  <div>
    <el-page-header :content="$route.meta.name"></el-page-header>
    <el-form label-position="left" label-width="80px" :model="form" class="elForm">
      <el-form-item label="分类名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类">
        <el-cascader :options="options" :props="{ checkStrictly: true,label:'name',value:'id' }"
          clearable v-model="value"></el-cascader>
      </el-form-item>
      <el-button type="primary" class="elButton" @click="addClass">添加</el-button>
    </el-form>
  </div>
</template>

<script>
  import req from '../../../api/request'
  export default {
    data() {
      return {
        value: null,
        form: {
          name: ""
        },
        options: []
      }
    },
    methods: {
      addClass() {
        console.log(this.value);
        req.post('/api/classify/addClass', {
          name: this.form.name,
          parent: this.value ? this.value.reverse()[0] : this.value
        }).then(res => {
          if (res.data.code === 200) {
            this.form = {
              name: "",
            }
            this.value = null;
            this.getClassList()
          }
        })
      },
      getClassList() {
        req.post('/api/classify/getClassList').then(res => {
          if (res.data.code === 200) {
            this.options = res.data.data;
          }
        })
      }
    },
    mounted() {
      this.getClassList()
    },
  }
</script>

<style lang="less">
  .elForm {
    width: 500px;
    padding: 50px;
    text-align: left;

    .elButton {
      width: 100px;
    }
  }
</style>