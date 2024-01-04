<template>
    <div class="app-container">
        <el-row>
            <el-col :span="20" :xs="24">
                <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
                    <el-form-item :label="$t('live.liveName')" prop="name">
                        <el-input v-model="queryParams.name" :placeholder="$t('live.placeholderLiveName')" clearable size="small"
                            style="width: 240px" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    
                    <el-form-item :label="$t('live.status')" prop="status">
                        <el-select v-model="queryParams.status" :placeholder="$t('live.status')" clearable size="small"
                            style="width: 240px">
                            <el-option v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictLabel"
                                :value="dict.dictValue" />
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="false" :label="$t('live.createDate')">
                        <el-date-picker v-model="dateRange" size="small" style="width: 240px" value-format="yyyy-MM-dd"
                            type="daterange" range-separator="-" :start-placeholder="$t('live.startDate')" :end-placeholder="$t('live.endDate')" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('live.search') }}</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('live.reset') }}</el-button>
                    </el-form-item>
                </el-form>

                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button v-hasPermi="['live:lives:add:post']" type="primary" plain icon="el-icon-plus"
                            size="mini" @click="handleAdd">新增
                        </el-button>
                    </el-col>
                    <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
                </el-row>

                <el-table v-loading="loading" :data="liveList" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column :label="$t('table.index')" type="index" width="80" align="center">
                    </el-table-column>
                    <el-table-column :label="$t('table.liveName')" align="center" prop="name" :show-overflow-tooltip="true" />
                    <el-table-column :label="$t('table.cover')" align="center" prop="uri" width="200">
                        <template slot-scope="scope">
                            <el-image style="width: auto; height: 100px" :src="host + scope.row.uri">
                            </el-image>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column :label="$t('table.jumpUrl')" align="center" prop="url" :show-overflow-tooltip="true" /> -->
                    <el-table-column :label="$t('table.tickets')" align="center" prop="tickets" :show-overflow-tooltip="true" />
                    <el-table-column :label="$t('table.heatValue')" align="center" prop="heatValue" :show-overflow-tooltip="true" />
                    <el-table-column :label="$t('table.sort')" align="center" prop="sort" :show-overflow-tooltip="true" />
                    <!-- <el-table-column :label="$t('table.recommend')" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isRecommend === 1">推荐</span>
                            <span v-else>--</span>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column :label="$t('table.hot')" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isHot === 1">热门</span>
                            <span v-else>--</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column :label="$t('table.status')" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status === 1">上架</span>
                            <span v-else>下架</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('table.desc')" align="center" prop="description" :show-overflow-tooltip="true" />
                    <el-table-column :label="$t('table.updateDate')" align="center" prop="update_datetime" width="160">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.update_datetime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('table.createDate')" align="center" prop="create_datetime" width="160">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.create_datetime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="hasPermi(['live:lives:update:post', 'live:lives:delete:post'])" :label="$t('table.operate')" align="center"
                        width="160" class-name="small-padding fixed-width">
                        <template slot-scope="scope">
                            <el-button v-hasPermi="['live:lives:update:post']" size="mini" type="text" icon="el-icon-edit"
                                @click="handleUpdate(scope.row)">修改
                            </el-button>
                            <el-button v-hasPermi="['live:lives:delete:post']" size="mini" type="text" icon="el-icon-edit"
                                @click="handleDelete(scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize" @pagination="getList" />
            </el-col>
        </el-row>

        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="780px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-row>
                    <el-col :span="14">
                        <el-form-item label="直播间名称" prop="name">
                            <el-input v-model="form.name" placeholder="请输入直播间名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item label="封面图" prop="uri">
                            <!-- <upload v-model="form.uri" @uri="uri" :uri="form.uri"></upload> -->
                            <el-upload :action="uploadImgUrl" list-type="picture-card" :on-success="handleUploadSuccess"
                                :before-upload="handleBeforeUpload" :on-error="handleUploadError" name="file"
                                :show-file-list="false" :headers="headers"
                                style="display: inline-block; vertical-align: top" v-model="form.uri">
                                <el-image v-if="!value" :src="value">
                                    <div slot="error" class="image-slot">
                                        <i class="el-icon-plus" />
                                    </div>
                                </el-image>
                                <div v-else class="image">
                                    <el-image :src="value" :style="`width:200px;height:150px;`" fit="fill" />
                                    <div class="mask">
                                        <div class="actions">
                                            <span title="预览" @click.stop="dialogVisible = true">
                                                <i class="el-icon-zoom-in" />
                                            </span>
                                            <span title="移除" @click.stop="removeImage">
                                                <i class="el-icon-delete" />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible" title="预览" width="800" append-to-body>
                                <img :src="value" style="display: block; max-width: 100%; margin: 0 auto;">
                            </el-dialog>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属模块" prop="tag">
                            <el-select v-model="form.tag" placeholder="所属模块" clearable size="small"
                                style="width: 240px">
                                <el-option v-for="(item, index) in allTags" :key="index" :label="item.name"
                                    :value="item.id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="门票价格" prop="tickets">
                            <el-input v-model="form.tickets" placeholder="请输入门票价格" type="number" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="热度值" prop="heatValue">
                            <el-input v-model="form.heatValue" placeholder="请输入热度值" type="number" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="排序" prop="sort">
                            <el-input v-model="form.sort" placeholder="请输入排序" type="number" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="直播间描述" prop="description">
                            <el-input v-model="form.description" placeholder="请输入直播间描述" type="textarea" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="状态">
                            <el-radio-group v-model="form.status">
                                <el-radio v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictValue">{{
                                    dict.dictLabel
                                }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    
                    <!-- <el-col :span="24">
                        <el-form-item label="到期时间" prop="expiration">
                            <el-date-picker v-model="form.expiration" type="datetime" placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col> -->
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
    listLive,
    getLive,
    addLive,
    updateLive,
    delLive,
    allTag
} from "@/api/admin/lives/live";
import { getToken } from "@/utils/auth";
export default {
    name: "Category",
    data() {
        return {
            value: '',
            dialogVisible: false,
            uploadImgUrl: process.env.VUE_APP_BASE_API + "/admin/upload", // 上传的图片服务器地址
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
            liveList: null,
            // 厂商；列表
            allCategoryList: null,
            // 所有模块
            allTags: null,
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 日期范围
            dateRange: [],
            // 状态数据字典
            statusOptions: [{ dictLabel: "上架", dictValue: 1 }, { dictLabel: "下架", dictValue: 0 }],
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
            },
            host: process.env.VUE_APP_BASE_API + '/',
            headers: {
                Authorization: "JWT " + getToken()
            }
        };
    },
    watch: {

    },
    created() {
        this.getList();
        this.getAllTag();
    },
    methods: {
        
        getAllTag() {
            allTag().then(response => {
                this.allTags = response.data;
            })
        },
        removeImage() {
            this.value = '';
        },
        handleUploadSuccess(res) {
            this.form.uri = res.data.image.split('/').slice(res.data.image.split('/').length - 3, res.data.image.split('/').length).join('/')
            this.value = res.data.image;
            this.loading.close();
        },
        handleBeforeUpload() {
            this.loading = this.$loading({
                lock: true,
                text: "上传中",
                background: "rgba(0, 0, 0, 0.7)"
            });
        },
        handleUploadError() {
            this.$message({
                type: "error",
                message: "上传失败"
            });
            this.loading.close();
        },
        uri(data) {
            this.form.uri = data;
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            listLive(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.liveList = response.data.results;
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
                uri: undefined,
                isRecommend: 0,
                isHot: 0
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
            this.title = "添加直播间配置";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            // this.reset();
            const id = row.id || this.ids;
            getLive(id).then(response => {
                const data = response.data;
                this.form = data;
                this.value = this.host + data.uri;
                this.open = true;
                this.title = "修改游戏";
            });
        },

        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id !== undefined) {
                        updateLive(this.form).then(response => {
                            this.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        addLive(this.form).then(response => {
                            this.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                            this.value = '';
                        });
                    }
                }
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const liveId = row.id || this.ids;
            this.$confirm('是否确认删除该数据', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return delLive(liveId);
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

.image {
    position: relative;

    .el-image {
        width: auto !important;
    }

    .mask {
        opacity: 0;
        position: absolute;
        top: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.3s;
    }

    &:hover .mask {
        opacity: 1;
    }

}
</style>
  