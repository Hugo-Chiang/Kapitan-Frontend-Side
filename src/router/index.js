import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/pages/Home';
import Store from '@/components/pages/Store';
import Project from '@/components/pages/Project';
import Cart from '@/components/pages/Cart';
import Checkout from '@/components/pages/Checkout';
import MemberCentre from '@/components/pages/MemberCentre';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '首頁',
      component: Home
    },
    {
      path: '/Store',
      name: '商城',
      component: Store
    },
    {
      path: '/Store/Projects/:selectedProjectID',
      name: '方案',
      component: Project,
    },
    {
      path: '/Cart',
      name: '購物車',
      component: Cart,
      children: [{
        path: '/Cart/Checkout',
        name: '結帳',
        component: Checkout
      }]
    },
    {
      path: '/Member-Centre',
      name: '會員中心',
      component: MemberCentre
    },
  ]
})
