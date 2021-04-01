<template>
  <!-- 挑選行程頁開始 -->
  <main id="store-page" class="container position-relative">
    <!-- 麵包屑開始 -->
    <Breadcrumb :breadCrumbData="breadCrumbData"></Breadcrumb>
    <!-- 麵包屑結束 -->
    <!-- 方案篩選器與方案列表開始 -->
    <div class="row">
      <!-- 方案篩選器開始 -->
      <aside
        id="aside-bar"
        class="card pb-4 col-xl-2 d-xl-block d-none position-sticky"
      >
        <div class="card-body">
          <!-- 挑選地點開始 -->
          <h5 class="mb-0">挑選地點</h5>
          <hr />
          <ul id="category-list" class="pl-3">
            <li>
              <input
                type="checkbox"
                name="全選"
                v-model="filterData.selectedAll"
                @change="checkSelectAll"
              />
              全選
            </li>
            <li v-for="category in categoryList" :key="category['CATEGORY_ID']">
              <input
                type="checkbox"
                :name="category['CATEGORY_NAME']"
                :value="category['CATEGORY_ID']"
                class="category-checkbox"
                v-model="filterData.selectedCategories"
              />
              {{ category["CATEGORY_NAME"] }}
            </li>
          </ul>
          <!-- 挑選地點結束 -->
          <!-- 人均預算開始 -->
          <h5 class="mt-4 mb-0">人均預算</h5>
          <hr />
          <div class="budget mb-1">
            {{ Number(filterData.budget) | currency | dollarSign
            }}<span class="budget-remark">（含）以下</span>
          </div>
          <input
            type="range"
            class="form-range"
            min="0"
            max="10000"
            step="500"
            id="budget"
            v-model="filterData.budget"
          />
          <!-- 人均預算結束 -->
          <!-- 結果排序開始 -->
          <h5 class="mt-4 mb-0">結果排序</h5>
          <hr />
          <select class="form-control form-select-lg" v-model="filterData.sort">
            <option disabled selected value>－請選擇－</option>
            <option value="'%%'">預設</option>
            <option value="PROJECT_ORIGINAL_PRICE_PER_PERSON ASC">
              價格（低）
            </option>
            <option value="'%%'">評價（高）</option>
          </select>
          <!-- 結果排序結束 -->
        </div>
      </aside>
      <!-- 方案篩選器開始 -->
      <!-- 方案列表開始 -->
      <section class="container col-xl-10 col-12 mb-5">
        <ul
          v-if="currentPageContentArr.length > 0"
          id="cards-list"
          class="d-flex flex-wrap justify-content-md-between justify-content-center"
        >
          <!-- 方案卡片開始 -->
          <router-link
            v-for="(project, index) in currentPageContentArr"
            :key="project['PROJECT_ID']"
            :data-id="project['PROJECT_ID']"
            :to="{
              name: '方案',
              params: {
                selectedProjectID: currentPageContentArr[index]['PROJECT_ID'],
              },
            }"
            class="router-link d-block mx-lg-0 mx-md-1 mb-5"
          >
            <li class="card" :key="project['PROJECT_ID']">
              <img
                class="card-img-top"
                :src="
                  project['PROJECT_AVATAR_URL'] != null
                    ? GlobalVariables.cloudUrlprefix +
                      project['PROJECT_AVATAR_URL']
                    : GlobalVariables.cloudUrlprefix +
                      GlobalVariables.cloudNoImgUrl
                "
                alt="這裡是卡片頂圖"
              />
              <div class="card-body">
                <h6 class="card-title">
                  {{ project["PROJECT_NAME"] }}
                </h6>
                <p class="card-text"></p>
                <div class="row">
                  <div class="col-6">
                    <i class="fas fa-users"></i>
                    {{ project["PROJECT_MIN_NUM_OF_PEOPLE"] }} -
                    {{ project["PROJECT_MAX_NUM_OF_PEOPLE"] }}
                  </div>
                  <h6 class="card-price col-6">
                    每人
                    {{
                      Number(project["PROJECT_ORIGINAL_PRICE_PER_PERSON"])
                        | currency
                        | dollarSign
                    }}
                  </h6>
                </div>
              </div>
            </li>
          </router-link>
          <!-- 方案卡片結束 -->
        </ul>
        <!-- 查無資料開始 -->
        <div v-else>
          <div
            id="no-project-found-block"
            class="mx-auto py-5 d-flex flex-column justify-content-center align-items-center"
          >
            <h3 class="text-center">未能找到符合您篩選的條件</h3>
            <img
              src="../../assets/img/forestage/store/island-and-yachts.jpg"
              alt=""
              class="my-5"
            />
            <h5 class="text-center mt-2">請再嘗試調整看看吧！</h5>
          </div>
        </div>
        <!-- 查無資料結束 -->
      </section>
      <!-- 方案列表結束 -->
    </div>
    <!-- 方案篩選器與方案列表結束 -->
    <!-- 頁碼開始 -->
    <div class="row mb-5">
      <div
        class="col-12 d-flex justify-content-center"
        id="pagination-container"
      >
        <Pagination
          v-show="currentPageContentArr.length > 0"
          :allContentArr="allProjectsArr"
          :itemsNumPerPage="itemsNumPerPage"
          @emitCurrentContentAndSerial="getCurrentContentAndSerial"
        ></Pagination>
      </div>
    </div>
    <!-- 頁碼結束 -->
  </main>
  <!-- 挑選行程頁結束 -->
