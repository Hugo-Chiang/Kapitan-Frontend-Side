<template>
  <!-- 導覽列開始 -->
  <nav id="nav-bar" class="container-fluid">
    <div class="row py-3 d-flex align-items-center justify-content-between">
      <div
        :class="navBarPart.selfClass"
        v-for="(navBarPart, navBarPartKey) in navBarParts"
        :key="navBarPartKey"
      >
        <ul :class="navBarPart.listClass">
          <li
            :class="navbarLink.itemClass"
            v-for="(navbarLink, navbarLinkKey) in navbarLinks"
            :key="navbarLinkKey"
          >
            <!-- 路由連結開始 -->
            <router-link
              :class="navbarLink.selfClass"
              :to="navbarLink.routerTo"
            >
              <!-- 假設項目為首頁，則會出現商標圖示 -->
              <img
                v-if="navbarLinkKey == 'logo' && navBarPartKey == 'leftSide'"
                id="logo-img"
                src="../../../assets/img/logo.png"
                alt=""
              />
              <!-- 假設項目具有外顯文字，則顯示文字 -->
              <span
                v-if="
                  navbarLink.selfClass.includes('text-link') &&
                  navBarPartKey == 'leftSide'
                "
                >{{ navbarLink.selfText }}</span
              >
              <!-- 假設項目是 icon，則顯示 icon -->
              <i
                v-if="
                  navbarLink.selfClass.includes('icon-link') &&
                  navBarPartKey == 'rightSide'
                "
                :class="navbarLink.iconClass"
              ></i>
            </router-link>
            <!-- 路由連結結束 -->
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- 導覽列結束 -->
</template>

<script>
export default {
  data() {
    return {
      navBarParts: {
        // 導覽列左側區域
        leftSide: {
          selfClass: ["col-md-11", "col-sm-1"],
          listClass: ["navbar-nav", "flex-row", "align-items-center"],
        },
        // 導覽列右側區域
        rightSide: {
          selfClass: ["col-md-1", "col-sm-1"],
          listClass: [
            "navbar-nav",
            "flex-row",
            "align-items-center",
            "justify-content-end",
          ],
        },
      },
      navbarLinks: {
        // 導覽列連結：商標（首頁）圖示
        logo: {
          itemClass: [],
          selfClass: ["ml-4", "mr-2"],
          routerTo: "/",
          imgSrc: "../../../assets/img/logo.png",
        },
        // 導覽列連結：關於頁連結
        about: {
          itemClass: [],
          selfClass: ["nav-link", "text-link", "nav-link", "mx-4"],
          routerTo: "/About",
          selfText: "關於甲必丹",
        },
        // 導覽列連結：商品（方案）頁
        store: {
          itemClass: [],
          selfClass: ["nav-link", "text-link", "nav-link"],
          routerTo: "/Store",
          selfText: "挑選航程",
        },
        // 導覽列連結：購物車 icon
        cart: {
          itemClass: [],
          selfClass: ["nav-link", "icon-link"],
          routerTo: "/Cart",
          iconClass: ["fas", "fa-shopping-cart", "fa-lg"],
        },
        // 導覽列連結：會員中心 icon
        memberCentre: {
          itemClass: [],
          selfClass: ["nav-link", "mx-4", "icon-link"],
          routerTo: "/Member-Centre",
          iconClass: ["fas", "fa-user", "fa-lg"],
        },
      },
    };
  },
  created() {
    console.log();
  },
  watch: {
    aa() {
      console.log(this.aa);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/all.scss";

nav {
  background-color: $tiffany-blue;
  ul {
    #logo-img {
      width: 70px;
    }
    .nav-link {
      font-size: 18px;
      color: oldlace !important;
    }
    .text-link {
      font-size: 19px;
      &:hover {
        color: orange !important;
      }
    }
    .fa-shopping-cart,
    .fa-user {
      cursor: pointer;
      &:hover {
        color: $kapitan-white;
      }
    }
  }
}
</style>