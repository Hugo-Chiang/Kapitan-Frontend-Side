<template>
  <!-- 管理系統背景開始 -->
  <div class="backgroud">
    <div class="container">
      <!-- 管理系統介面開始 -->
      <div class="d-flex flex-row dashboard">
        <!-- 介面側邊欄開始 -->
        <aside class="side-bar">
          <!-- 管理員大頭貼開始 -->
          <div class="admin-avatar-block">
            <div class="admin-avatar">
              <img :src="adminInfo.avatarUrl" alt="" />
            </div>
          </div>
          <!-- 管理員大頭貼開始結束 -->
          <!-- 問候語開始 -->
          <h6 class="text-center mb-5">您好，{{ adminInfo.name }}！</h6>
          <!-- 問候語結束 -->
          <!-- 側邊欄管理項目開始 -->
          <ul>
            <li
              class="d-flex"
              :class="currentPage == manager.name ? 'current-page' : ''"
              v-for="(manager, index) in managers"
              :key="index"
              @click.prevent="switchPage(manager.name)"
            >
              <div class="icon-block inline-block d-flex align-items-center">
                <i class="fas" :class="manager.icon"></i>
              </div>
              <div class="inline-block">
                {{ manager.name }}
              </div>
            </li>
          </ul>
          <!-- 側邊欄管理項目開始結束 -->
          <div class="text-center mb-1">
            甲必丹管理系統<span class="ml-2">v1.0</span>
          </div>
          <div class="text-center">© 2035 Kapitan</div>
        </aside>
        <!-- 介面側邊欄結束 -->
        <!-- 介面主要內容開始 -->
        <main class="main-content">
          <div
            class="card-header d-flex flex-row justify-content-between align-items-center"
          >
            <h5>{{ currentPage }}</h5>
            <button class="btn btn-danger" @click.prevent="signOut">
              登出
            </button>
          </div>
          <div class="card-body">
            <!-- 項目切換內容開始 -->
            <router-view></router-view>
            <!-- 項目切換內容結束 -->
          </div>
        </main>
        <!-- 介面主要內容結束 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: "歡迎使用",
      adminInfo: {
        name: "",
        avatarUrl: "",
      },
      managers: {
        ordersManger: { name: "訂單管理", icon: "fa-tasks" },
        projectsManger: { name: "方案管理", icon: "fa-ship" },
        membersManger: { name: "會員管理", icon: "fa-users-cog" },
      },
    };
  },
  created() {
    // 執行：根據 session 向後端詢問管理員的個資，以便做個性化渲染
    const api = `${process.env.LOCAL_HOST_PATH}/API/Backstage/AdminInfo.php`;
    const vm = this;
    const session = vm.getKapitanSession();

    this.$http.post(api, session).then((response) => {
      vm.adminInfo.name = response.data.adminName;
      vm.adminInfo.avatarUrl = response.data.adminAvatarUrl;
    });
  },
  methods: {
    // 方法：登出，清除 cookie 中的 session 並回到登入頁
    signOut() {
      document.cookie = `kapitanSession= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
      setTimeout(() => {
        this.$router.push({ name: "管理系統：登入頁" });
      }, 1000);
    },
    // 方法：抓取存在 cookie 中的 session
    getKapitanSession() {
      let cookie = document.cookie;
      let strArr = cookie.split("");
      let equalSymbolIndex = strArr.indexOf("=");
      let cookieLen = cookie.length;
      let namePulsSymbolLen = equalSymbolIndex + 2;
      let sessionLen = cookieLen - namePulsSymbolLen - 1;
      let session = cookie.substr(namePulsSymbolLen, sessionLen);

      return session;
    },
    // 方法：根據傳入的頁面名稱切換頁面
    switchPage(pageName) {
      this.currentPage = pageName;
      this.$router.push({ name: "管理系統：" + pageName });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/all.scss";

.backgroud {
  height: 100vh;
  background-image: url("../../../assets/img/backstage/dashboard-backgroud.jpg");
  opacity: 0.95;
  .container {
    padding-top: 100px;
  }
  .dashboard {
    height: 600px;
    .side-bar {
      width: 20%;
      height: 100%;
      background-color: #1c4e80;
      border-radius: calc(0.25rem - 0.5px) 0 0 calc(0.25rem - 1px);
      padding: 40px 10px 0px;
      color: #f1f1f1;
      .admin-avatar-block {
        width: 130px;
        height: 130px;
        border-radius: 130px;
        background-color: lightblue;
        margin: auto;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .admin-avatar {
          width: 120px;
          height: 120px;
          border-radius: 120px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
      }
      h6 {
        color: #a5d8dd;
      }
      ul {
        padding: 0;
        margin-bottom: 120px;
        li {
          width: 120px;
          margin: auto;
          margin-bottom: 15px;
          list-style: none;
          cursor: pointer;
          font-size: 20px;
          .icon-block {
            width: 30px;
          }
        }
      }
      li:hover {
        color: lightblue;
      }
      div {
        span {
          font-size: 12px;
        }
      }
      .current-page {
        color: orange;
      }
    }
    .main-content {
      width: 80%;
      height: 100%;
      background-color: #f1f1f1;
      border-radius: 0 calc(0.25rem - 0.5px) calc(0.25rem - 1px) 0;
      .card-header {
        background: #7e909a;
        border-radius: 0 calc(0.25rem - 1px) 0 0 !important;
        h5 {
          color: oldlace;
        }
      }
    }
  }
}
</style>