</template>

<script>
// 導入麵包屑元件
import Breadcrumb from "@/components/pages/sub-components/Breadcrumb";
// 導入頁碼元件
import Pagination from "@/components/pages/sub-components/Pagination";

export default {
  data() {
    return {
      breadCrumbData: {
        pagesArr: ["首頁", "挑選航程"],
        currentPage: 2,
      },
      filterData: {
        selectedAll: true,
        selectedCategories: [],
        budget: 10000,
        sort: "'%%'",
      },
      categoryList: [],
      allProjectsArr: [],
      currentPageContentArr: [],
      currentPageContentArrSerial: [],
      itemsNumPerPage: 9,
      currentPageNum: 1,
    };
  },
  components: {
    Breadcrumb,
    Pagination,
  },
  created() {
    window.scrollTo(0, 0);

    // 初始化航程分類與清單
    const categoryListAPI = `${process.env.REMOTE_HOST_PATH}/API/Forestage/QueryCategoryList.php`;
    const projectsListAPI = `${process.env.REMOTE_HOST_PATH}/API/Forestage/QueryProjectsList.php`;
    const vm = this;

    this.$http
      .get(categoryListAPI)
      .then((response) => {
        vm.categoryList = response.data;
        return vm.$http.post(projectsListAPI, JSON.stringify(vm.filterData));
      })
      .then((response) => {
        vm.checkSelectAll();
        vm.allProjectsArr = response.data;
      });
  },
  methods: {
    // 方法：獲得頁碼元件傳回的當前頁面內容
    getCurrentContentAndSerial(arr, num) {
      this.currentPageContentArr = arr;
      this.currentPageContentArrSerial = num;
    },
    // 方法：檢查是否全選，以進行相關渲染
    checkSelectAll() {
      let checkboxs = document.querySelectorAll(".category-checkbox");

      // 判斷：點擊全選 checkbox 與否將影響其餘所有選項是否全選
      if (this.filterData.selectedAll) {
        for (const category of checkboxs) {
          console.log("推");
          this.filterData.selectedCategories.push(category.value);
        }
      } else {
        this.filterData.selectedCategories = [];
      }
    },
  },
  watch: {
    // 監看（方法）：篩選器一旦更動，即向後端調回所屬產品
    filterData: {
      handler() {
        // 判斷：任一 checkbox 未選將取消全選，所有 checkbox 皆選則連帶全選
        let checkboxs = document.querySelectorAll(".category-checkbox");
        let selectedNum = this.filterData.selectedCategories.length;

        if (selectedNum == checkboxs.length) {
          this.filterData.selectedAll = true;
        } else {
          this.filterData.selectedAll = false;
        }

        const projectsListAPI = `${process.env.REMOTE_HOST_PATH}/API/Forestage/QueryProjectsList.php`;
        const vm = this;

        this.$http
          .post(projectsListAPI, JSON.stringify(vm.filterData))
          .then((response) => {
            vm.allProjectsArr = response.data;
          });
      },
      deep: true,
      immediate: true,
    },
    // 監看（方法）：換頁即將捲軸置頂
    currentPageContentArr() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scope>
@import "../../assets/scss/all.scss";

#store-page {
  padding: $desktop-nav-bar-height + $main-container-pt 0 $main-container-pt;
  // 方案篩選器開始
  aside {
    height: 520px;
    border: 1px solid $bootstrap-border-color;
    box-shadow: 1px 1px 1px 0.5px rgba(0, 0, 0, 0.2);
    top: $desktop-nav-bar-height;
    h5 {
      font-weight: 700;
    }
    #category-list {
      li {
        list-style: none;
      }
    }
    .budget {
      font-size: 15px;
      font-weight: 700;
      color: darkred;
      .budget-remark {
        font-size: 12px;
        color: black;
      }
    }
  }
  // 方案篩選器結束
  // 方案列表開始
  #cards-list {
    padding: 0px 30px;
    &::after {
      content: "";
      width: 255.5px;
    }
    @include media-breakpoint-down(md) {
      padding: 0px 60px;
    }
    @include media-breakpoint-down(sm) {
      padding: 0;
    }
    .router-link {
      width: 255.5px;
      .card {
        height: 22rem;
        color: black;
        box-shadow: 1px 1px 1px 0.5px rgba(0, 0, 0, 0.2);
        img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          @include border-top-radius($card-inner-border-radius);
        }
        .card-body {
          height: 75%;
          .card-title {
            font-weight: 600;
          }
          .card-text {
            height: 40%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  // 方案列表結束
  #no-project-found-block {
    width: 80%;
    img {
      width: 60%;
    }
  }
}
</style>