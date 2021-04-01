<template>
  <ol class="breadcrumb p-0">
    <li
      class="breadcrumb-item"
      :class="index == breadCrumbData.currentPage - 1 ? 'active' : ''"
      v-for="(page, index) in returnPagesArr"
      :key="index"
      :aria-current="index == breadCrumbData.currentPage - 1 ? 'page' : ''"
      @click="$router.push({ name: returnPagesArr[index] })"
    >
      {{ page | filterSpecificRouterName }}
    </li>
  </ol>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["breadCrumbData"],
  computed: {
    // 計算（方法）：回傳所在頁面（含）以前的頁面陣列
    returnPagesArr() {
      return this.breadCrumbData.pagesArr.splice(
        0,
        this.breadCrumbData.currentPage
      );
    },
  },
  filters: {
    // 篩選：去除「管理系統」等前綴字樣
    filterSpecificRouterName(str) {
      return str.replace("管理系統：", "");
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  background-color: transparent !important;
  li {
    cursor: pointer;
  }
}
</style>