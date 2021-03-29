<template>
  <div id="cover" :style="'background-image: '">
    <h2>{{ mainTitle }}</h2>
    <h4>{{ subTitle }}</h4>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["backgroudImg", "mainTitle", "subTitle"],
};
</script>

<style lang="scss" scoped>
</style>