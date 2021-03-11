<template>
  <!-- 導覽列開始 -->
  <nav class="navbar navbar-expand-lg navbar-light container-fluid">
    <div class="col-3 d-flex">
      <!-- 商標（首頁）連結開始 -->
      <router-link class="nav-link mr-2" to="/">
        <img id="logo-img" src="../../../assets/img/logo.png" alt="" />
      </router-link>
      <!-- 商標（首頁）連結結束 -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <!-- 關於頁連結開始 -->
          <li class="nav-item">
            <router-link class="nav-link non-icon-link" to="/About"
              >關於甲必丹</router-link
            >
          </li>
          <!-- 關於頁連結結束 -->
          <!-- 商品（方案）頁連結開始 -->
          <li class="nav-item">
            <router-link class="nav-link non-icon-link" to="/Store"
              >挑選航程</router-link
            >
          </li>
          <!-- 商品（方案）頁連結結束 -->
        </ul>
      </div>
    </div>
    <div class="col-8"></div>
    <div class="col-1 d-flex justify-content-end">
      <ul class="navbar-nav">
        <!-- 購物車 icon 連結開始 -->
        <router-link class="nav-link mr-1" to="/Cart"
          ><i class="fas fa-shopping-cart fa-lg"></i>
        </router-link>
        <!-- 購物車 icon 連結結束 -->
        <!-- 會員中心 icon 連結開始 -->
        <router-link class="nav-link" to="/Member-Centre">
          <i class="fas fa-user fa-lg"></i>
        </router-link>
        <!-- 會員中心 icon 連結結束 -->
      </ul>
    </div>
  </nav>
  <!-- 導覽列結束 -->
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/all.scss";

nav {
  background-color: $tiffany-blue;
  #logo-img {
    width: 70px;
  }
  .nav-link {
    color: oldlace !important;
  }
  .non-icon-link {
    font-size: 17px;
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
</style>