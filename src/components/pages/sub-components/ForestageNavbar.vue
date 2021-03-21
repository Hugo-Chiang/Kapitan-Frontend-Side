<template>
  <!-- 導覽列開始 -->
  <nav id="nav-bar-container">
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
            v-for="(navbarLink, navbarLinkKey) in navbarLinks"
            :key="navbarLinkKey"
          >
            <!-- 路由連結開始 -->
            <router-link
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
                v-if="navbarLinkKey == 'logo'"
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
        v-for="(burgerMenuLink, burgerMenuLinkKey) in burgerMenuLinks"
        :key="burgerMenuLinkKey"
      >
        <router-link
          :to="burgerMenuLink.routerTo"
          class="hamburger-menu-link nav-link"
          :class="{
            'current-hamburger-menu-link':
              burgerMenuLink.path == currentPath ? true : false,
          }"
          @click.native="collapseHamburgerList"
          >{{ burgerMenuLink.selfText }}</router-link
        >
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
        // 導覽列連結：關於頁連結
        about: {
          path: "/About",
          ItemID: "about-link",
          selfClass: [
            "nav-link",
            "text-link",
            "nav-link",
            "ml-md-auto",
            "ml-3",
            "mr-4",
          ],
          routerTo: "/About",
          selfText: "關於甲必丹",
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
          selfClass: ["nav-link", "icon-link", "ml-2", "mr-sm-4", "mr-3"],
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
      hamburgerButtonToggle: false,
      currentPath: "/",
    };
  },
  created() {
    this.currentPath = this.$router.currentRoute.path;
  },
  methods: {
    // 方法：收起漢堡選單導覽列
    collapseHamburgerList() {
      const vm = this;
      setTimeout(() => {
        vm.hamburgerButtonToggle = false;
      }, 400);
    },
  },
  // 計算（方法）：回傳僅屬於文字連結的導覽列連結
  computed: {
    burgerMenuLinks() {
      let newObj = {};
      for (let prop in this.navbarLinks) {
        if (!!this.navbarLinks[prop].selfText)
          newObj[prop] = this.navbarLinks[prop];
      }
      return newObj;
    },
  },
  watch: {
    // 監看：路由改變時將於 data 紀錄當前路徑，以便渲染導覽列
    $route(to, from) {
      this.currentPath = this.$router.currentRoute.path;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/all.scss";

$desktop-nav-bar-height: 105px;

* {
  text-decoration: none;
}

nav {
  height: $desktop-nav-bar-height;
  .backgroud {
    background-color: $tiffany-blue;
    height: $desktop-nav-bar-height;
    z-index: 3;
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
        .icon-link {
          cursor: pointer;
        }
        .text-link,
        .icon-link {
          &:hover {
            color: $prussian;
            text-shadow: none;
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
        #about-link {
          margin-left: auto;
        }
        #about-link,
        #store-link {
          @include media-breakpoint-down(md) {
            display: none;
          }
        }
        #cart-link {
          @include media-breakpoint-down(md) {
            margin-left: auto;
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