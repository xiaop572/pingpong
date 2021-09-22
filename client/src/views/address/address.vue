<template>
    <div id="address">
        <el-page-header :content="$route.meta.name" @back="$router.push({path:'/'})"></el-page-header>
        <div class="addressTop">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="formInline.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="formInline.phone" placeholder="电话"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="formInline.address" placeholder="地址" class="addInput"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="addressBottom">
            <el-table :data="addressList" style="width: 100%" row-key="id" border default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="phone" label="电话"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="delAddress(scope.row)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import req from "../../../api/request.js";
    export default {
        data() {
            return {
                formInline: {
                    name: '',
                    phone: '',
                    address: ''
                },
                addressList: []
            };
        },
        methods: {
            onSubmit() {
                req.post('/api/address/addAddress', this.formInline).then(res => {
                    req.post('/api/address/getAddressList').then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                message: "添加成功",
                                type: "success"
                            });
                            this.getAddressList()
                        }
                    })

                })
            },
            getAddressList() {
                req.post('/api/address/getAddressList').then(res => {
                    if (res.data.code === 200) {
                        this.addressList = res.data.data;

                    }
                })
            },
            delAddress(row) {
                this.$confirm("是否删除该地址?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                        req
                            .post("/api/address/delAddress", {
                                id: row.id
                            })
                            .then(res => {
                                if (res.data.success) {
                                    this.$message({
                                        message: "删除成功",
                                        type: "success"
                                    });
                                    this.getAddressList()
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
        },
        mounted() {
            this.getAddressList()
        }
    };
</script>
<style lang="less">
    #address {
        .addressTop {
            padding: 50px;
            text-align: left;

            .addInput {
                width: 400px;
            }
        }

        .addressBottom {
            width: 1200px;
        }
    }
</style>