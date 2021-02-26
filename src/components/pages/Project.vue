<template>
  <main>
    <Breadcrumb></Breadcrumb>
    <div class="container">
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
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="http://code.z01.com/img/2016instbg_01.jpg"
                  class="d-block w-100"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="http://code.z01.com/img/2016instbg_02.jpg"
                  class="d-block w-100"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="http://code.z01.com/img/2016instbg_03.jpg"
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
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </section>
      <section id="summaryArea" class="row my-4">
        <div class="col-8">
          <h1>
            {{ selectedProjectContent["PROJECT_NAME"] }}
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            est consectetur numquam at dolorum ipsa culpa velit inventore?
            Adipisci tenetur voluptate sunt praesentium! Quae, aliquam.
            Voluptatum animi maxime aspernatur fuga!
          </p>
        </div>
        <div class="col-4">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">
                {{ selectedProjectContent["PROJECT_ORIGINAL_PRICE"] }}
              </h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" class="btn btn-primary">立即預約</a>
            </div>
          </div>
        </div>
      </section>
      <section id="projectPurchaseArea" class="row mb-5">
        <div class="col-12">
          <h3>標題1</h3>
          <hr />
          <div class="card text-center">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <a class="nav-link active" href="#">選擇方案</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">會合地點</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="#">使用條款</a>
                </li>
              </ul>
            </div>
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </section>
      <section id="projectDetailsArea" class="row mb-5">
        <div class="col-12">
          <h3>標題2</h3>
          <hr />
          <article>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              veniam commodi quam dicta accusamus, voluptas ab? Nihil cupiditate
              pariatur provident, accusamus qui impedit maxime quia libero porro
              nisi rem possimus?
            </p>
            <img src="" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              veniam commodi quam dicta accusamus, voluptas ab? Nihil cupiditate
              pariatur provident, accusamus qui impedit maxime quia libero porro
              nisi rem possimus?
            </p>
            <img src="" alt="" />
            <img src="" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              veniam commodi quam dicta accusamus, voluptas ab? Nihil cupiditate
              pariatur provident, accusamus qui impedit maxime quia libero porro
              nisi rem possimus?
            </p>
          </article>
        </div>
      </section>
      <section id="commentsArea" class="row mb-5">
        <div class="col-12">
          <h3>標題3</h3>
          <hr />
          <div class="commentsContainer"></div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
// import Store from "@/components/pages/Store";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  data() {
    return {
      selectedProjectId: this.$route.params.selectedProjectId,
      selectedProjectContent: {},
    };
  },
  components: {
    Breadcrumb: Breadcrumb,
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

<style lang="scss" scope>
.carousel-item {
  height: 400px;
}
</style>