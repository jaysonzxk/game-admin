<template>
    <div class="app-container">
        <el-row>
            <!--用户数据-->
            <el-col :span="20" :xs="24">
                <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
                    <el-form-item label="渠道名称 " prop="name">
                        <el-input v-model="queryParams.name" placeholder="请输入渠道名称" clearable size="small"
                            style="width: 240px" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-select v-model="queryParams.status" placeholder="状态" clearable size="small"
                            style="width: 240px">
                            <el-option v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictLabel"
                                :value="dict.dictValue" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>

                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button v-hasPermi="['pay:payChannel:add:post']" type="primary" plain icon="el-icon-plus"
                            size="mini" @click="handleAdd">新增
                        </el-button>
                    </el-col>
                    <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
                </el-row>

                <el-table v-loading="loading" :data="payChannelList" @selection-change="handleSelectionChange">
                    <el-table-column label="序号" type="index" width="50" align="center">
                    </el-table-column>
                    <el-table-column key="name" label="渠道名称" align="center" prop="name" :show-overflow-tooltip="true" />
                    <el-table-column key="minQuota" label="最小限额" align="center" prop="minQuota"
                        :show-overflow-tooltip="true" />
                    <el-table-column key="maxQuota" label="最大限额" align="center" prop="maxQuota"
                        :show-overflow-tooltip="true" />
                    <el-table-column key="payKey" label="商户key" align="center" prop="payKey"
                        :show-overflow-tooltip="true" />
                    <el-table-column key="payCode" label="通道编号" align="center" prop="payCode"
                        :show-overflow-tooltip="true" />
                    <el-table-column key="sort" label="排序" align="center" prop="sort"
                        :show-overflow-tooltip="true" />
                    <el-table-column key="status" label="状态" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status === 1">启用</span>
                            <span v-else>禁用</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="更新时间" align="center" prop="update_datetime" width="160">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.update_datetime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" align="center" prop="create_datetime" width="160">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.create_datetime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="hasPermi(['pay:payChannel:add:post', 'pay:payChannel:update:post'])" label="操作" align="center"
                        width="160" class-name="small-padding fixed-width">
                        <template slot-scope="scope">
                            <el-button v-hasPermi="['pay:payChannel:update:post']" size="mini" type="text" icon="el-icon-edit"
                                @click="handleUpdate(scope.row)">修改
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize" @pagination="getList" />
            </el-col>
        </el-row>

        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="渠道名称" prop="name">
                            <el-input v-model="form.name" placeholder="请输入会员卡名称" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="最小限额" prop="minQuota">
                            <el-input type="number" v-model="form.minQuota" placeholder="最小限额" maxlength="11" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最大限额" prop="maxQuota">
                            <el-input type="number" v-model="form.maxQuota" placeholder="最大限额" maxlength="11" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="渠道key" prop="payKey">
                            <el-input v-model="form.payKey" placeholder="渠道key" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="渠道码" prop="payCode">
                            <el-input v-model="form.payCode" placeholder="渠道码" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="排序" prop="sort">
                            <el-input v-model="form.sort" placeholder="排序" type="number" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="状态">
                            <el-radio-group v-model="form.status">
                                <el-radio v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictValue">{{
                                    dict.dictLabel }}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
import {
    listPayChannel,
    getPayChannel,
    addPayChannel,
    updatePayChannel
} from "@/api/admin/payChannel/pay";

export default {
    name: "payChannel",
    data() {
        return {
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 显示搜索条件
            showSearch: true,
            // 总条数
            total: 0,
            // 用户表格数据
            payChannelList: null,
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 日期范围
            dateRange: [],
            // 状态数据字典
            statusOptions: [{ dictLabel: "正常", dictValue: 1 }, { dictLabel: "禁用", dictValue: 0 }],
            // 表单参数
            form: {
                status: 1
            },
            defaultProps: {
                children: "children",
                label: "label"
            },

            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                name: undefined,
                status: 1,
            },
            // 表单校验
            rules: {
                name: [
                    { required: true, message: "名称不能为空", trigger: "blur" }
                ],
            }
        };
    },
    watch: {

    },
    created() {
        this.getList();
    },
    methods: {
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            listPayChannel(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.payChannelList = response.data.results;
                this.total = response.data.count;
                this.loading = false;
            }
            );
        },

        // 筛选节点
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },

        // 用户状态修改
        handleStatusChange(row) {
            const text = row.is_active === true ? "启用" : "停用";
            this.$confirm('确认要"' + text + '""' + row.username + '"用户吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return changeUserStatus(row.id, row.is_active);
            }).then(() => {
                this.msgSuccess(text + "成功");
            }).catch(function () {
                row.is_active = row.is_active === false;
            });
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                id: undefined,
                name: undefined,
                status: 1,
                remark: undefined,
                minQuota: undefined,
                maxQuota: undefined,
                vipCardType: undefined,
                payKey:undefined,
                payCode: undefined,
                sort: undefined
            };
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.page = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.dateRange = [];
            this.resetForm("queryForm");
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length !== 1;
            this.multiple = !selection.length;
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "添加vip卡";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            // this.reset();
            const id = row.id || this.ids;
            getPayChannel(id).then(response => {
                const data = response.data;
                this.form = data;
                this.open = true;
                this.title = "修改vip卡";
            });
        },

        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id !== undefined) {
                        updatePayChannel(this.form).then(response => {
                            this.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        addPayChannel(this.form).then(response => {
                            this.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
    }
};
</script>
<style lang="scss">
.el-col-20 {
    width: 100% !important;
}
</style>
  