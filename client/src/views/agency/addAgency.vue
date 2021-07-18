<template>
    <div class="agencyBox">
        <el-page-header :content="$route.meta.name" @back="$router.push({path:'/'})"></el-page-header>
        <el-form label-position="left" label-width="80px" :model="form" class="elForm">
            <el-form-item label="代理账号">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="代理密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="代理等级">
                <el-select v-model="form.level" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" class="elButton" @click="addAgency">添加</el-button>
        </el-form>
    </div>
</template>
<script>
    import req from "../../../api/request";
    export default {
        data() {
            return {
                form: {

                },
                options: [

                ]
            }
        },
        methods: {
            getAgencyOption() {
                req.post('/api/agency/getAgencyList').then(res => {
                    this.options = res.data.data;
                })
            },
            addAgency() {
                req.post('/api/user/addAgency', this.form).then(res => {
                    if (res.data.success) {
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
                        this.form = {}
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: "error"
                        });
                    }
                })
            }
        },
        mounted() {
            this.getAgencyOption();
        }
    }
</script>
<style lang="less">
    .agencyBox {
        .elForm {
            width: 600px;
            padding: 50px 0;
            text-align: left;
        }
    }
</style>