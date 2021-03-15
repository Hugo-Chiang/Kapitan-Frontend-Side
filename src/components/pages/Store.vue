<template>
  <!-- 挑選行程頁開始 -->
  <main class="container">
    <!-- 麵包屑開始 -->
    <div class="row">
      <div class="col-12 pt-2">
        <Breadcrumb :breadCrumbData="breadCrumbData"></Breadcrumb>
      </div>
    </div>
    <!-- 麵包屑結束 -->
    <!-- 方案篩選器與方案列表開始 -->
    <div class="row">
      <div class="col-lg-2 d-lg-block d-none">
        <aside id="aside-bar">
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
      </div>
      <!-- 方案列表開始 -->
      <div id="cards-list" class="container col-lg-10 col-12 mb-5">
        <ul class="row p-0 d-flex justify-content-center">
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
            class="router-link d-block col-lg-4 col-md-5 col-9 mx-lg-0 mx-md-1 mb-4"
          >
            <li class="card" :key="project['PROJECT_ID']">
              <img
                class="card-img-top"
                src="https://picsum.photos/286/180"
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
                <h6 class="card-price">
                  {{
                    Number(project["PROJECT_ORIGINAL_PRICE_PER_PERSON"])
                      | currency
                      | dollarSign
                  }}
                </h6>
              </div>
            </li>
          </router-link>
          <!-- 方案卡片結束 -->
        </ul>
      </div>
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
          @emitCurrentPageContentArr="getCurrentPageContentArr"
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
      itemsNumPerPage: 9,
      currentPageNum: 1,
    };
  },
  components: {
    Breadcrumb,
    Pagination,
  },
  created() {
    // const api = `${process.env.REMOTE_HOST_PATH}/API/Forestage/QueryProjectsList.php`;
    const categoryListAPI = `${process.env.LOCAL_HOST_PATH}/API/Forestage/QueryCategoryList.php`;
    const projectsListAPI = `${process.env.LOCAL_HOST_PATH}/API/Forestage/QueryProjectsList.php`;
    const vm = this;

    this.$http.get(categoryListAPI).then((response) => {
      console.log(response.data);
      vm.categoryList = response.data;
    });

    this.$http.post(projectsListAPI, JSON.stringify([])).then((response) => {
      vm.allProjectsArr = response.data;
    });
  },
  methods: {
    // 方法：獲得頁碼元件傳回的當前頁面內容
    getCurrentPageContentArr(arr) {
      this.currentPageContentArr = arr;
    },
  },
  watch: {
    selectedCategories() {
      const projectsListAPI = `${process.env.LOCAL_HOST_PATH}/API/Forestage/QueryProjectsList.php`;
      const vm = this;

      this.$http
        .post(projectsListAPI, JSON.stringify(vm.selectedCategories))
        .then((response) => {
          vm.allProjectsArr = response.data;
        });
    },
  },
};
</script>

<style lang="scss" scope>
@import "../../assets/all.scss";

// div,
// p,
// ul,
// li {
//   border: 1px solid red;
// }

// 方案篩選器開始
aside {
  border: 1px solid grey;
  height: 30rem;
  #category-list {
    li {
      list-style: none;
    }
  }
}
// 方案篩選器結束
// 方案列表開始
#cards-list {
  .router-link {
    &:last-child {
      @include media-breakpoint-down(md) {
        position: relative;
        right: calc((297.5px + 8px) / 2);
      }
      @include media-breakpoint-down(xs) {
        position: static;
        right: 0;
      }
    }
    .card {
      height: 22rem;
      color: black;
      box-shadow: 1px 1px 1px 0.5px rgba(0, 0, 0, 0.2);
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
</style>