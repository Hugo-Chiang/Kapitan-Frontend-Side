<template>
  <div id="forestage-container">
    <ForestageNavbar></ForestageNavbar>
    <router-view></router-view>
    <ForestageFooter></ForestageFooter>
  </div>
</template>

<script>
// 導入導覽列與頁腳元件
import ForestageNavbar from "@/components/pages/sub-components/ForestageNavbar";
import ForestageFooter from "@/components/pages/sub-components/ForestageFooter";

export default {
  components: {
    ForestageNavbar,
    ForestageFooter,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/all.scss";

ForestageNavbar {
  margin-bottom: 105px;
}
</style>