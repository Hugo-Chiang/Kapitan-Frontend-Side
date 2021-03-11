<template>
  <main class="container">
    <!-- 方案輪播章節開始 -->
    <Carousel></Carousel>
    <!-- 方案輪播章節結束 -->
    <!-- 網站麵包屑開始 -->
    <Breadcrumb :breadCrumbData="breadCrumbData"></Breadcrumb>
    <!-- 網站麵包屑結束 -->
    <!-- 方案摘要章節開始 -->
    <section id="summaryArea" class="row mt-4 mb-5">
      <div class="col-8">
        <h1>
          {{ selectedProjectContent.projectName }}
        </h1>
        <hr />
        <section v-html="selectedProjectContent.projectSummary"></section>
      </div>
      <div class="col-4">
        <div class="card text-center">
          <div class="card-body">
            <h6>每位成員特惠價</h6>
            <h5
              class="price my-4"
              v-if="selectedProjectContent.projectPricePerPerson != ''"
              :key="selectedProjectContent.projectPricePerPerson"
            >
              {{
                selectedProjectContent.projectPricePerPerson
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
    <section id="projectPurchaseArea" class="row mb-5">
      <div class="col-12">
        <h3>方案確認</h3>
        <hr />
        <div class="card text-center">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
                <a
                  class="nav-link"
                  :class="currentTab == tab ? 'active' : ''"
                  href="#"
                  @click.prevent="currentTab = tab"
                  >{{ tab }}</a
                >
              </li>
            </ul>
          </div>
          <TabDefault
            :projectID="selectedProjectID"
            v-if="currentTab == '選擇方案'"
          ></TabDefault>
          <TabLocation v-else-if="currentTab == '會合地點'"></TabLocation>
          <TabTerms v-else></TabTerms>
        </div>
      </div>
    </section>
    <!-- 方案購買章節結束 -->
    <!-- 方案細節章節開始 -->
    <section id="projectDetailsArea" class="row mb-5">
      <div class="col-12">
        <h3>服務內容</h3>
        <hr />
        <article v-html="selectedProjectContent.projectDescription"></article>
      </div>
    </section>
    <!-- 方案細節章節結束 -->
    <!-- 方案評價章節開始 -->
    <section id="commentsArea" class="row mb-5">
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
      selectedProjectID: this.$route.params.selectedProjectID,
      selectedProjectContent: {
        projectName: "",
        projectPricePerPerson: "",
        projectSummary: "",
      },
      tabs: ["選擇方案", "會合地點", "使用條款"],
      currentTab: "會合地點",
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

    this.$http.post(api, vm.selectedProjectID).then((response) => {
      console.log(response.data);
      vm.selectedProjectContent.projectName =
        response.data.projectContent["PROJECT_NAME"];
      vm.selectedProjectContent.projectPricePerPerson = Number(
        response.data.projectContent["PROJECT_ORIGINAL_PRICE_PER_PERSON"]
      );
      vm.selectedProjectContent.projectSummary =
        response.data.projectContent["PROJECT_SUMMARY"];
      vm.selectedProjectContent.projectDescription =
        response.data.projectContent["PROJECT_DESCRIPITION"];
    });
  },
};
</script>

<style lang="scss" scope>
.carousel-item {
  height: 400px;
}
</style>