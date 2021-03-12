<template>
  <!-- 導覽列開始 -->
  <nav id="nav-bar" class="nav-bar container-fluid d-flex">
    <!-- （行動版）漢堡選單開始 -->
    <div role="navigation">
      <div id="menuToggle">
        <input type="checkbox" />
        <span v-for="(span, index) in 3" :key="'span' + index"></span>
        <ul id="menu">
          <li
            v-for="(burgerMenuLink, burgerMenuLinkKey) in burgerMenuLinks"
            :key="burgerMenuLinkKey"
          >
            <router-link :to="burgerMenuLink.routerTo">{{
              burgerMenuLink.selfText
            }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- （行動版）漢堡選單結束 -->
    <!-- （桌面版）導覽列項目開始 -->
    <ul id="navbar-list" :class="navbarListClass">
      <li
        :id="navbarLink.ItemID"
        v-for="(navbarLink, navbarLinkKey) in navbarLinks"
        :key="navbarLinkKey"
      >
        <!-- 路由連結開始 -->
        <router-link :class="navbarLink.selfClass" :to="navbarLink.routerTo">
          <!-- 假設項目為商標（首頁）連結，則會出現商標圖示 -->
          <img
            v-if="navbarLinkKey == 'logo'"
            id="logo-img"
            src="../../../assets/img/logo.png"
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
  </nav>
  <!-- 導覽列結束 -->
</template>

<script>
export default {
  data() {
    return {
      navbarListClass: [
        "navbar-nav",
        "w-100",
        "align-self-center",
        "d-flex",
        "flex-row",
        "align-items-center",
        "position-relative",
        "px-2",
      ],
      navbarLinks: {
        // 導覽列連結：商標（首頁）圖示
        logo: {
          ItemID: "logo-link",
          selfClass: ["mr-2"],
          routerTo: "/",
          imgSrc: "../../../assets/img/logo.png",
        },
        // 導覽列連結：關於頁連結
        about: {
          ItemID: "about-link",
          selfClass: ["nav-link", "text-link", "nav-link", "ml-3", "mr-4"],
          routerTo: "/About",
          selfText: "關於甲必丹",
        },
        // 導覽列連結：商品（方案）頁
        store: {
          ItemID: "store-link",
          selfClass: ["nav-link", "text-link", "nav-link"],
          routerTo: "/Store",
          selfText: "挑選航程",
        },
        cart: {
          ItemID: "cart-link",
          selfClass: ["nav-link", "icon-link"],
          routerTo: "/Cart",
          iconClass: ["fas", "fa-shopping-cart", "fa-lg"],
        },
        // 導覽列連結：會員中心 icon
        memberCentre: {
          ItemID: "memberCentre-link",
          selfClass: ["nav-link", "ml-3", "icon-link"],
          routerTo: "/Member-Centre",
          iconClass: ["fas", "fa-user", "fa-lg"],
        },
      },
    };
  },
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
};
</script>

<style lang="scss" scoped>
@import "../../../assets/all.scss";

/*
 * Made by Erik Terwan
 * 24th of November 2015
 * MIT License
 *
 *
 * If you are thinking of using this in
 * production code, beware of the browser
 * prefixes.
 */

body {
  margin: 0;
  padding: 0;

  /* make it look decent enough */
  background: #232323;
  color: #cdcdcd;
  font-family: "Avenir Next", "Avenir", sans-serif;
}

#menuToggle {
  display: block;
  position: relative;
  top: 50px;
  left: 50px;

  z-index: 1;

  -webkit-user-select: none;
  user-select: none;
}

#menuToggle a {
  text-decoration: none;
  color: #232323;

  transition: color 0.3s ease;
}

#menuToggle a:hover {
  color: tomato;
}

#menuToggle input {
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  left: -5px;

  cursor: pointer;

  opacity: 0; /* hide this */
  z-index: 2; /* and place it over the hamburger */

  -webkit-touch-callout: none;
}

/*
 * Just a quick hamburger
 */
#menuToggle span {
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;

  background: #cdcdcd;
  border-radius: 3px;

  z-index: 1;

  transform-origin: 4px 0px;

  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
}

#menuToggle span:first-child {
  transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2) {
  transform-origin: 0% 100%;
}

/* 
 * Transform all the slices of hamburger
 * into a crossmark.
 */
#menuToggle input:checked ~ span {
  opacity: 1;
  transform: rotate(45deg) translate(-2px, -1px);
  background: #232323;
}

/*
 * But let's hide the middle one.
 */
#menuToggle input:checked ~ span:nth-last-child(3) {
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

/*
 * Ohyeah and the last one should go the other direction
 */
#menuToggle input:checked ~ span:nth-last-child(2) {
  transform: rotate(-45deg) translate(0, -1px);
}

/*
 * Make this absolute positioned
 * at the top left of the screen
 */
#menu {
  position: absolute;
  width: 300px;
  margin: -100px 0 0 -50px;
  padding: 50px;
  padding-top: 125px;

  background: #ededed;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */

  transform-origin: 0% 0%;
  transform: translate(-100%, 0);

  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
}

#menu li {
  padding: 10px 0;
  font-size: 22px;
}

/*
 * And let's slide it in from the left
 */
#menuToggle input:checked ~ ul {
  transform: none;
}

nav {
  background-color: $tiffany-blue;
  height: 105px;
  #navbar-list {
    height: 75px;
    li {
      border: 1px solid red;
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
    .icon-link {
      cursor: pointer;
      &:hover {
        color: $kapitan-white;
      }
    }
    #logo-link {
      width: 75px;
      #logo-img {
        width: 100%;
      }
      @include media-breakpoint-down(md) {
        position: absolute;
        transform: translate3d(-50%, -50%, 0);
        left: 50%;
        top: 50%;
      }
    }
    #about-link,
    #store-link {
      @include media-breakpoint-down(md) {
        display: none;
      }
    }
    #cart-link {
      margin-left: calc(100% - 358px);
      @include media-breakpoint-down(md) {
        margin-left: calc(100% - 270px);
      }
    }
  }
}
</style>