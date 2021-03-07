import Vue from 'vue';
import Router from 'vue-router';
import Forestage from '@/components/Forestage'
import Home from '@/components/pages/Home';
import About from '@/components/pages/About';
import Store from '@/components/pages/Store';
import Project from '@/components/pages/Project';
import Cart from '@/components/pages/Cart';
import Checkout from '@/components/pages/Checkout';
import MemberCentre from '@/components/pages/MemberCentre';
import Backstage from '@/components/Backstage';
import BackstageSingIn from '@/components/pages/admin/BackstageSingIn';
import Dashboard from '@/components/pages/admin/Dashboard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Forestage,
      children: [
        {
          path: '',
          name: '首頁',
          component: Home
        },
        {
          path: '/About',
          name: '關於甲必丹',
          component: About
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
    }, {
      path: '/Admin',
      component: Backstage,
      children: [
        {
          path: '/Admin/SignIn',
          name: '管理系統：登入頁',
          component: BackstageSingIn
        },
        {
          path: '/Admin',
          name: '管理系統：首頁',
          component: Dashboard,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
