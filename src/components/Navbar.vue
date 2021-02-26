<template>
  <nav class="navbar navbar-expand-lg navbar-light .container-fluid">
    <router-link class="nav-link mr-2" to="/">
      <img id="logoImg" src="../assets/img/logo.png" alt="" />
    </router-link>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/About">關於甲必丹</router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/Store">挑選航程</router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="請輸入搜尋內容..."
          aria-label="Search"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          搜尋
        </button>
      </form>
      <ul class="navbar-nav ml-4">
        <router-link class="nav-link" to="/Store/Cart"
          ><i class="fas fa-shopping-cart fa-lg"></i>
        </router-link>
        <router-link class="nav-link" to="/Member-Centre">
          <i class="fas fa-user fa-lg"></i>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  background-color: #189ebb;
  #logoImg {
    width: 70px;
  }
  router-link {
    color: white;
  }
  .fa-shopping-cart,
  .fa-user {
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
}
</style>