import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/pages/Home';
import Store from '@/components/pages/Store';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '首頁',
      component: Home
    },
    {
      path: '/store',
      name: '商城',
      component: Store
    }
  ]
})
