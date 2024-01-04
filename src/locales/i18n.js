import Vue from "vue";
import VueI18n from "vue-i18n";

//element 国际化处理
import locale from "element-ui/lib/locale";
import elEn from "element-ui/lib/locale/lang/en";
import elZh from "element-ui/lib/locale/lang/zh-CN";
import elVi from "element-ui/lib/locale/lang/vi";  // 越南
import elKo from "element-ui/lib/locale/lang/ko";  // 韩国
import elTh from "element-ui/lib/locale/lang/th";  // 泰语
import elId from "element-ui/lib/locale/lang/id";  // 印尼
import elJa from "element-ui/lib/locale/lang/ja";  // 日本
import elMn from "element-ui/lib/locale/lang/mn";  // 马来


Vue.use(VueI18n);

//将刚刚locales创建的文件分别引入并输出成i18n需要的格式
function loadLocaleMessages() {
  //检测locales文件夹中有多少个语系
  const locales = require.context(
    "../locales",
    true,
    /.json$/
  );
  const messages = {};
  locales.keys().forEach(file => {
    const keyArr = file.split('/');
    keyArr.shift();
    messages[keyArr.join('.').replace(/\.json$/g, '')] = locales(file);
  });
  return {
    zh: { ...messages.zh, ...elZh },
    en: { ...messages.en, ...elEn },
    vi: { ...messages.vi, ...elVi},
    ko: { ...messages.ko, ...elKo },
    th: { ...messages.th, ...elTh },
    id: { ...messages.id, ...elId },
    ja: { ...messages.ja, ...elJa },
    mn: { ...messages.mn, ...elMn }
  };
}
const i18n = new VueI18n({
  locale: localStorage.getItem('lang')||"zh" ,
  messages: loadLocaleMessages()
});
locale.i18n((key, value) => i18n.t(key, value));

export default i18n;