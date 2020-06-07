import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Toast from 'muse-ui-toast';
import NProgress from 'muse-ui-progress';
import 'muse-ui-progress/dist/muse-ui-progress.css';
import loading from "./utils/loading";
import moment from "moment";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

import hljs from 'highlight.js';
import 'highlight.js/styles/darcula.css'
// import 'highlight.js/styles/hopscotch.css'


import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  setTimeout(() =>{
    blocks.forEach((block)=>{
      hljs.highlightBlock(block)
    })
  }, 1)
});

import './assets/icons/iconfont.css'
import './assets/css/global.scss'


Vue.use(mavonEditor)
Vue.use(MuseUI);
Vue.use(Toast);
Vue.use(NProgress, loading);
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment

var _hmt = _hmt || [];
window._hmt = _hmt;
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?223aa7101e93b8f10a5257202488e514";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
