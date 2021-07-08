<template>
    <div class="addProBox">
        <el-page-header :content="$route.meta.name"></el-page-header>
        <el-form label-position="left" label-width="80px" :model="form" class="elForm">
            <el-form-item label="产品名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="产品分类">
                <el-cascader :options="options" :props="{ checkStrictly: true,label:'name',value:'id' }" clearable
                    v-model="value"></el-cascader>
            </el-form-item>
            <el-form-item label="产品规格">
                <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag}}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                    @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加规格</el-button>
            </el-form-item>
            <el-form-item label="成本价格">
                <el-input v-model="form.costPrice" type="number"></el-input>
            </el-form-item>
            <el-form-item label="代理价格">
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column prop="name" label="代理等级">
                    </el-table-column>
                    <el-table-column  label="代理价格">
                        <template slot-scope="scope">
                            <el-input type="number" v-model="scope.row.price"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-button type="primary" class="elButton">添加</el-button>
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

                },
                options: [],
                tableData: [

                ],
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                tableData: [{
                    name:'代理1',
                    price:''
                },{
                    name:'代理2',
                    price:''
                }, {
                    name:'代理3',
                    price:''
                }]
            }
        },
        methods: {
            getClassList() {
                req.post('/api/classify/getClassList').then(res => {
                    if (res.data.code === 200) {
                        this.options = res.data.data;
                    }
                })
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
        mounted() {
            this.getClassList()
        },
    }
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

        .el-tag+.el-tag {
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