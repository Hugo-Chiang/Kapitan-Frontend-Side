<template>
  <main class="container">
    <Breadcrumb></Breadcrumb>
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
    <section id="summaryArea" class="row my-4">
      <div class="col-8">
        <h1>
          {{ selectedProjectContent["PROJECT_NAME"] }}
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          est consectetur numquam at dolorum ipsa culpa velit inventore?
          Adipisci tenetur voluptate sunt praesentium! Quae, aliquam. Voluptatum
          animi maxime aspernatur fuga!
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
            <router-link class="btn btn-primary" to="/cart"
              >選擇方案</router-link
            >
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
              <li class="nav-item" v-for="tab in tabs">
                <a
                  class="nav-link"
                  href="#"
                  @click.prevent="currentTab = tab"
                  >{{ tab }}</a
                >
              </li>
            </ul>
          </div>
          <div class="card-body" v-if="currentTab == '選擇方案'">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">第一頁籤。</p>
            <div>
              <date-picker
                v-model="bookingDate"
                valueType="format"
                :lang="lang"
                :disabled-date="checkBookedDate"
              ></date-picker>
            </div>
            <router-link class="btn btn-primary" to="/Cart"
              >放入購物車</router-link
            >
            <router-link class="btn btn-primary" to="/Cart"
              >立即預約</router-link
            >
          </div>
          <div class="card-body" v-else-if="currentTab == '會合地點'">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">第二頁籤。</p>
          </div>
          <div class="card-body" v-else>
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">第三頁籤。</p>
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
  </main>
</template>

<script>
// import Store from "@/components/pages/Store";
import Breadcrumb from "@/components/Breadcrumb";
import DatePicker from "vue2-datepicker";

export default {
  data() {
    return {
      selectedProjectId: this.$route.params.selectedProjectId,
      selectedProjectContent: {},
      tabs: ["選擇方案", "會合地點", "使用條款"],
      currentTab: "選擇方案",
      bookingDate: null,
      bookedDate: ["2021-02-25", "2021-03-01"],
      lang: {
        formatLocale: {
          months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          // MMM
          monthsShort: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          // dddd
          weekdays: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          weekdaysShort: [
            "週日",
            "週一",
            "週二",
            "週三",
            "週四",
            "週五",
            "週六",
          ],
          weekdaysMin: ["日", "一", "二", "三", "四", "五", "六"],
        },
      },
    };
  },
  components: {
    Breadcrumb: Breadcrumb,
    DatePicker: DatePicker,
  },
  methods: {
    checkBookedDate(date) {
      let bookedDateArr = this.bookedDate.map((x) =>
        new Date(x).toLocaleDateString()
      );
      let timeNow = new Date();
      let todayMidnight = new Date(
        timeNow.getFullYear(),
        timeNow.getMonth(),
        timeNow.getDate()
      );
      console.log(date, todayMidnight);

      return (
        date < todayMidnight ||
        bookedDateArr.find(
          (bookedDate) => bookedDate == date.toLocaleDateString()
        )
      );
    },
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