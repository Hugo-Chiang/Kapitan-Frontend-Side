<template>
  <div
    id="cover"
    class="d-flex flex-column justify-content-center position-relative"
    :style="`background-image: url(${coverData.imgUrl}); background-position: ${coverData.position}`"
  >
    <div id="cover-background" class="position-absolute"></div>
    <h1 class="position-relative text-center m-0">
      {{ coverData.mainTitle }}
    </h1>
    <h3 class="position-relative text-center m-0">{{ coverData.subTitle }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["coverData"],
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/all.scss";

#cover {
  background-size: cover;
  width: 100%;
  height: 200px;
  margin-bottom: $cover-mb;
  @include media-breakpoint-down(sm) {
    height: 75px;
  }
  #cover-background {
    width: 100%;
    height: 100%;
    background-color: $sail;
    opacity: 0.36;
  }
  h1,
  h3 {
    color: $sail;
    font-weight: 700;
    z-index: 2;
    text-shadow: 2px 2px 3px black;
  }
  h1 {
    font-size: 2.5rem;
    @include media-breakpoint-down(sm) {
      font-size: 2rem;
    }
  }
  h3 {
    font-size: 1.5rem;
    @include media-breakpoint-down(sm) {
      font-size: 1rem;
    }
  }
}
</style>