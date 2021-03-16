import axios from 'axios';
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
import OrdersManager from '@/components/pages/admin/OrdersManager';
import OrderDetails from '@/components/pages/admin/OrderDetails';
import ProjectsManager from '@/components/pages/admin/ProjectsManager';
import MembersManager from '@/components/pages/admin/MembersManager';

Vue.use(Router);

// 建立 router 實體，並定義各路由內容
const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
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
          name: '挑選航程',
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
          meta: { requiresAuth: true },
          children: [
            {
              path: '/Admin/Orders-Manager',
              name: '管理系統：訂單管理',
              component: OrdersManager,
              meta: { requiresAuth: true }
            },
            {
              path: '/Admin/Orders-Manager/Order-Details',
              name: '管理系統：訂單細節清單',
              component: OrderDetails,
              meta: { requiresAuth: true }
            }, {
              path: '/Admin/Projects-Manager',
              name: '管理系統：方案管理',
              component: ProjectsManager,
              meta: { requiresAuth: true }
            }, {
              path: '/Admin/Members-Manager',
              name: '管理系統：會員管理',
              component: MembersManager,
              meta: { requiresAuth: true }
            }
          ]
        }
      ]
    }
  ]
})

// 使用全局前置守衛，建立登入驗證機制
router.beforeEach((to, from, next) => {
  const api = `${process.env.REMOTE_HOST_PATH}/API/Backstage/AdminSignInAuthentication.php`;
  // const api = `${process.env.LOCAL_HOST_PATH}/API/Backstage/AdminSignInAuthentication.php`;
  const session = getKapitanSession();

  if (to.meta.requiresAuth) {

    axios.post(api, session).then((response) => {
      if (response.data.sessionCheck) next();
      else next({ name: '管理系統：登入頁', });
    }).catch((response) => {
      console.log(response);
    })
  } else {

    // 在有登入狀況下進入登入頁，將自動被導回首頁
    if (to.path == '/Admin/SignIn') {
      axios.post(api, session).then((response) => {
        if (response.data.sessionCheck) {
          alert('你已登入。系統將引導您回首頁。');
          setTimeout(() => {
            router.push({ name: '管理系統：首頁', });
          }, 500);
        }
      }).catch((response) => {
        console.log(response);
      });
    }

    next();
  }
});

// 函式：抓取存在 cookie 中的 session
function getKapitanSession() {
  let cookie = document.cookie;
  let strArr = cookie.split('');
  let equalSymbolIndex = strArr.indexOf('=');
  let cookieLen = cookie.length;
  let namePulsSymbolLen = equalSymbolIndex + 2;
  let sessionLen = cookieLen - namePulsSymbolLen - 1;
  let session = cookie.substr(namePulsSymbolLen, sessionLen);

  return session;
}

export default router;
