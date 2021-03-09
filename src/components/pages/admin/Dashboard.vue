<template>
  <div>
    <h1>Dashboards</h1>
    <a href="" class="nav-link" @click.prevent="signOut">登出</a>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 方法：登出，清除 cookie 中的 session 並回到登入頁
    signOut() {
      document.cookie = `kapitanSession= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
      setTimeout(() => {
        this.$router.push({ name: "管理系統：登入頁" });
      }, 1000);
    },
  },
};
</script>