<template>
    <div class="app-container">
        <el-row>
            <!--用户数据-->
            <el-col :span="20" :xs="24">
                <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="queryParams.username" placeholder="请输入用户名称" clearable size="small"
                            style="width: 240px" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item label="状态" prop="is_active">
                        <el-select v-model="queryParams.is_active" placeholder="用户状态" clearable size="small"
                            style="width: 240px">
                            <el-option v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictLabel"
                                :value="dict.dictValue" />
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="false" label="创建时间">
                        <el-date-picker v-model="dateRange" size="small" style="width: 240px" value-format="yyyy-MM-dd"
                            type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>

                <el-row :gutter="10" class="mb8">
                    <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
                </el-row>

                <el-table v-loading="loading" :data="userVipList" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="序号" type="index" width="50" align="center">
                    </el-table-column>
                    <el-table-column key="username" label="用户" align="center" prop="username"
                        :show-overflow-tooltip="true" />
                    <el-table-column key="name" label="会员名称" align="center" prop="name"
                        :show-overflow-tooltip="true" />
                    <el-table-column key="isExpiration" label="是否到期" align="center" prop="isExpiration"
                        :show-overflow-tooltip="true" />
                    <el-table-column key="expiration" label="到期时间" align="center" prop="expiration">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.expiration) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column key="status" label="状态" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status === 1">启用</span>
                            <span v-else>禁用</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="更新时间" align="center" prop="update_datetime"
                        width="160">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.update_datetime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" align="center" prop="create_datetime"
                        width="160">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.create_datetime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-if="hasPermi(['permission:user:{id}:put', 'permission:user:{id}:delete', 'permission:user:resetpwd:put'])"
                        label="操作" align="center" width="160" class-name="small-padding fixed-width">
                        <template slot-scope="scope">
                            <el-button v-hasPermi="['permission:user:{id}:put']" size="mini" type="text" icon="el-icon-edit"
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
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户昵称" prop="name">
                            <el-input v-model="form.name" placeholder="请输入用户昵称" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号码" prop="mobile">
                            <el-input v-model="form.mobile" placeholder="请输入手机号码" maxlength="11" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item v-if="form.id == undefined" label="用户名称" prop="username">
                            <el-input v-model="form.username" placeholder="请输入用户名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="form.id == undefined" label="用户密码" prop="password">
                            <el-input v-model="form.password" placeholder="请输入用户密码" type="password" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户性别">
                            <el-select v-model="form.gender" placeholder="请选择">
                                <el-option v-for="dict in sexOptions" :key="dict.dictValue" :label="dict.dictLabel"
                                    :value="dict.dictValue" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态">
                            <el-radio-group v-model="form.is_active">
                                <el-radio v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictValue">{{
                                    dict.dictLabel }}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="角色">
                            <el-select v-model="form.roleIds" placeholder="请选择">
                                <el-option v-for="item in roleOptions" :key="item.id" :label="item.roleName"
                                    :value="item.id" :disabled="item.status == 0" />
                            </el-select>
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
    listUserVip,
    getUserVip,
    updateUserVip
} from "@/api/admin/member/userVip";

export default {
    name: "UserVip",
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
            userVipList: null,
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 日期范围
            dateRange: [],
            // 状态数据字典
            statusOptions: [{ dictLabel: "正常", dictValue: true }, { dictLabel: "停用", dictValue: false }],
            // 表单参数
            form: {},
            defaultProps: {
                children: "children",
                label: "label"
            },
            
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
            },
            // 表单校验
            rules: {
                username: [
                    { required: true, message: "用户名称不能为空", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "用户昵称不能为空", trigger: "blur" }
                ]
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
            listUserVip(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.userVipList = response.data.results;
                this.total = response.data.count;
                this.loading = false;
            }
            );
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
                status: false,
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
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const id = row.id || this.ids;
            getUserVip(id).then(response => {
                const data = response.data;
                this.form = data;
                this.open = true;
                this.title = "修改用户";
                this.form.password = "";
            });
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id !== undefined) {
                        updateUserVip(this.form).then(response => {
                            this.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        return;
                    }
                }
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids;
            this.$confirm('是否确认删除用户编号为"' + userIds + '"的数据项?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return delUser(userIds);
            }).then(() => {
                this.getList();
                this.msgSuccess("删除成功");
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
  