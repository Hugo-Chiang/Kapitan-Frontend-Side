import Vue from 'vue';
import Router from 'vue-router';
import Store from '@/components/pages/Store';
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/store',
      name: '商城',
      component: Store
    }
  ]
})
