<template>
  <main id="cart" class="container">
    <div class="row mt-5">
      <div class="col-12">
        <h2 v-if="currentPage == '購物車'">您的購物車</h2>
        <h2 v-else>進行結帳</h2>
        <hr />
      </div>
    </div>
    <!-- 購物車區域開始 -->
    <section id="cart-area" class="row mb-5">
      <!-- 訂單列表部分開始 -->
      <div id="order-details-container" class="col-9">
        <div class="card">
          <div class="card-header px-3 d-flex align-items-center">
            <!-- 判定是否切換為結帳頁面 -->
            <h5 v-if="currentPage == '購物車'">已選方案</h5>
            <h5 v-else>第一步：確認方案內容</h5>
            <button
              id="clear-cart-btn"
              class="btn btn-danger ml-auto"
              @click.prevent="clearCart"
              v-if="currentPage == '購物車' && confirmProjectsArr.length != 0"
            >
              清空購物車
            </button>
          </div>
          <div class="card-body py-0">
            <div
              class="project-row row d-flex align-items-center"
              :class="{ 'has-project-divier': index > 0 ? true : false }"
              v-for="(project, index) in confirmProjectsArr"
              :data-id="
                project.bookingProjectID + '-' + project.bookingProjectDate
              "
              :key="index"
            >
              <!-- 方案頭貼與標題開始 -->
              <div class="col-6">
                <router-link
                  class="router-link d-flex flex-row align-items-center"
                  :to="{
                    name: '方案',
                    params: {
                      selectedProjectID: project.bookingProjectID,
                    },
                  }"
                >
                  <div
                    class="project-avatar-block d-flex justify-content-center"
                  >
                    <img
                      :src="confirmProjectsArr[index].bookingProjectAvatarUrl"
                      alt=""
                      class="project-avatar"
                    />
                  </div>
                  <h6 class="project-name ml-3">
                    {{ confirmProjectsArr[index].bookingProjectName }}
                  </h6>
                </router-link>
              </div>
              <!-- 方案頭貼與標題結束 -->
              <!-- 選擇人數欄位開始 -->
              <div class="col-3 d-flex flex-column align-items-center">
                <h6 v-if="currentPage == '購物車'">調整人數</h6>
                <h6 v-else>{{ project.bookingProjectNumOfPeople }} 人</h6>
                <NumberInput
                  ref="numberInput"
                  class="w-100"
                  :uniqueKey="project.bookingProjectID"
                  :incomingValue.sync="project.bookingProjectNumOfPeople"
                  v-if="currentPage == '購物車'"
                ></NumberInput>
              </div>
              <!-- 選擇人數欄位結束 -->
              <!-- 金額統計開始 -->
              <div class="col-2 d-flex flex-column align-items-center">
                <h5 class="project-final-price mb-0">
                  {{
                    (confirmProjectsArr[index].bookingProjectNumOfPeople *
                      confirmProjectsArr[index].bookingProjectPricePerPerson)
                      | currency
                      | dollarSign
                  }}
                </h5>
              </div>
              <!-- 金額統計結束 -->
              <!-- 刪除單項方案開始 -->
              <div class="col-1">
                <a
                  class="delete-single-project-icon d-inline-block"
                  href=""
                  @click.prevent="deleteSingleProject"
                  v-if="currentPage == '購物車'"
                  ><i class="fas fa-trash-alt"></i
                ></a>
              </div>
              <!-- 刪除單項方案結束 -->
            </div>
            <!-- 購物車全空提醒語開始 -->
            <div
              id="empty-cart-message"
              class="d-flex justify-content-center align-items-center"
              v-if="confirmProjectsArr.length == 0"
            >
              <h6>
                您的購物車目前是空的呢。
                請到「挑選航程」頁看看有沒有喜歡的方案吧！
              </h6>
            </div>
            <!-- 購物車全空提醒語結束 -->
          </div>
        </div>
      </div>
      <!-- 訂單列表部分結束 -->
      <!-- 訂單總額部分開始 -->
      <div id="order-amount-card-container" class="col-3 position-sticky">
        <div class="card text-center" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">訂單概覽</h5>
            <ul
              id="order-amount-list"
              class="my-4 mx-auto d-flex flex-column align-items-start"
            >
              <li>
                <span class="order-amount-title d-inline-block mr-1"
                  >選購：</span
                ><span class="order-amount-block d-inline-block">{{
                  confirmProjectsArr.length
                }}</span
                >個方案
              </li>
              <li>
                <span class="order-amount-title d-inline-block mr-1"
                  >總計：</span
                ><span class="order-amount-block d-inline-block">{{
                  calculateAmout | currency
                }}</span
                >元
              </li>
            </ul>
            <button
              class="btn btn-primary"
              @click.prevent="$router.push('/Cart/Checkout')"
              v-if="currentPage == '購物車' && confirmProjectsArr.length > 0"
            >
              進行結帳
            </button>
          </div>
        </div>
      </div>
      <!-- 訂單總額部分結束 -->
    </section>
    <!-- 購物車區域結束 -->
    <!-- 結帳區域開始 -->
    <router-view :confirmProjectsArr="confirmProjectsArr"></router-view>
    <!-- 結帳區域結束 -->
    <section id="recommendArea" class="row mb-5"></section>
  </main>
</template>

<script>
// 導入數字調控元件
import NumberInput from "@/components/pages/sub-components/NumberInput";

export default {
  data() {
    return {
      confirmProjectsArr: JSON.parse(localStorage.getItem("savingProjects")),
    };
  },
  components: { NumberInput },
  created() {
    this.confirmProjectsArr = this.confirmProjectsArr || [];
  },
  methods: {
    // 方法：刪除單一方案，覆寫 localStorage
    deleteSingleProject(e) {
      let storageArr = JSON.parse(localStorage.getItem("savingProjects"));
      let deleteProjectElement = e.target.closest("div.project-row");
      let deleteStorageID = deleteProjectElement.dataset.ID;
      let deleteStorageIndex = storageArr.findIndex(
        (project) => project.localstorageID == deleteStorageID
      );

      storageArr.splice(deleteStorageIndex, 1);

      this.confirmProjectsArr = storageArr;
      localStorage.setItem("savingProjects", JSON.stringify(storageArr));
    },
    // 方法：清空購物車和 localStorage
    clearCart() {
      localStorage.removeItem("savingProjects");
      this.confirmProjectsArr = [];
    },
  },
  computed: {
    // 方法：藉由動態路由自動回傳所在頁面名稱
    currentPage() {
      return this.$route.name;
    },
    // 方法：
    calculateAmout() {
      let amount = 0;
      this.confirmProjectsArr.forEach((project) => {
        let price =
          project.bookingProjectNumOfPeople *
          project.bookingProjectPricePerPerson;

        amount = amount + price;
      });
      return amount;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-title {
  font-weight: 600;
}
#clear-cart-btn {
  background-color: darkcyan;
}
.project-row {
  height: 150px;
  .router-link {
    color: black;
    .project-avatar-block {
      width: 120px;
      height: 80px;
      overflow: hidden;
      .project-avatar {
        height: 100%;
      }
    }
  }
  .project-final-price {
    color: darkred;
  }
  .delete-single-project-icon {
    color: black;
  }
  .project-divider {
    height: 30px;
  }
}
#empty-cart-message {
  height: 200px;
}
.has-project-divier {
  border-top: 1px solid lightcyan;
}
#order-amount-card-container {
  top: 0;
  #order-amount-list {
    width: 150px;
    padding: 0;
    li {
      list-style: none;
    }
  }
}
</style>