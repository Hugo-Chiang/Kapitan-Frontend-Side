<template>
  <section id="carousel-area" class="row mb-2">
    <div class="col-12">
      <div id="carousel-block" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li
            v-for="(carouselItem, index) in carouselData.carouselItems"
            :key="index"
            data-target="#carousel-block"
            :data-slide-to="index"
            :class="index == 0 ? 'active' : ''"
          ></li>
        </ol>
        <div class="carousel-inner">
          <div
            v-for="(carouselItem, index) in carouselData.carouselItems"
            :key="'carouselItem' + index"
            class="carousel-item"
            :class="index == 0 ? 'active' : ''"
          >
            <img :src="carouselItem" class="d-block w-100" alt="..." />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carousel-block"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carousel-block"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["carouselData"],
};
</script>

<style lang="scss" scoped>
</style>