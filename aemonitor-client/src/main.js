import './assets/properties';
import Vue from 'vue'
import App from './App.vue'
import '../semantic/dist/semantic.min';
import '../semantic/dist/semantic.css';
import '../src/assets/aemonitor.css';
import router from './router/router';
import GlobalMixin from './mixins/global-mixin';

Vue.config.productionTip = false;
Vue.mixin(GlobalMixin);
new Vue({
  render: h => h(App),
  router,
}).$mount('#app');