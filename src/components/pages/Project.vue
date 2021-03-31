<template>
  <main id="project-page" class="container">
    <!-- 方案輪播章節開始 -->
    <Carousel :carouselData="carouselData"></Carousel>
    <!-- 方案輪播章節結束 -->
    <!-- 網站麵包屑開始 -->
    <Breadcrumb :breadCrumbData="breadCrumbData"></Breadcrumb>
    <!-- 網站麵包屑結束 -->
    <!-- 方案摘要章節開始 -->
    <section id="project-summary-area" class="row mt-4 mb-5">
      <div id="project-summary" class="col-lg-8 col-12">
        <h1>
          {{ selectedProject.selectedProjectContent.projectName }}
        </h1>
        <hr />
        <section
          v-html="selectedProject.selectedProjectContent.projectSummary"
        ></section>
      </div>
      <div id="project-price" class="col-lg-4 col-12 position-sticky">
        <div class="card text-center">
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <!-- 方案人數開始 -->
              <li class="list-group-item">
                <div class="row mt-2">
                  <div id="project-min-num-of-people" class="col-6">
                    <h6>最低成團人數</h6>
                    <div class="my-3">
                      <span>
                        {{
                          selectedProject.selectedProjectContent
                            .projectMinNumOfPeople
                        }}</span
                      >人
                    </div>
                  </div>
                  <div id="project-max-num-of-people" class="col-6">
                    <h6>最高容納人數</h6>
                    <div class="my-3">
                      <span>
                        {{
                          selectedProject.selectedProjectContent
                            .projectMaxNumOfPeople
                        }}</span
                      >人
                    </div>
                  </div>
                </div>
              </li>
              <!-- 方案人數結束 -->
              <!-- 人均售價開始 -->
              <li class="list-group-item">
                <div
                  id="project-price-per-person"
                  class="my-3"
                  v-if="
                    selectedProject.selectedProjectContent
                      .projectPricePerPerson != ''
                  "
                  :key="
                    selectedProject.selectedProjectContent.projectPricePerPerson
                  "
                >
                  每位成員特惠價：<span>
                    {{
                      selectedProject.selectedProjectContent
                        .projectPricePerPerson
                        | currency
                        | dollarSign
                    }}
                  </span>
                </div>
              </li>
              <!-- 人均售價結束 -->
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!-- 方案摘要章節結束 -->
    <!-- 方案購買章節開始 -->
    <section id="project-purchase-area" class="row mb-5">
      <div class="col-12">
        <h3>方案確認</h3>
        <hr />
        <!-- 方案購買卡片開始 -->
        <div id="project-purchase-card" class="card">
          <div class="card-header">
            <!-- 方案購買卡片頁籤開始 -->
            <ul class="nav nav-tabs card-header-tabs">
              <li
                class="nav-item"
                v-for="(tab, index) in tabs.tabsArr"
                :key="index"
              >
                <a
                  class="nav-link"
                  :class="tabs.currentTab == tab ? 'active' : ''"
                  @click.prevent="tabs.currentTab = tab"
                  >{{ tab }}</a
                >
              </li>
            </ul>
            <!-- 方案購買卡片頁籤結束 -->
          </div>
          <!-- 方案購買卡片主要內容（元件）開始 -->
          <TabDefault
            :selectedProject="selectedProject"
            v-if="tabs.currentTab == '選擇方案'"
          ></TabDefault>
          <TabLocation
            v-else-if="tabs.currentTab == '會合地點'"
            :departureLocationInfo="
              selectedProject.selectedProjectDepartureLocation
            "
          ></TabLocation>
          <TabTerms v-else></TabTerms>
          <!-- 方案購買卡片主要內容（元件）結束 -->
        </div>
        <!-- 方案購買卡片結束 -->
      </div>
    </section>
    <!-- 方案購買章節結束 -->
    <!-- 方案細節章節開始 -->
    <section id="project-details-area" class="row mb-5">
      <div class="col-12">
        <h3>服務內容</h3>
        <hr />
        <article
          v-html="selectedProject.selectedProjectContent.projectDescription"
        ></article>
      </div>
    </section>
    <!-- 方案細節章節結束 -->
    <!-- 方案評價章節開始 -->
    <section id="comments-area" class="row mb-5">
      <div class="col-12">
        <h3>旅客評價</h3>
        <hr />
        <div class="commentsContainer"></div>
      </div>
    </section>
    <!-- 方案評價章節結束 -->
  </main>
</template>

