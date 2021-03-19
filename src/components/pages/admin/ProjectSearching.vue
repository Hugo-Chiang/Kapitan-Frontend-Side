<template>
  <section>
    <!-- 查詢輸入表單區域開始 -->
    <div class="row">
      <div class="col-10">
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="project-id">方案編號</label>
            <input
              type="text"
              class="form-control"
              id="project-id"
              placeholder="PJ0000001"
              v-model="queryData.projectID"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="project-name">方案名稱</label>
            <input
              type="text"
              class="form-control"
              id="project-name"
              placeholder="可輸入全名或關鍵詞"
              v-model="queryData.projectName"
            />
          </div>
          <div class="form-group col-md-3">
            <label for="project-status">方案狀態</label>
            <select
              id="project-status"
              class="form-control form-select-lg"
              v-model="queryData.projectStatus"
            >
              <option disabled selected value>－請選擇－</option>
              <option value="%%">全部</option>
              <option value="1">上線中</option>
              <option value="0">已下線</option>
            </select>
          </div>
        </div>
      </div>
      <div id="rechoose-mode-link" class="col-2 d-flex justify-content-end">
        <a href="" @click.prevent="$router.push('/Admin/Projects-Manager')"
          >重選模式
          <i class="fas fa-sign-out-alt"></i>
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-10">
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="project-category">所屬分類</label>
            <select
              id="project-category"
              class="form-control form-select-lg"
              v-model="queryData.projectCategory"
            >
              <option disabled selected value>－請選擇－</option>
              <option value="%%">全選</option>
              <option
                v-for="category in categoryList"
                :key="category['CATEGORY_NAME']"
                :value="category['CATEGORY_NAME']"
              >
                {{ category["CATEGORY_NAME"] }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <label for="project-departure-location">會合地點</label>
            <input
              type="text"
              class="form-control"
              id="project-departure-location"
              placeholder="可輸入全名或關鍵詞"
              v-model="queryData.projectDepartureLocation"
            />
          </div>
          <div class="form-group col-md-3">
            <label for="project-price-beyond" class="form-label"
              >人均價格<span class="remarks">（含以下）</span></label
            >
            <div class="h-50 px-1 d-flex flex-column align-items-start">
              <div class="project-price-str">
                {{
                  Number(queryData.projectPriceBeyond) | currency | dollarSign
                }}
              </div>
              <input
                type="range"
                class="form-range"
                min="0"
                max="10000"
                step="500"
                id="project-price-beyond"
                v-model="queryData.projectPriceBeyond"
              />
            </div>
          </div>
          <div class="form-group col-md-1 ml-3">
            <label for="">&nbsp;</label>
            <input
              type="button"
              class="btn btn-primary"
              value="進行查詢"
              @click.prevent="submitProjectsQuery"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 查詢輸入表單區域結束 -->
    <!-- 查詢結果表格區開始 -->
    <div>
      <h6 class="my-4">查詢結果：</h6>
      <table class="table table-striped queryResultsTable">
        <thead>
          <tr>
            <th class="text-center" scope="col">序號</th>
            <th class="text-center" scope="col">方案編號</th>
            <th class="text-center" scope="col">方案名稱</th>
            <th class="text-center" scope="col">所屬分類</th>
            <th class="text-center" scope="col">人均價格</th>
            <th class="text-center" scope="col">最小人數</th>
            <th class="text-center" scope="col">會合地點</th>
            <th class="text-center" scope="col">方案狀態</th>
          </tr>
        </thead>
        <tbody v-for="(order, index) in currentPageContentArr" :key="index">
          <tr
            class="order-item"
            @click.prevent="
              checkProjectDetails(currentPageContentArr[index].PROJECT_ID)
            "
          >
            <th class="text-center" scope="row">{{ index + 1 }}</th>
            <td>{{ currentPageContentArr[index].PROJECT_ID }}</td>
            <td class="text-center">
              {{ currentPageContentArr[index].PROJECT_NAME }}
            </td>
            <td class="text-center">
              {{ currentPageContentArr[index].CATEGORY_NAME }}
            </td>
            <td class="text-center">
              {{
                currentPageContentArr[index].PROJECT_ORIGINAL_PRICE_PER_PERSON
              }}
            </td>
            <td class="text-center">
              {{ currentPageContentArr[index].PROJECT_MIN_NUM_OF_PEOPLE }}
            </td>
            <td class="text-center">
              {{ currentPageContentArr[index].LOCATION_NAME }}
            </td>
            <td class="text-center">
              {{
                currentPageContentArr[index].PROJECT_STATUS == 0
                  ? "已下線"
                  : "上線中"
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="text-danger mt-5 text-center"
        v-if="currentPageContentArr.length <= 0"
      >
        查無資料
      </div>
      <div id="paginationContainer" class="d-flex justify-content-center mt-4">
        <Pagination
          v-show="currentPageContentArr.length > 0"
          :allContentArr="allProjectsArr"
          :itemsNumPerPage="itemsNumPerPage"
          @emitCurrentPageContentArr="getCurrentPageContentArr"
        ></Pagination>
      </div>
    </div>
    <!-- 查詢結果表格區結束 -->
  </section>
</template>

<script>
// 導入麵包屑元件
import Breadcrumb from "@/components/pages/sub-components/Breadcrumb";
// 導入
import Pagination from "@/components/pages/sub-components/Pagination";

export default {
  data() {
    return {
      currentMode: "",
      breadCrumbData: {
        pagesArr: ["管理系統：方案管理", "管理系統：方案查詢"],
        currentPage: 2,
      },
      queryData: {
        projectID: "",
        projectName: "",
        projectStatus: "",
        projectCategory: "",
        projectDepartureLocation: "",
        projectPriceBeyond: 10000,
      },
      categoryList: [],
      allProjectsArr: [],
      itemsNumPerPage: 5,
      currentPageContentArr: [],
    };
  },
  components: { Breadcrumb, Pagination },
  created() {
    const categoryListAPI = `${process.env.REMOTE_HOST_PATH}/API/Forestage/QueryCategoryList.php`;
    const vm = this;

    this.$http.get(categoryListAPI).then((response) => {
      vm.categoryList = response.data;
    });
  },
  methods: {
    // 方法：向後端送出查詢表單，以拿回相關訂單進行頁面渲染
    submitProjectsQuery() {
      const QueryProjectsAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/QueryProjects.php`;
      const vm = this;

      this.$http
        .post(QueryProjectsAPI, JSON.stringify(vm.queryData))
        .then((response) => {
          console.log(response.data);
          vm.allProjectsArr = response.data;
        })
        .catch((respponse) => {
          console.log(respponse);
        });
    },
    // 方法：獲得頁碼元件傳回的當前頁面內容
    getCurrentPageContentArr(arr) {
      this.currentPageContentArr = arr;
    },
    // 方法：點擊訂單進行入詳情頁
    checkProjectDetails(manageProjectID) {
      localStorage.removeItem("managingProject");
      localStorage.setItem("managingProject", manageProjectID);
      this.$router.push({ name: "管理系統：編輯方案" });
    },
  },
};
</script>

<style lang="scss" scoped>
h5 {
  span {
    font-size: 12px;
    color: green;
  }
}
#rechoose-mode-link {
  a {
    color: black;
    &:hover {
      opacity: 0.7;
    }
  }
}
.remarks {
  font-size: 12px;
}
.project-price-str {
  font-size: 12px;
  font-weight: 600;
  margin-top: -2px;
}
.queryResultsTable {
  tr {
    th {
      font-size: 14px;
    }
    td {
      font-size: 12px;
    }
  }
  .order-item {
    cursor: pointer;
  }
}
</style>