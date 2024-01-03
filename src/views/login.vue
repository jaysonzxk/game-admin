<template>
  <div class="login">
    <div class="lang">
      <el-dropdown trigger="click" @command="changeLanguage">
        <span class="el-dropdown-link lang-icon" style="padding: 10px 10px; color: black; font-weight: 700;">
          <img :src="language.icon" alt="" class="icon">
          {{ language.title }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in languageList" :key="index" :command="index" class="lang-icon">
            <img :src="item.icon" alt="" class="icon">
            {{ item.title }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">{{ title }}</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
          @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <!-- <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" class="login-code-img" @click="getCode">
        </div>
      </el-form-item> -->
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
          @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2021 django-vue-admin.com All Rights Reserved.</span> |
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"> 晋ICP备18005113号-3</a>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/admin/login";
import Cookies from "js-cookie";
import { decrypt, encrypt } from "@/utils/jsencrypt";
import md5 from 'js-md5';

export default {
  name: "Login",
  data() {
    return {
      title: process.env.VUE_APP_TITLE || "管理系统",
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: undefined,
        password: undefined,
        rememberMe: false,
        code: "1",
        uuid: ""
      },
      language:{
        value: 'ZH-CN',
        title: '简体中文',
        icon: require('../assets/images/cn.png')
      },
      languageList: [
        {
          value: 'ZH-CN',
          title: '简体中文',
          icon: require('../assets/images/cn.png')
        },
        {
          value: 'EN-US',
          title: 'English',
          icon: require('../assets/images/en.png')
        },
        {
          value: 'VI',
          title: 'Tiếng Việt',
          icon: require('../assets/images/vi.png')
        },
        {
          value: 'KO',
          title: '한국인',
          icon: require('../assets/images/ko.png')
        },
        {
          value: 'JA',
          title: '日本語',
          icon: require('../assets/images/ja.png')
        },
        {
          value: 'MN',
          title: 'Melayu',
          icon: require('../assets/images/mn.png')
        },
        {
          value: 'ID',
          title: 'bahasa Indonesia',
          icon: require('../assets/images/id.png')
        },
        {
          value: 'TH',
          title: 'แบบไทย',
          icon: require('../assets/images/th.png')
        }
      ],
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    changeLanguage(index){
      this.language = this.languageList[index];
      switch (this.language.value) {
        case "ZH-TW":
          this.$i18n.locale = "tw";
          break;
        case "EN-US":
          this.$i18n.locale = "en";
          break;
        case "ZH-CN":
          this.$i18n.locale = "cn";
          break;
        case "VI":
          this.$i18n.locale = "vi";
          break;
        case "KO":
          this.$i18n.locale = "ko";
          break;
        case "JA":
          this.$i18n.locale = "ja";
          break;
        case "ID":
          this.$i18n.locale = "id";
          break;
        case "MN":
          this.$i18n.locale = "mn";
          break;
        case "TH":
          this.$i18n.locale = "th";
          break;
      }
    },
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = res.data.image_url ? process.env.VUE_APP_BASE_API + res.data.image_url : require("@/assets/images/profile.jpg");
        this.loginForm.uuid = res.data.key;
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set("rememberMe", this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          let loginData = {
            username: this.loginForm.username,
            password: md5(this.loginForm.password)
          }
          this.$store.dispatch("Login", loginData).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(() => { });
          }).catch(() => {
            this.loading = false;
            this.getCode();
          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 38px;
}
.lang-icon{
  display: flex;
  align-items: center;
}
.lang{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
  background: #fff;
  border-radius: 3px;
  height: 30px;
}
.icon{
  // display: flex;
  // align-items: center;
  width: 20px;
  height: 20px;
}
</style>
