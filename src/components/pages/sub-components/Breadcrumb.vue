<template>
  <ol class="breadcrumb">
    <li
      class="breadcrumb-item"
      :class="index == breadCrumbData.currentPage - 1 ? 'active' : ''"
      v-for="(page, index) in pagesArr"
      :key="index"
      :aria-current="index == breadCrumbData.currentPage - 1 ? 'page' : ''"
      @click="$router.push({ name: pagesArr[index] })"
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
    pagesArr() {
      return this.breadCrumbData.pagesArr.splice(
        0,
        this.breadCrumbData.currentPage
      );
    },
  },
  filters: {
    filterSpecificRouterName(str) {
      return str.replace("管理系統：", "");
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  background-color: transparent;
  li {
    cursor: pointer;
  }
}
</style>