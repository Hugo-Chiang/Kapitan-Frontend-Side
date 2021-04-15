import axios from 'axios';
import Vue from 'vue';
import GlobalVariables from '@/library/variables.vue';
import Router from 'vue-router';
import Forestage from '@/components/Forestage'
import Home from '@/components/pages/Home';
import Store from '@/components/pages/Store';
import Project from '@/components/pages/Project';
import Cart from '@/components/pages/Cart';
import Checkout from '@/components/pages/Checkout';
import MemberCentre from '@/components/pages/MemberCentre';
import ForestageLogin from '@/components/pages/ForestageLogin';
import Backstage from '@/components/Backstage';
import BackstageLogin from '@/components/pages/admin/BackstageLogin';
import Dashboard from '@/components/pages/admin/Dashboard';
import ChooseModeEntry from '@/components/pages/admin/ChooseModeEntry';
import OrdersSearching from '@/components/pages/admin/OrdersSearching';
import OrderEditor from '@/components/pages/admin/OrderEditor';
import OrderDetailEditor from '@/components/pages/admin/OrderDetailEditor';
import ProjectsSearching from '@/components/pages/admin/ProjectsSearching';
import ProjectEditor from '@/components/pages/admin/ProjectEditor';
import MembersSearching from '@/components/pages/admin/MembersSearching';
import MemberEditor from '@/components/pages/admin/MemberEditor';

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
            name: '進行結帳',
            component: Checkout,
            meta: { requiresAuth: true }
          }]
        },
        {
          path: '/Member-Centre',
          name: '會員中心',
          component: MemberCentre,
          meta: { requiresAuth: true }
        },
        {
          path: '/Login',
          name: '登入註冊',
          component: ForestageLogin,
        },
      ]
    }, {
      path: '/Admin',
      component: Backstage,
      children: [
        {
          path: '/Admin/Login',
          name: '管理系統：登入頁',
          component: BackstageLogin
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
              component: ChooseModeEntry,
              meta: { requiresAuth: true },
              children: [
                {
                  path: '/Admin/Orders-Manager/Order-Creation',
                  name: '管理系統：新增訂單',
                  component: OrderEditor,
                  meta: { requiresAuth: true }
                },
                {
                  path: '/Admin/Orders-Manager/Order-Creation/Order-Details-Creation',
                  name: '管理系統：新增細項',
                  component: OrderDetailEditor,
                  meta: { requiresAuth: true }
                },
                {
                  path: '/Admin/Orders-Manager/Orders-Searching',
                  name: '管理系統：查詢訂單',
                  component: OrdersSearching,
                  meta: { requiresAuth: true }
                },
                {
                  path: '/Admin/Orders-Manager/Orders-Searching/Order-Editor',
                  name: '管理系統：編輯訂單',
                  component: OrderEditor,
                  meta: { requiresAuth: true }
                },
                {
                  path: '/Admin/Orders-Manager/Order-Editor/Order-Detail-Editor',
                  name: '管理系統：編輯細項',
                  component: OrderDetailEditor,
                  meta: { requiresAuth: true }
                },
                {
                  path: '/Admin/Orders-Manager/Order-Editor/Order-Details-Creation',
                  name: '管理系統：新增細項',
                  component: OrderDetailEditor,
                  meta: { requiresAuth: true }
                },
              ]
            },
            {
              path: '/Admin/Projects-Manager',
              name: '管理系統：方案管理',
              component: ChooseModeEntry,
              meta: { requiresAuth: true },
              children: [
                {
                  path: '/Admin/Projects-Manager/Project-Creation',
                  name: '管理系統：新增方案',
                  component: ProjectEditor,
                  meta: { requiresAuth: true }
                },
                {
                  path: '/Admin/Projects-Manager/Projects-Searching/',
                  name: '管理系統：查詢方案',
                  component: ProjectsSearching,
                  meta: { requiresAuth: true },
                },
                {
                  path: '/Admin/Projects-Manager/Project-Editor',
                  name: '管理系統：編輯方案',
                  component: ProjectEditor,
                  meta: { requiresAuth: true }
                }
              ]
            },
            {
              path: '/Admin/Members-Manager',
              name: '管理系統：會員管理',
              component: ChooseModeEntry,
              meta: { requiresAuth: true },
              children: [
                {
                  path: '/Admin/Members-Manager/Member-Creation',
                  name: '管理系統：新增會員',
                  component: MemberEditor,
                  meta: { requiresAuth: true }
                },
                {
                  path: '/Admin/Members-Manager/Members-Searching/',
                  name: '管理系統：查詢會員',
                  component: MembersSearching,
                  meta: { requiresAuth: true },
                },
                {
                  path: '/Admin/Members-Manager/Member-Editor',
                  name: '管理系統：編輯會員',
                  component: MemberEditor,
                  meta: { requiresAuth: true }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

// 使用全局前置守衛，建立登入驗證機制
router.beforeEach((to, from, next) => {
  const membersSignInAuthAPI = `${process.env.REMOTE_HOST_PATH}/API/Forestage/SignInAuthentication.php`;
  const adminSignInAuthAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/AdminSignInAuthentication.php`;
  const toBackstage = to.path.indexOf('Admin') != -1;

  if (to.meta.requiresAuth) {

    // 判斷所前往頁面是前台還後台，會有不同的應對
    if (toBackstage) {

      let adminSession = getKapitanSession('backstage');

      axios.post(adminSignInAuthAPI, adminSession).then((response) => {
        if (response.data.sessionCheck) {
          next();
        }
        else {
          localStorage.setItem('BackstageBlockBefore', to.path)
          alert("您的登入驗證已失效。請再登入一次，謝謝！");
          next({ name: '管理系統：登入頁' });
        }
      }).catch((error) => {
        console.log(error);
        next(from);
      })
    } else {

      let membersSession = getKapitanSession('forestage');
      let sendingObj = {
        session: membersSession,
      };

      axios.post(membersSignInAuthAPI, JSON.stringify(sendingObj)).then((response) => {
        if (response.data.sessionCheck) {
          next();
        } else {
          localStorage.setItem('ForestageBlockBefore', to.path)
          next({ name: '登入註冊' });
        }
      }).catch((error) => {
        console.log(error);
        next(from);
      })

      // 判斷所前往是不是結帳頁或方案頁，會有不同的應對
      if (to.path.indexOf('Checkout') != -1) {
        if (localStorage.getItem("savingProjects") != null) next();
        else setTimeout(() => {
          router.push({ name: '首頁', });
        }, 500);
      } else {
        next();
      }
    }
  } else {

    // 無論前後台，在有登入狀況下進入登入頁，都將被導回各自的首頁
    if (toBackstage) {
      let adminSession = getKapitanSession('backstage');

      if (to.path == '/Admin/SignIn') {
        axios.post(adminSignInAuthAPI, adminSession).then((response) => {
          if (response.data.sessionCheck) {
            alert('你已登入。系統將引導您回首頁。');
            setTimeout(() => {
              router.push({ name: '管理系統：首頁', });
            }, 500);
          }
        }).catch((error) => {
          console.log(error);
          next(from);
        });
      }
    } else {

      // 若已登入，再次進登入頁將會被請回首頁
      if (to.path == '/Login') {
        let membersSession = getKapitanSession('forestage');
        let sendingObj = {
          session: membersSession,
        };

        axios.post(membersSignInAuthAPI, JSON.stringify(sendingObj)).then((response) => {
          if (response.data.sessionCheck) {
            alert('你已登入。系統將引導您回首頁。');
            setTimeout(() => {
              router.push({ name: '首頁', });
            }, 500);
          }
        }).catch((error) => {
          console.log(error);
          next(from);
        });
        // 若嘗試進入未開放的方案頁，將被阻擋
      } else if (to.path.indexOf('Projects') != -1) {
        let api = `${process.env.REMOTE_HOST_PATH}/API/Forestage/QueryProjectVisible.php`;
        let projectID = '';
        let startIndex = to.path.indexOf('PJ');
        projectID = to.path.substr(startIndex);

        axios.post(api, projectID).then((response) => {
          if (response.data == 1) {
            next();
          } else {
            next(from);
          }
        }).catch((error) => {
          console.log(error);
          next(from);
        })
      }
    }

    // 無須驗證亦無特殊情境則放行
    next();
  }
});

// 函式：抓取存在 cookie 中的 session（通用）
function getKapitanSession(sessionUseAtStr) {

  let cookie = document.cookie;
  let startIndex = 0;
  let keyLength = 0;
  let forestageKey = 'kapitanMembersSession="';
  let backstageKey = 'kapitanAdminSession="';

  switch (sessionUseAtStr) {
    case 'forestage':
      startIndex = cookie.indexOf(forestageKey);
      keyLength = forestageKey.length;
      break;
    case 'backstage':
      startIndex = cookie.indexOf(backstageKey);
      keyLength = backstageKey.length;
      break;
  }

  let rawSession = cookie.substring(startIndex + keyLength);
  let endIndex = rawSession.indexOf('"');
  let session = rawSession.substring(0, endIndex)

  return session;
}

export default router;