<script>
// 導入輪播元件
import Carousel from "@/components/pages/sub-components/Carousel";
// 導入麵包屑元件
import Breadcrumb from "@/components/pages/sub-components/Breadcrumb";
// 導入方案摘要章節的3個頁籤元件
import TabDefault from "@/components/pages/sub-components/TabDefault";
import TabLocation from "@/components/pages/sub-components/TabLocation";
import TabTerms from "@/components/pages/sub-components/TabTerms";

export default {
  data() {
    return {
      breadCrumbData: {
        pagesArr: ["首頁", "挑選航程", "方案詳情"],
        currentPage: 3,
      },
      selectedProject: {
        selectedProjectID: this.$route.params.selectedProjectID,
        selectedProjectContent: {
          projectName: "",
          projectAvatarUrl: "",
          projectCarouselImgs: [],
          projectMinNumOfPeople: "",
          projectMaxNumOfPeople: "",
          projectPricePerPerson: "",
          projectSummary: "",
        },
        selectedProjectDepartureLocation: {
          locationName: "",
          locationDescription: "",
          locationLng: "",
          locationLat: "",
        },
        selectedProjectBookedDate: [],
      },
      carouselData: {
        usinAt: "挑選航程",
        carouselItems: [],
      },
      tabs: {
        currentTab: "選擇方案",
        tabsArr: ["選擇方案", "會合地點", "使用條款"],
      },
    };
  },
  components: {
    Carousel,
    Breadcrumb,
    TabDefault,
    TabLocation,
    TabTerms,
  },
  created() {
    window.scrollTo(0, 0);

    // 向後端請調本頁方案內容
    const api = `${process.env.REMOTE_HOST_PATH}/API/Forestage/QueryProjectContent.php`;
    const vm = this;

    this.$http
      .post(api, vm.selectedProject.selectedProjectID)
      .then((response) => {
        vm.selectedProject.selectedProjectContent.projectName =
          response.data.projectContent["PROJECT_NAME"];
        vm.selectedProject.selectedProjectContent.projectAvatarUrl =
          response.data.projectContent["PROJECT_AVATAR_URL"];
        console.log(response.data.projectContent["PROJECT_CAROUSEL_URL"]);
        vm.selectedProject.selectedProjectContent.projectCarouselImgs = JSON.parse(
          response.data.projectContent["PROJECT_CAROUSEL_URL"]
        );
        vm.carouselData.carouselItems =
          vm.selectedProject.selectedProjectContent.projectCarouselImgs;
        vm.selectedProject.selectedProjectContent.projectMinNumOfPeople =
          response.data.projectContent["PROJECT_MIN_NUM_OF_PEOPLE"];
        vm.selectedProject.selectedProjectContent.projectMaxNumOfPeople =
          response.data.projectContent["PROJECT_MAX_NUM_OF_PEOPLE"];
        vm.selectedProject.selectedProjectContent.projectPricePerPerson = Number(
          response.data.projectContent["PROJECT_ORIGINAL_PRICE_PER_PERSON"]
        );
        vm.selectedProject.selectedProjectContent.projectSummary =
          response.data.projectContent["PROJECT_SUMMARY"];
        vm.selectedProject.selectedProjectContent.projectDescription =
          response.data.projectContent["PROJECT_DESCRIPITION"];
        vm.selectedProject.selectedProjectDepartureLocation.locationName =
          response.data.projectDepartureLocation["LOCATION_NAME"];
        vm.selectedProject.selectedProjectDepartureLocation.locationDescription =
          response.data.projectDepartureLocation["LOCATION_DESCRIPTION"];
        vm.selectedProject.selectedProjectDepartureLocation.locationLng =
          response.data.projectDepartureLocation["LOCATION_LNG"];
        vm.selectedProject.selectedProjectDepartureLocation.locationLat =
          response.data.projectDepartureLocation["LOCATION_LAT"];

        response.data.projectBooking.forEach((bookingRow) => {
          vm.selectedProject.selectedProjectBookedDate.push(
            bookingRow["BOOKING_DATE"]
          );
        });
      });
  },
};
</script>

<style lang="scss" scope>
@import "../../assets/scss/all.scss";

#project-page {
  padding: $desktop-nav-bar-height + $main-container-pt 0 $main-container-pt;
  .nav-item {
    cursor: pointer;
  }
  #project-summary-area,
  #project-details-area {
    p {
      img {
        width: 75%;
        @include media-breakpoint-down(md) {
          width: 90%;
        }
      }
    }
  }
}
</style>