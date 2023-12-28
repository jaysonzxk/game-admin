<template>
    <div class="app-container">
        <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="100px">
            <el-form-item label="轮播图标题" prop="name">
                <el-input v-model="queryParams.name" placeholder="请输入轮播图标题" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button v-hasPermi="['system:notice:add']" type="primary" plain icon="el-icon-plus" size="mini"
                    @click="handleAdd">新增</el-button>
            </el-col>
            <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
        </el-row>

        <el-table v-loading="loading" :data="bannersList">
            <el-table-column label="序号" type="index" width="50" align="center">
            </el-table-column>
            <el-table-column label="轮播图标题" align="center" prop="name" :show-overflow-tooltip="true" />
            <el-table-column label="图片" align="center" prop="uri" width="400">
                <template slot-scope="scope">
                    <el-image style="width: 200px; height: 100px" :src="host + scope.row.uri">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="跳转类型" align="center" prop="jumpType">
                <template slot-scope="scope">
                    <span v-if="scope.row.jumpType === 0">内部跳转</span>
                    <span v-else>外部跳转</span>
                </template>
            </el-table-column>
            <el-table-column label="跳转地址" align="center" prop="jumpUrl">
                <template slot-scope="scope">
                    <template v-if="scope.row.jumpType === 0">
                        <span v-for="(item, index) in jumpOptions" :key="index">
                            <span v-if="scope.row.jumpUrl == item.dictValue">{{ item.dictLabel }}</span>
                        </span>
                    </template>
                    <template v-else>
                        <span>{{ scope.row.jumpUrl }}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="排序" align="center" prop="sort" width="100" />
            <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat" />
            <el-table-column label="到期时间" align="center" prop="expiration" width="200">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.expiration) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" prop="create_datetime" width="200">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.create_datetime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button v-hasPermi="['system:notice:edit']" size="mini" type="text" icon="el-icon-edit"
                        @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button v-hasPermi="['system:notice:remove']" size="mini" type="text" icon="el-icon-delete"
                        @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />

        <!-- 添加或修改公告对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="780px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-row>
                    <el-col :span="14">
                        <el-form-item label="轮播图标题" prop="name">
                            <el-input v-model="form.name" placeholder="请输入轮播图标题" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item label="跳转类型" prop="jumpType">
                            <el-select v-model="form.jumpType" placeholder="请选择">
                                <el-option v-for="item in jumpTypeOptions" :key="item.dictValue" :label="item.dictLabel"
                                    :value="item.dictValue">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <template v-if="this.form.jumpType === 0">
                            <el-form-item label="跳转地址" prop="jumpUrl">
                                <el-select v-model="form.jumpUrl" placeholder="跳转地址">
                                    <el-option v-for="item in jumpOptions" :key="item.dictValue" :label="item.dictLabel"
                                        :value="item.dictValue">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                        <template v-else>
                            <el-form-item label="跳转地址" prop="jumpUrl">
                                <el-input v-model="form.jumpUrl" placeholder="请输入跳转地址"></el-input>
                            </el-form-item>
                        </template>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item label="轮播图" prop="uri">
                            <!-- <upload v-model="form.uri" @uri="uri" :uri="form.uri"></upload> -->
                            <el-upload :action="uploadImgUrl" list-type="picture-card" :on-success="handleUploadSuccess"
                                :before-upload="handleBeforeUpload" :on-error="handleUploadError" name="file"
                                :show-file-list="false" :headers="headers"
                                style="display: inline-block; vertical-align: top" 
                                v-model="form.uri">
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
                        <el-form-item label="排序" prop="sort">
                            <el-input v-model="form.sort" placeholder="请输入排序" type="number" />
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
                    <el-col :span="24">
                        <el-form-item label="到期时间" prop="expiration">
                            <el-date-picker v-model="form.expiration" type="datetime" placeholder="选择日期时间">
                            </el-date-picker>
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
import { listBanners, getBanners, delBanners, addBanners, updateBanners } from "@/api/admin/notice/banners";
import Editor from "@/components/Editor";
// import upload from './upload.vue';
import { getToken } from "@/utils/auth";

export default {
    name: "Banners",
    components: {
        Editor,
        upload
    },
    data() {
        return {
            value: '',
            dialogVisible: false,
            uploadImgUrl: process.env.VUE_APP_BASE_API + "/admin/upload/", // 上传的图片服务器地址
            disabled: true,
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
            // 轮播图数据
            bannersList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 类型数据字典
            statusOptions: [{ dictLabel: '开启', dictValue: 1 }, { dictLabel: '关闭', dictValue: 0 }],
            // 跳转类型
            jumpTypeOptions: [{ dictLabel: '内部', dictValue: 0 }, { dictLabel: '外部', dictValue: 1 }],
            // 内部跳转地址
            jumpOptions: [{ dictLabel: '会员中心', dictValue: 0 }, { dictLabel: '推广赚钱', dictValue: 1 }, { dictLabel: '分享', dictValue: 2 }, { dictLabel: '机器人', dictValue: 4 }],
            // 状态数据字典
            // typeOptions: [],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                status: undefined
            },
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                name: [
                    { required: true, message: "公告标题不能为空", trigger: "blur" }
                ],

            },
            host: process.env.VUE_APP_BASE_API + '/',
            headers: {
                Authorization: "JWT " + getToken()
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
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
        /** 查询公告列表 */
        getList() {
            this.loading = true;
            listBanners(this.queryParams).then(response => {
                this.bannersList = response.data.results;
                this.total = response.data.count;
                this.loading = false;
            });
        },
        // 公告状态字典翻译
        statusFormat(row, column) {
            return this.selectDictLabel(this.statusOptions, row.status);
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
            this.loading = false;
        },
        // 表单重置
        reset() {
            this.form = {
                name: undefined,
                status: 1,
                sort: undefined,
                jumpType: 0,
                uri: undefined,
                jumpUrl: undefined,
                expiration: undefined
            };
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.handleQuery();
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.open = true;
            this.value = '';
            this.title = "添加轮播图";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const bannersId = row.id;
            // this.value = '';
            getBanners(bannersId).then(response => {
                this.form = response.data;
                this.value = this.host +  response.data.uri;
                this.open = true;
                this.title = "修改轮播";
            });
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id !== undefined) {
                        updateBanners(this.form).then(response => {
                            this.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        addBanners(this.form).then(response => {
                            console.log(this.form)
                            this.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const bannerId = row.id;
            this.$confirm('是否确认删除这条公告吗', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return delBanners(bannerId);
            }).then(() => {
                this.getList();
                this.msgSuccess("删除成功");
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.image {
    position: relative;

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
}</style>