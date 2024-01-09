<template>
  <div>
    <div>
      <audio ref="audio">
        <source src="../../assets/mp3/chongzhi.mp3" autoplay ref="au" type="audio/mp3" />
      </audio>
    </div>
    <div class="navbar">

      <div>
        <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
          @toggleClick="toggleSideBar" />

        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
      </div>
      <div class="center">
        <span style="font-size: 14px; font-weight: 600;">待处理充值订单: <i style="color: #eb3323; font-weight: 700;">{{ recharge
        }}</i></span>
        <span style="font-size: 14px; font-weight: 600;">待处理提现订单: <i style="color: #eb3323; font-weight: 700;">{{ withdraw
        }}</i></span>
      </div>

      <div class="right-menu">
        <template v-if="device !== 'mobile'">
          <div class="right-menu-item hover-effect">
            <router-link to="/user/msg">
              <i class="el-icon-message-solid badge-item-icon" />
              <el-badge v-if="unread_msg_count" :value="unread_msg_count" :max="99" style="margin-left: -4px;" />
            </router-link>
          </div>
          <!-- <search id="header-search" class="right-menu-item" />
        <el-tooltip content="源码地址" effect="dark" placement="bottom">
          <ruo-yi-git id="ruoyi-git" class="right-menu-item hover-effect" />
        </el-tooltip> -->

          <!-- <el-tooltip content="文档地址" effect="dark" placement="bottom">
          <ruo-yi-doc id="ruoyi-doc" class="right-menu-item hover-effect" />
        </el-tooltip> -->

          <screenfull id="screenfull" class="right-menu-item hover-effect" />

          <!-- <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->
        </template>

        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar" class="user-avatar">
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/user/profile">
              <el-dropdown-item>{{ $t('navBar.personalCentre') }}</el-dropdown-item>
            </router-link>
            <!-- <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item> -->
            <el-dropdown-item divided @click.native="logout">
              <span>{{ $t('navBar.logout') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import RuoYiGit from "@/components/RuoYi/Git";
import RuoYiDoc from "@/components/RuoYi/Doc";
import store from "@/store";
import i18n from '@/locales/i18n'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc
  },
  data() {
    return {
      mp3List: [
        {name: 'chongzhi', mp3: require('../../assets/mp3/chongzhi.mp3')},
        {name: 'tixian', mp3: require('../../assets/mp3/tixian1.mp3')},
      ],
      timer: null,
      count: store.unread_msg_count,
      withdraw: 122,
      recharge: 2312
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device", "unread_msg_count"]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val
        });
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$confirm(this.$t('logout.tip1'), this.$t('logout.tip2'), {
        confirmButtonText: this.$t('logout.confirm'),
        cancelButtonText: this.$t('logout.cancel'),
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          location.href = "/index";
        });
      });
    }
  },
  mounted() {
    // this.timer = setInterval(this.audio, 1000)
    setInterval(() => {
      this.$refs.audio.play();
    }, 5000);

  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  // position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .center {
    display: flex;

    span {
      margin: 0 5px;
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    .badge-item {
      height: 70px;
      width: 30px;
      line-height: 40px;
      text-align: center;
      margin-right: 5px;

      .badge-item-icon {
        width: 18px;
        color: #5a5e66;
        height: 18px;
      }
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}</style>
