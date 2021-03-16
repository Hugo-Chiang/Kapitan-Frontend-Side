<template>
  <main id="cart" class="container pb-5">
    <div class="row mt-5">
      <div class="col-12">
        <h2 v-if="currentPage == '購物車'">您的購物車</h2>
        <h2 v-else>進行結帳</h2>
        <hr />
      </div>
    </div>
    <!-- 購物車區域開始 -->
    <section id="cart-area" class="row d-flex">
      <!-- 訂單列表部分開始 -->
      <div
        id="order-details-container"
        class="order-lg-1 col-lg-9 order-2 col-12"
      >
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
          <div class="card-body py-0 position-relative">
            <div
              class="project-row row py-md-0 py-3 d-flex align-items-center"
              :class="{ 'has-project-divier': index > 0 ? true : false }"
              v-for="(project, index) in confirmProjectsArr"
              :data-id="
                project.bookingProjectID + '-' + project.bookingProjectDate
              "
              :key="index"
            >
              <!-- 方案頭貼、標題與日期開始 -->
              <div class="col-md-6 mb-md-0 col-12 mb-2">
                <router-link
                  class="router-link d-flex flex-row align-items-center order-1"
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
                  <div class="pl-3">
                    <h6 class="project-name">
                      {{ confirmProjectsArr[index].bookingProjectName }}
                    </h6>
                    <h6 class="project-name-booking-date">
                      預約日期：<span>{{
                        confirmProjectsArr[index].bookingProjectDate
                      }}</span>
                    </h6>
                  </div>
                </router-link>
              </div>
              <!-- 方案頭貼、標題與日期結束 -->
              <!-- 選擇人數欄位開始 -->
              <div
                class="col-md-3 order-md-2 col-sm-7 my-sm-0 col-8 my-3 order-3 d-flex flex-md-column flex-row align-items-center"
              >
                <h6
                  class="adjust-num-title my-md-2 mr-md-0 mr-2 mb-0"
                  v-if="currentPage == '購物車'"
                >
                  人數
                </h6>
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
              <div
                class="col-md-2 order-md-3 col-sm-3 col-4 order-2 d-flex flex-column align-items-center"
              >
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
              <div class="col-md-1 col-sm-1 my-sm-0 order-4 col-12 my-3 d-flex">
                <a
                  class="delete-single-project-icon d-inline-block mx-auto"
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
      <div
        id="order-amount-card-container"
        class="px-0 order-lg-2 col-lg-3 order-1 col-10 mx-auto"
      >
        <div class="card text-center" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">訂單概覽</h5>
            <ul
              class="order-amount-list my-4 mx-auto d-flex flex-lg-column align-items-start"
            >
              <li class="mr-lg-0 mr-4">
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
    <section id="recommend-area" class="row mb-5"></section>
    <!-- （行動版）結帳按鈕開始 -->
    <div
      id="mobile-collapse-window"
      class="px-4 py-3 mx-auto d-flex justify-content-between align-items-center"
      @click.prevent="$router.push('/Cart/Checkout')"
    >
      <ul class="order-amount-list p-0 m-0">
        <li class="mr-lg-0 mr-4">
          <span class="order-amount-title d-inline-block mr-1">選購：</span
          ><span class="order-amount-block d-inline-block">{{
            confirmProjectsArr.length
          }}</span
          >個方案
        </li>
        <li>
          <span class="order-amount-title d-inline-block mr-1">總計：</span
          ><span class="order-amount-block d-inline-block">{{
            calculateAmout | currency
          }}</span
          >元
        </li>
      </ul>
      <button class="btn d-flex align-items-center">
        <div class="mr-1 d-inline-block">
          <i class="far fa-hand-pointer"></i>
        </div>
        <h5 class="mb-0 d-inline-block">進行結帳</h5>
      </button>
    </div>
    <!-- （行動版）結帳按鈕開始結束 -->
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
@import "../../assets/all.scss";

$desktop-nav-bar-height: 105px;

.card-title {
  font-weight: 600;
}
#clear-cart-btn {
  background-color: darkcyan;
}
.project-row {
  height: 150px;
  @include media-breakpoint-down(md) {
    height: 250px;
  }
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
    .project-name {
      font-weight: 600;
      color: $deep-teal;
      @include media-breakpoint-down(md) {
        font-size: 15px;
      }
    }
    .project-name-booking-date {
      font-size: 14px;
      @include media-breakpoint-down(md) {
        font-size: 13px;
      }
    }
  }
  .adjust-num-title {
    font-size: 14px;
  }
  .project-final-price {
    color: darkred;
    @include media-breakpoint-down(md) {
      font-size: 16px;
    }
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
  position: relative;
  .card {
    @include media-breakpoint-up(lg) {
      width: 100% !important;
      position: sticky;
      top: $desktop-nav-bar-height + 30px;
    }
    @include media-breakpoint-down(md) {
      display: none;
    }
    #order-amount-list {
      width: 150px;
      padding: 0;
      @include media-breakpoint-down(md) {
        width: 100%;
        justify-content: center;
      }
      li {
        list-style: none;
      }
    }
  }
}
#mobile-collapse-window {
  width: 350px;
  height: 100px;
  border-radius: 10px;
  background-color: $sail;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  position: sticky;
  bottom: 5%;
  z-index: 10;
  @include media-breakpoint-up(md) {
    display: none !important;
  }
  .order-amount-list {
    li {
      list-style: none;
    }
  }
  button {
    background-color: $deep-teal;
    color: $sail;
  }
}
</style>