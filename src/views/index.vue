<template>
    <div class="container">
        <div class="toady">
            <span class="toady-data">今日数据统计</span>
            <div class="body">
                <el-card class="box-card">
                    <div class="demo">
                        <span>安卓今日新增</span>
                        <span style="color: red;">212</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>iOS今日新增</span>
                        <span style="color: red;">3434</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>VIP充值人数</span>
                        <span style="color: red;">432</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>有效余额充值订单</span>
                        <span style="color: red;">4232</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>有效注单数</span>
                        <span style="color: red;">4232</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>充值金额</span>
                        <span style="color: red;">4232</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>提现金额</span>
                        <span style="color: red;">4232</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>打赏订单数</span>
                        <span style="color: red;">4232</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>打赏金额</span>
                        <span style="color: red;">4232</span>
                    </div>
                </el-card>
            </div>

        </div>
        <div class="total">
            <span class="total-data">数据汇总统计</span>
            <div class="body">
                <el-card class="box-card">
                    <div class="demo">
                        <span>安卓新增</span>
                        <span style="color: brown;">212</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>iOS新增</span>
                        <span style="color: brown;">3434</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>VIP充值人数</span>
                        <span style="color: brown;">432</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>有效余额充值订单</span>
                        <span style="color: brown;">4232</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>有效注单数</span>
                        <span style="color: brown;">4232</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>充值金额</span>
                        <span style="color: brown;">4232</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>提现金额</span>
                        <span style="color: brown;">4232</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>打赏订单数</span>
                        <span style="color: brown;">4232</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div class="demo">
                        <span>打赏金额</span>
                        <span style="color: brown;">4232</span>
                    </div>
                </el-card>
            </div>

        </div>
        <div>
            <component :is="currentView" :data="barData" :category="categoryData" :legend="legendData"></component>
        </div>

    </div>
</template>

<script>
import barEcharts from './components/bardemo.vue' //导入组件
export default {
  name: 'index',
  data () {
    return {
      // 图表数据
      barData: {
        '2011': [18203, 23489, 29034, 104970, 131744, 630230],
        '2012': [19325, 23438, 31000, 121594, 134141, 681807]
      },
      focusType: 1,
      //定义组件，在上面用：is使用，不需要components注册
      currentView: barEcharts,
      categoryData: {
        data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
      },
      legendData: ['2011', '2012'],
    }
  }
}
</script>

<style scoped lang="scss">
.container {
    .toady {
        margin-top: 20px;
        margin-left: 20px;

        .toady-data {
            font-size: 14px;
            font-weight: 500;
        }

        .body {
            margin-top: 20px;
            display: flex;
            // justify-content: space-between;
            flex-wrap: wrap;

            .box-card {
                margin: 3px 10px;
                background: linear-gradient(to right, #3b7b93, #509970);

                .el-card__body {
                    width: auto !important;
                }

                .demo {
                    display: flex;
                    width: 200px;
                    // height: 100px;
                    padding: 0 20px;
                    font-weight: 700;
                    font-size: 20px;
                    // align-items: center;
                    justify-content: center;
                    flex-direction: column;

                }
            }
        }

    }

    .total {
        margin-top: 20px;
        margin-left: 20px;

        .total-data {
            font-size: 14px;
            font-weight: 500;
        }

        .body {
            margin-top: 20px;
            display: flex;
            // justify-content: space-between;
            flex-wrap: wrap;

            .box-card {
                margin: 3px 10px;
                background: linear-gradient(to right, #a44b54, #a86e3c);

                .el-card__body {
                    width: auto !important;
                }

                .demo {
                    display: flex;
                    width: 200px;
                    // height: 100px;
                    padding: 0 20px;
                    font-weight: 700;
                    font-size: 20px;
                    // align-items: center;
                    justify-content: center;
                    flex-direction: column;

                }
            }
        }
    }

}</style>
