<template>
  <main class="container">
    <!-- 方案輪播章節開始 -->
    <Carousel></Carousel>
    <!-- 方案輪播章節結束 -->
    <!-- 網站麵包屑開始 -->
    <Breadcrumb :breadCrumbData="breadCrumbData"></Breadcrumb>
    <!-- 網站麵包屑結束 -->
    <!-- 方案摘要章節開始 -->
    <section id="summary-area" class="row mt-4 mb-5">
      <div id="project-summary" class="col-lg-8 col-12">
        <h1>
          {{ selectedProject.selectedProjectContent.projectName }}
        </h1>
        <hr />
        <section
          v-html="selectedProject.selectedProjectContent.projectSummary"
        ></section>
      </div>
      <div id="project-price" class="col-lg-4 col-12">
        <div class="card text-center">
          <div class="card-body">
            <h6>每位成員特惠價</h6>
            <h5
              class="price my-4"
              v-if="
                selectedProject.selectedProjectContent.projectPricePerPerson !=
                ''
              "
              :key="
                selectedProject.selectedProjectContent.projectPricePerPerson
              "
            >
              {{
                selectedProject.selectedProjectContent.projectPricePerPerson
                  | currency
                  | dollarSign
              }}
            </h5>
            <router-link class="btn btn-primary" to="/cart"
              >選擇方案</router-link
            >
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
        <div class="card text-center">
          <div class="card-header">
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
          </div>
          <TabDefault
            :projectID="selectedProject.selectedProjectID"
            v-if="tabs.currentTab == '選擇方案'"
          ></TabDefault>
          <TabLocation
            v-else-if="tabs.currentTab == '會合地點'"
            :departureLocationInfo="
              selectedProject.selectedProjectDepartureLocation
            "
          ></TabLocation>
          <TabTerms v-else></TabTerms>
        </div>
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
        pagesArr: ["首頁", "商城", "方案"],
        currentPage: 3,
      },
      selectedProject: {
        selectedProjectID: this.$route.params.selectedProjectID,
        selectedProjectContent: {
          projectName: "",
          projectPricePerPerson: "",
          projectSummary: "",
        },
        selectedProjectDepartureLocation: {
          locationName: "",
          locationDescription: "",
          locationLng: "",
          locationLat: "",
        },
      },
      tabs: {
        currentTab: "會合地點",
        tabsArr: ["選擇方案", "會合地點", "使用條款"],
      },
      googleDriveSharingUrl: "http://drive.google.com/uc?export=view&id=",
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
    const api = `${process.env.LOCAL_HOST_PATH}/API/Forestage/QueryProjectContent.php`;
    const vm = this;

    this.$http
      .post(api, vm.selectedProject.selectedProjectID)
      .then((response) => {
        console.log(response.data);
        vm.selectedProject.selectedProjectContent.projectName =
          response.data.projectContent["PROJECT_NAME"];
        vm.selectedProject.selectedProjectContent.projectPricePerPerson = Number(
          response.data.projectContent["PROJECT_ORIGINAL_PRICE_PER_PERSON"]
        );
        vm.selectedProject.selectedProjectContent.projectSummary =
          response.data.projectContent["PROJECT_SUMMARY"];
        vm.selectedProject.selectedProjectContent.projectDescription =
          response.data.projectContent["PROJECT_DESCRIPITION"];
        vm.selectedProjectDepartureLocation.locationName =
          response.data.projectDepartureLocation["LOCATION_NAME"];
        vm.selectedProjectDepartureLocation.locationDescription =
          response.data.projectDepartureLocation["LOCATION_DESCRIPTION"];
        vm.selectedProjectDepartureLocation.locationLng =
          response.data.projectDepartureLocation["LOCATION_LNG"];
        vm.selectedProjectDepartureLocation.locationLat =
          response.data.projectDepartureLocation["LOCATION_LAT"];
      });
  },
  // 監看（方法）：
  // watch: {
  //   selectedProject: {
  //     handler() {},
  //     deep: true,
  //   },
  // },
};
</script>

<style lang="scss" scope>
.nav-item {
  cursor: pointer;
}
</style>