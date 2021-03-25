<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 函式：抓取存在 cookie 中的 session（前台）
    getKapitanSession() {
      let cookie = document.cookie;
      let startIndex = 0;
      let keyLength = 0;
      let forestageKey = 'kapitanMembersSession="';

      startIndex = cookie.indexOf(forestageKey);
      keyLength = forestageKey.length;

      let rawSession = cookie.substring(startIndex + keyLength);
      let endIndex = rawSession.indexOf('"');
      let session = rawSession.substring(0, endIndex);

      return session;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>