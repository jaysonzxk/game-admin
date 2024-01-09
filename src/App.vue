<template>
  <div id="app">
   
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
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      
      language:{
        value: navigator.language,
        title: '简体中文',
        icon: require('./assets/images/cn.png')
      },
      languageList: [
        {
          value: 'zh-CN',
          title: '简体中文',
          icon: require('./assets/images/cn.png')
        },
        {
          value: 'en-US',
          title: 'English',
          icon: require('./assets/images/en.png')
        },
        {
          value: 'VI',
          title: 'Tiếng Việt',
          icon: require('./assets/images/vi.png')
        },
        {
          value: 'KO',
          title: '한국인',
          icon: require('./assets/images/ko.png')
        },
        {
          value: 'JA',
          title: '日本語',
          icon: require('./assets/images/ja.png')
        },
        {
          value: 'MN',
          title: 'Melayu',
          icon: require('./assets/images/mn.png')
        },
        {
          value: 'ID',
          title: 'bahasa Indonesia',
          icon: require('./assets/images/id.png')
        },
        {
          value: 'TH',
          title: 'แบบไทย',
          icon: require('./assets/images/th.png')
        }
      ],
    }
    
  },
  computed: {
  },
  methods: {
    changeLanguage(index){
      this.language = this.languageList[index];
      switch (this.language.value) {
        case "en-US":
          this.$i18n.locale = "en";
          localStorage.setItem('lang', 'en');
          break;
        case "zh-CN":
          this.$i18n.locale = "zh";
          localStorage.setItem('lang', 'zh');
          break;
        case "VI":
          this.$i18n.locale = "vi";
          localStorage.setItem('lang', 'vi');
          break;
        case "KO":
          this.$i18n.locale = "ko";
          localStorage.setItem('lang', 'ko');
          break;
        case "JA":
          this.$i18n.locale = "ja";
          localStorage.setItem('lang', 'ja');
          break;
        case "ID":
          this.$i18n.locale = "id";
          localStorage.setItem('lang', 'id');
          break;
        case "MN":
          this.$i18n.locale = "mn";
          localStorage.setItem('lang', 'mn');
          break;
        case "TH":
          this.$i18n.locale = "th";
          localStorage.setItem('lang', 'th');
          break;
      }
    },
  },
  
};
</script>
<style lang="scss">
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
