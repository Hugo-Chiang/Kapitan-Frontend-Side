import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/pages/Home';
import Store from '@/components/pages/Store';
import Project from '@/components/pages/Project';
import Cart from '@/components/pages/Cart';
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
      path: '/Store/Projects/:selectedProjectId',
      name: '方案',
      component: Project
    },
    {
      path: '/Cart',
      name: '購物車',
      component: Cart
    },
    {
      path: '/Member-Centre',
      name: '會員中心',
      component: MemberCentre
    }
  ]
})
