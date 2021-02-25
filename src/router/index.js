import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/pages/Home';
import Store from '@/components/pages/Store';
import Project from '@/components/pages/Project';

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
    },
    {
      path: '/project/:selectedProjectId',
      name: '方案',
      component: Project
    }
  ]
})
