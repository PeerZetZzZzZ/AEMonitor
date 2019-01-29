import Vue from 'vue';
import Router from 'vue-router';
import MainView from '../components/main/MainView';
import CoreView from '../components/core/CoreView';
import TransactionsView from '../components/transactions/TransactionsView';
import TransactionView from '../components/transaction/TransactionView';
import TokenView from '../components/token/TokenView';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainView',
      component: MainView,
    },
    {
      path: '/core',
      name: 'CoreView',
      component: CoreView,
    },
    {
      path: '/transactions',
      name: 'TransactionsView',
      component: TransactionsView,
    },
    {
      path: '/transaction/:networkId/:transactionHash',
      name: 'TransactionView',
      component: TransactionView,
    },
    {
      path: '/token',
      name: 'TokenView',
      component: TokenView,
    },
  ]
});
export default router;