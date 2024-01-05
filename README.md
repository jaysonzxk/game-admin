## 开发

```bash
# 克隆项目
git clone https://gitee.com/liqianglog/django-vue-admin.git

# 进入项目目录
cd dvadmin-ui

# 安装依赖
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev

# 浏览器访问 http://localhost:8080
# .env.development 文件中可配置启动端口等参数
```

浏览器访问 http://localhost:8080

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 功能清单
```
1.系统管理
    菜单管理
    角色管理
    管理员列表
    系统配置

2.用户管理
    用户列表
    VIP商品管理
    VIP权益列表
    用户VIP
    星币兑换配置
    钻石兑换配置

3.财务管理
    支付渠道
    提现配置
    钱包流水
    提现记录
    充值记录

4.游戏管理
    大类配置
    游戏配置

5.直播管理
    模块配置
    直播间配置

6.广告管理
    banners配置
    跑马灯配置
    系统公告

7.活动管理
    日常活动
    新手活动
    签到活动
    节日活动

8.报表管理
    代理报表
    投注报表
    打赏报表
```