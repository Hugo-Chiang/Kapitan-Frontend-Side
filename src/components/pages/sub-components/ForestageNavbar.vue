<template>
  <!-- 導覽列開始 -->
  <nav id="nav-bar-container" class="position-fixed">
    <!-- （桌面版）導覽列開始 -->
    <div class="backgroud d-flex w-100 position-fixed">
      <div
        id="nav-bar"
        class="nav-bar container d-flex justify-content-center position-relative"
      >
        <!-- （行動版）漢堡選單按鈕開始 -->
        <div id="hamburger-menu" class="position-absolute align-self-center">
          <input
            type="checkbox"
            class="d-block position-absolute"
            v-model="hamburgerButtonToggle"
          />
          <span
            v-for="(span, index) in 3"
            :key="'span' + index"
            class="d-block position-relative"
          ></span>
        </div>
        <!-- （行動版）漢堡選單按鈕結束 -->
        <!-- （桌面版）導覽列項目開始 -->
        <ul id="navbar-list" :class="navbarListClass">
          <li
            :id="navbarLink.ItemID"
            v-for="(navbarLink, navbarLinkKey) in returnNavbarLinks"
            :key="navbarLinkKey"
          >
            <!-- 登出連結開始 -->
            <a
              v-if="navbarLink.ItemID == 'sign-out-link' && loginData.login"
              :id="navbarLink.ItemID"
              :class="navbarLinks.signOut.selfClass"
              @click.prevent="signOut"
              >立即登出
            </a>
            <!-- 登出連結結束 -->
            <!-- 路由連結開始 -->
            <router-link
              v-if="navbarLink.ItemID != 'sign-out-link'"
              :id="navbarLink.ItemID"
              :class="[
                navbarLink.selfClass,
                {
                  'current-link':
                    currentPath.indexOf(navbarLink.path) != -1 ? true : false,
                },
              ]"
              :to="navbarLink.routerTo"
            >
              <!-- 假設項目為商標（首頁）連結，則會出現商標圖示 -->
              <img
                v-if="navbarLink.ItemID == 'logo-link'"
                id="logo-img"
                src="../../../assets/img/Kapitan-Logo-Horizontal-Version-01.png"
                alt=""
              />
              <!-- 假設項目是文字連結，則顯示外顯文字 -->
              <span v-if="navbarLink.selfClass.includes('text-link')">{{
                navbarLink.selfText
              }}</span>
              <!-- 假設項目是 icon 連結，則顯示 icon -->
              <i
                v-if="navbarLink.selfClass.includes('icon-link')"
                :class="navbarLink.iconClass"
              ></i>
              <!-- 假設項目是購物車，且內容物非空，則生成項目提示 -->
              <div
                id="cart-items-remark"
                v-if="navbarLink.ItemID == 'cart-link' && cartItemsNum > 0"
                class="position-absolute"
              ></div>
            </router-link>
            <!-- 路由連結結束 -->
          </li>
        </ul>
        <!-- （桌面版）導覽列項目結束 -->
      </div>
    </div>
    <!-- （桌面版）導覽列結束 -->
    <!-- （行動版）漢堡選單項目開始 -->
    <ul
      id="hamburger-menu-list"
      class="position-fixed"
      :class="{ 'show-hamburger-menu-list': hamburgerButtonToggle }"
    >
      <li
        v-for="(burgerMenuLink, burgerMenuLinkKey) in returnBurgerMenuLinks"
        :key="burgerMenuLinkKey"
      >
        <!-- 登出連結開始 -->
        <a
          v-if="burgerMenuLink.ItemID == 'sign-out-link' && loginData.login"
          :id="burgerMenuLink.ItemID"
          class="hamburger-menu-link nav-link"
          :class="{
            'current-hamburger-menu-link':
              burgerMenuLink.path == currentPath ? true : false,
          }"
          @click.prevent="signOut"
          >立即登出
        </a>
        <!-- 登出連結結束 -->
        <!-- 路由連結開始 -->
        <router-link
          v-if="burgerMenuLink.ItemID != 'sign-out-link'"
          :to="burgerMenuLink.routerTo"
          class="hamburger-menu-link nav-link"
          :class="{
            'current-hamburger-menu-link':
              burgerMenuLink.path == currentPath ? true : false,
          }"
          @click.native="collapseHamburgerList"
          >{{ burgerMenuLink.selfText }}</router-link
        >
        <!-- 路由連結結束 -->
      </li>
    </ul>
    <!-- （行動版）漢堡選單項目結束 -->
  </nav>
  <!-- 導覽列結束 -->
</template>

