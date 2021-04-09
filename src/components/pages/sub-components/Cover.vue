<template>
  <div id="cover" class="d-flex justify-content-center align-items-center position-relative"
   :style="`background-image: url(${coverData.imgUrl})`">
    <div id="cover-background" class="position-absolute"></div>
    <h1 class="position-relative text-center mb-2">
      {{ coverData.mainTitle }}
    </h1>
    <h3 class="position-relative text-center">{{ coverData.subTitle }}</h3>
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
  background-position: center;
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
    text-shadow: 2px 2px 3px black;
    z-index: 2;
  }
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
  }
  h3 {
    font-size: 1.5rem;
  }
}
</style>