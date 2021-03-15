<template>
  <section id="carouselArea" class="row">
    <div id="carouselContainer" class="col-12">
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://res.cloudinary.com/hugo-chiang/image/upload/v1615801180/Side-Projects/Frontend-Side-Projects-0001-Kapitan/Projects-Images/PJ0000001/PJ0000001-01-001_aqvvao.png"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://res.cloudinary.com/hugo-chiang/image/upload/v1615801181/Side-Projects/Frontend-Side-Projects-0001-Kapitan/Projects-Images/PJ0000001/PJ0000001-01-002_ludmq0.png"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://res.cloudinary.com/hugo-chiang/image/upload/v1615801180/Side-Projects/Frontend-Side-Projects-0001-Kapitan/Projects-Images/PJ0000001/PJ0000001-01-003_vbn9ew.png"
              class="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
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
};
</script>