<script>
export default {
  data() {
    return {
      navbarListClass: [
        "navbar-nav",
        "justify-self-center",
        "align-self-center",
        "w-100",
        "p-0",
        "flex-row",
        "align-items-center",
        "position-relative",
      ],
      navbarLinks: {
        // 導覽列連結：商標（首頁）圖示
        logo: {
          path: "/",
          ItemID: "logo-link",
          selfClass: ["mr-2"],
          routerTo: "/",
          imgSrc: "../../../assets/img/logo.png",
        },
        // 導覽列連結：登錄頁連結
        signIn: {
          path: "/Login",
          ItemID: "sign-in-link",
          selfClass: [
            "nav-link",
            "text-link",
            "nav-link",
            "ml-md-auto",
            "ml-3",
            "mr-4",
          ],
          routerTo: "/Login",
          selfText: "登入註冊",
        },
        // 導覽列連結：登出連結
        signOut: {
          ItemID: "sign-out-link",
          selfClass: [
            "nav-link",
            "text-link",
            "nav-link",
            "ml-md-auto",
            "ml-3",
            "mr-4",
          ],
          selfText: "立即登出",
          routerTo: "",
        },
        // 導覽列連結：商品（方案）頁
        store: {
          path: "/Store",
          ItemID: "store-link",
          selfClass: ["nav-link", "text-link", "nav-link", "mr-4"],
          routerTo: "/Store",
          selfText: "挑選航程",
        },
        cart: {
          path: "/Cart",
          ItemID: "cart-link",
          selfClass: [
            "nav-link",
            "icon-link",
            "ml-2",
            "mr-sm-4",
            "mr-3",
            "position-relative",
          ],
          routerTo: "/Cart",
          iconClass: ["fas", "fa-shopping-cart", "fa-lg"],
        },
        // 導覽列連結：會員中心 icon
        memberCentre: {
          path: "/Member-Centre",
          ItemID: "memberCentre-link",
          selfClass: ["nav-link", "icon-link"],
          routerTo: "/Member-Centre",
          iconClass: ["fas", "fa-user", "fa-lg"],
        },
      },
      cartItemsNum: 0,
      hamburgerButtonToggle: false,
      currentPath: "/",
      loginData: {
        login: false,
        memberID: null,
      },
    };
  },
  created() {
    this.$eventBus.$on("emitSignInStatus", (boolean) => {
      this.loginData.login = boolean;
    });
    this.$eventBus.$on("emitCartUpdate", (number) => {
      this.cartItemsNum = number;
    });

    this.currentPath = this.$router.currentRoute.path;

    let cartItems = JSON.parse(localStorage.getItem("savingProjects"));
    if (cartItems != null) {
      this.cartItemsNum = cartItems.length;
    }

    this.queryMemberInfo();
  },
  methods: {
    // 方法：收起漢堡選單導覽列
    collapseHamburgerList() {
      const vm = this;
      setTimeout(() => {
        vm.hamburgerButtonToggle = false;
      }, 400);
    },
    // 方法：驗證登入 session 後，回傳會員資料
    queryMemberInfo() {
      const signInAuthenticationAPI = `${process.env.REMOTE_HOST_PATH}/API/Forestage/SignInAuthentication.php`;
      const queryMemberInfoAPI = `${process.env.REMOTE_HOST_PATH}/API/Universal/QueryMemberInfo.php`;
      const session = this.GlobalFunctions.getKapitanSession("forestage");
      const vm = this;

      vm.loginData.login = false;

      this.$http
        .post(signInAuthenticationAPI, session)
        .then((response) => {
          if (response.data.sessionCheck) {
            vm.loginData.login = true;
            vm.loginData.memberID = response.data.signInedID;
            return vm.$http.post(queryMemberInfoAPI, vm.loginData.memberID);
          } else {
            vm.loginData.login = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 方法：登出並刪除 session
    signOut() {
      setTimeout(() => {
        document.cookie = `kapitanMembersSession	= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
        this.loginData.login = false;
        this.$router.push({ name: "首頁" });
      }, 1000);
    },
  },
  computed: {
    // 計算（方法）：根據登入與否回傳不同的導覽列連結
    returnNavbarLinks() {
      if (this.loginData.login) {
        let newArr = [];

        for (const prop in this.navbarLinks) {
          if (prop != "signIn") {
            newArr.push(this.navbarLinks[prop]);
          }
        }

        return newArr;
      } else {
        let newArr = [];

        for (const prop in this.navbarLinks) {
          if (prop != "signOut") {
            newArr.push(this.navbarLinks[prop]);
          }
        }

        return newArr;
      }
    },
    // 計算（方法）：回傳僅屬於文字連結的導覽列連結
    returnBurgerMenuLinks() {
      if (this.loginData.login) {
        let newArr = [];

        for (const prop in this.navbarLinks) {
          if (
            prop != "signIn" &&
            this.navbarLinks[prop].selfClass.includes("text-link")
          ) {
            newArr.push(this.navbarLinks[prop]);
          }
        }

        return newArr;
      } else {
        let newArr = [];

        for (const prop in this.navbarLinks) {
          if (
            prop != "signOut" &&
            this.navbarLinks[prop].selfClass.includes("text-link")
          ) {
            newArr.push(this.navbarLinks[prop]);
          }
        }

        return newArr;
      }
    },
  },
  watch: {
    // 監看：路由改變時將於 data 紀錄當前路徑，以便渲染導覽列
    $route(to, from) {
      this.currentPath = this.$router.currentRoute.path;
    },
    // 監看（方法）：購物車內數量一改變即更新 data 數字，以利購物車 icon 樣式即時渲染
    cartItemsNum() {
      this.cartItemsNum = this.cartItemsNum;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/all.scss";

* {
  text-decoration: none;
}

nav {
  z-index: 9999;
  height: $desktop-nav-bar-height;
  .backgroud {
    background-color: $tiffany-blue;
    height: $desktop-nav-bar-height;
    z-index: 99999;
    #nav-bar {
      // （行動版）漢堡選單開始
      #hamburger-menu {
        display: block;
        left: 20px;
        user-select: none;
        z-index: 4;
        input {
          width: 43px;
          height: 32px;
          top: -5px;
          left: -5px;
          cursor: pointer;
          opacity: 0;
          z-index: 5;
          &:checked ~ span {
            opacity: 1;
            transform: rotate(-45deg) translate(1px, 6px);
          }
          &:checked ~ span:nth-last-child(2) {
            transform: rotate(45deg) translate(-2px, -10px);
          }
          &:checked ~ span:nth-last-child(3) {
            opacity: 0;
            transform: rotate(0deg) scale(0.2, 0.2);
          }
          @include media-breakpoint-down(md) {
            &:checked ~ span {
              opacity: 1;
              transform: rotate(-45deg) translate(1px, 5px);
            }
          }
        }
        span {
          width: 33px;
          height: 4px;
          margin-bottom: 5px;
          background-color: $sail;
          border-radius: 3px;
          transform-origin: 4px 0px;
          transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
            background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
          &:first-child {
            transform-origin: 0% 0%;
          }
          &:nth-last-child(2) {
            transform-origin: 0% 100%;
          }
          @include media-breakpoint-down(md) {
            width: 28px;
            height: 3px;
          }
        }
        @include media-breakpoint-up(lg) {
          display: none;
        }
      }
      // （行動版）漢堡選單結束
      // （桌面版）導覽列項目開始
      #navbar-list {
        height: 75px;
        .nav-link {
          font-size: 18px;
          color: $sail;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
          @include media-breakpoint-down(md) {
            font-size: 16px;
          }
          @include media-breakpoint-down(sm) {
            font-size: 13px;
          }
          svg {
            filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5));
          }
        }
        .current-link {
          color: $tangerine !important;
        }
        .text-link {
          font-size: 20px;
          font-weight: 600;
        }
        .text-link,
        .icon-link {
          &:hover {
            color: $prussian;
            text-shadow: none;
            cursor: pointer;
            svg {
              filter: none;
            }
          }
        }
        #logo-link {
          #logo-img {
            width: 270px;
            @include media-breakpoint-down(md) {
              width: 200px;
            }
            @include media-breakpoint-down(sm) {
              width: 160px;
            }
          }
          @include media-breakpoint-down(md) {
            position: absolute;
            transform: translate3d(-50%, -50%, 0);
            left: 50%;
            top: 50%;
            width: 200px;
          }
          @include media-breakpoint-down(sm) {
            width: 160px;
          }
        }
        #sign-in-link,
        #sign-out-link {
          margin-left: auto;
        }
        #sign-in-link,
        #sign-out-link,
        #store-link {
          @include media-breakpoint-down(md) {
            display: none;
          }
        }
        #cart-link {
          @include media-breakpoint-down(md) {
            margin-left: auto;
          }
          #cart-items-remark {
            width: 10px;
            height: 10px;
            border-radius: 10px;
            background-color: red;
            color: $sail;
            transform: translate3d(-50%, -50%, 0);
            top: 11px;
            left: calc(100% + 1px);
            animation: jumping 0.8s;
          }

          @keyframes jumping {
            25%,
            75% {
              top: 6px;
            }
            50%,
            100% {
              top: 11px;
            }
          }
        }
      }
      // （桌面版）導覽列項目結束
    }
  }
  // （行動版）漢堡選單導覽列開始
  #hamburger-menu-list {
    width: 100vw;
    left: 0;
    top: $desktop-nav-bar-height;
    padding: 5px 100px;
    background-color: $sail;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    display: flex;
    list-style-type: none;
    transform-origin: 0% 0%;
    transform: translate3d(0, -100%, 0);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    z-index: 1;
    margin: 0;
    @include media-breakpoint-up(lg) {
      display: none;
    }
    @include media-breakpoint-down(sm) {
      padding: 5px 60px;
    }
    li {
      padding: 10px 0;
      font-size: 18px;
      margin: 0px 0px 0px 10px;
      @include media-breakpoint-down(sm) {
        font-size: 16px;
        margin: 0px 0px 0px 5px;
      }
      .hamburger-menu-link {
        font-weight: 600;
        color: black;
        &:hover {
          color: $tiffany-blue;
        }
      }
      .current-hamburger-menu-link {
        color: $tiffany-blue !important;
      }
    }
  }
  .show-hamburger-menu-list {
    transform: none !important;
  }
  // （行動版）漢堡選單導覽列結束
}
</style>