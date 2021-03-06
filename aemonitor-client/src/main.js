import './assets/properties';
import Vue from 'vue'
import App from './App.vue'
import '../semantic/dist/semantic.min';
import '../semantic/dist/semantic.css';
import '../src/assets/aemonitor.css';
import router from './router/router';
import GlobalMixin from './mixins/global-mixin';
import 'chartjs-plugin-labels';
import store from './store/index';

Vue.config.productionTip = false;
Vue.mixin(GlobalMixin);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');

Chart.defaults.global.plugins.labels = [
  {
    fontColor: '#ffffff',
    showZero: false,
    precision: 2,
  }
];