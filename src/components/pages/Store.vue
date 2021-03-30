<template>
  <!-- 挑選行程頁開始 -->
  <main id="store-page" class="container">
    <!-- 麵包屑開始 -->
    <Breadcrumb :breadCrumbData="breadCrumbData"></Breadcrumb>
    <!-- 麵包屑結束 -->
    <!-- 方案篩選器與方案列表開始 -->
    <div class="row">
      <aside id="aside-bar" class="col-xl-2 d-xl-block d-none">
        <ul id="category-list" class="py-3 pl-3">
          <li v-for="category in categoryList" :key="category['CATEGORY_ID']">
            <input
              type="checkbox"
              :name="category['CATEGORY_NAME']"
              :value="category['CATEGORY_ID']"
              v-model="selectedCategories"
            />
            {{ category["CATEGORY_NAME"] }}
          </li>
        </ul>
      </aside>
      <!-- 方案列表開始 -->
      <section class="container col-xl-10 col-12 mb-5">
        <ul
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
                <p class="card-text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Facilis tenetur temporibus cupiditate pariatur dolorum eos
                  doloremque incidunt, laboriosam at nisi, quia necessitatibus
                  placeat repudiandae earum consectetur dolore expedita
                  accusamus tempore.
                </p>
                <div class="row">
                  <div class="col-6">
                    最少 {{ project["PROJECT_MIN_NUM_OF_PEOPLE"] }} 人成團
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
      categoryList: [],
      selectedCategories: [],
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

    this.$http.get(categoryListAPI).then((response) => {
      vm.categoryList = response.data;
      console.log(vm.categoryList);
    });

    this.$http.post(projectsListAPI, JSON.stringify([])).then((response) => {
      vm.allProjectsArr = response.data;
      console.log(vm.allProjectsArr);
    });
  },
  methods: {
    // 方法：獲得頁碼元件傳回的當前頁面內容
    getCurrentContentAndSerial(arr, num) {
      this.currentPageContentArr = arr;
      this.currentPageContentArrSerial = num;
    },
  },
  watch: {
    // 監看（方法）：篩選分類即向後端調回所屬產品
    selectedCategories() {
      const projectsListAPI = `${process.env.REMOTE_HOST_PATH}/API/Forestage/QueryProjectsList.php`;
      const vm = this;

      this.$http
        .post(projectsListAPI, JSON.stringify(vm.selectedCategories))
        .then((response) => {
          vm.allProjectsArr = response.data;
        });
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
  padding-top: $main-container-pt;
  // 方案篩選器開始
  aside {
    height: 30rem;
    border: 1px solid $bootstrap-border-color;
    box-shadow: 1px 1px 1px 0.5px rgba(0, 0, 0, 0.2);
    #category-list {
      li {
        list-style: none;
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
}
</style>