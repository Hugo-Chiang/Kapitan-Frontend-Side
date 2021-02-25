<template>
  <main>
    <!-- <h1>方案名稱：{{ selectedProjectId }}</h1>
    <img src="" alt="" />
    <h2>方案價格：{{ selectedProjectContent["PROJECT_ORIGINAL_PRICE"] }}</h2> -->

    



  </main>
</template>

<script>
import Store from "@/components/pages/Store";

export default {
  data() {
    return {
      selectedProjectId: this.$route.params.selectedProjectId,
      selectedProjectContent: {},
    };
  },
  // 目前用不到
  // computed: {
  //   projectIdChanged() {
  //     return Store.currentPageContentArr.find(
  //       (project) => project["PROJECT_ID"] == this.selectedProjectId
  //     );
  //   },
  // },
  created() {
    const api = "https://be-sp-0001-kapitan.herokuapp.com/api/store.php";
    const vm = this;

    this.$http.get(api).then((response) => {
      response.data.forEach((project) => {
        if (project["PROJECT_ID"] == vm.selectedProjectId)
          vm.selectedProjectContent = project;
      });
    });
  },
};
</script>

<style lang="scss" scope="">
</style>