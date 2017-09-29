import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import store from './store/main'
import './assets/fontaw.less'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './assets/common.css'
import {RESOURCE_SELECT_URL,SECOND_MENU_SHOW} from './store/mutation-types'

NProgress.configure({ease: 'ease', speed: 1000, showSpinner: false});

router.beforeEach((to, from, next) => {
  store.commit(RESOURCE_SELECT_URL, to.path)
  store.commit(SECOND_MENU_SHOW, true)
  NProgress.start();
  next();
});

router.afterEach((to, from, next) => {
  NProgress.done();
});

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
