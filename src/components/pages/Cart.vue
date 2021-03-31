<template>
  <main id="cart-page" class="container">
    <!-- 麵包屑開始 -->
    <Breadcrumb :breadCrumbData="breadCrumbData"></Breadcrumb>
    <!-- 麵包屑結束 -->
    <div class="row">
      <div class="col-12">
        <h2 v-if="returnCurrentPage == '購物車'">您的購物車</h2>
        <h2 v-else>進行結帳</h2>
        <hr />
      </div>
    </div>
    <!-- 驗證套件 vee-validate 監看區域開始 -->
    <ValidationObserver v-slot="{ invalid }">
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
              <h5 v-if="returnCurrentPage == '購物車'">已選方案</h5>
              <h5 v-else>第一步：確認方案內容</h5>
              <button
                id="clear-cart-btn"
                class="btn btn-danger ml-auto"
                @click.prevent="clearCart"
                v-if="
                  returnCurrentPage == '購物車' &&
                  confirmProjectsArr.length != 0
                "
              >
                清空購物車
              </button>
            </div>
            <div class="card-body py-0 position-relative">
              <!-- 方案項目開始 -->
              <CartListItem
                v-for="(project, index) in confirmProjectsArr"
                :data-id="
                  project.bookingProjectID + '-' + project.bookingProjectDate
                "
                :list="confirmProjectsArr"
                :index="index"
                :listItem="project"
                :currentPage="returnCurrentPage"
                :key="index"
              ></CartListItem>
              <!-- 方案項目結束 -->
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
          <!-- 結帳區域開始 -->
          <router-view
            ref="cart"
            :confirmProjectsArr="confirmProjectsArr"
            :returnCurrentPage="returnCurrentPage"
          ></router-view>
          <!-- 結帳區域結束 -->
          <!-- </ValidationObserver> -->
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
                    returnAmout | currency
                  }}</span
                  >元
                </li>
              </ul>
              <!-- 判斷該出現屬於購物車還是結帳頁的行動按鈕 -->
              <button
                class="btn btn-action-now"
                @click.prevent="$router.push('/Cart/Checkout')"
                v-if="
                  returnCurrentPage == '購物車' && confirmProjectsArr.length > 0
                "
              >
                進行結帳
              </button>
              <input
                v-else-if="
                  returnCurrentPage != '購物車' && confirmProjectsArr.length > 0
                "
                type="submit"
                :value="invalid ? '請填資料' : '立即結帳'"
                class="btn btn-action-now"
                :class="{ 'invalid-btn': invalid }"
                :disabled="invalid"
                @click.prevent="
                  $refs.cart.$refs.formContactInfo.emitCheckOutData
                "
                data-toggle="modal"
                data-target="#modal"
                data-backdrop="static"
              />
            </div>
          </div>
        </div>
        <!-- 訂單總額部分結束 -->
      </section>
      <!-- 購物車區域結束 -->
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
              returnAmout | currency
            }}</span
            >元
          </li>
        </ul>
        <button
          v-if="returnCurrentPage == '購物車' && confirmProjectsArr.length > 0"
          class="btn btn-action-now d-flex align-items-center"
        >
          <h5 class="mb-0 d-inline-block">進行結帳</h5>
        </button>
        <input
          v-else-if="
            returnCurrentPage != '購物車' && confirmProjectsArr.length > 0
          "
          type="submit"
          :value="invalid ? '請填資料' : '立即結帳'"
          class="btn btn-action-now"
          :class="{ 'invalid-btn': invalid }"
          :disabled="invalid"
          @click.prevent="$refs.cart.$refs.formContactInfo.emitCheckOutData"
          data-toggle="modal"
          data-target="#modal"
          data-backdrop="static"
        />
      </div>
      <!-- （行動版）結帳按鈕開始結束 -->
    </ValidationObserver>
    <!-- 驗證套件 vee-validate 監看區域結束 -->
  </main>
</template>

<script>
// 導入麵包屑元件
import Breadcrumb from "@/components/pages/sub-components/Breadcrumb";
// 導入結帳項目元件
import CartListItem from "@/components/pages/sub-components/CartListItem";

export default {
  data() {
    return {
      breadCrumbData: {
        pagesArr: ["首頁", "購物車"],
        currentPage: 2,
      },
      confirmProjectsArr: JSON.parse(localStorage.getItem("savingProjects")),
    };
  },
  components: { Breadcrumb, CartListItem },
  created() {
    window.scrollTo(0, 0);

    this.confirmProjectsArr = this.confirmProjectsArr || [];
  },
  methods: {
    // 方法：清空購物車和 localStorage
    clearCart() {
      localStorage.removeItem("savingProjects");
      this.confirmProjectsArr = [];
      this.$eventBus.$emit("emitCartUpdate", 0);
    },
  },
  computed: {
    // 計算（方法）：藉由動態路由自動回傳所在頁面名稱
    returnCurrentPage() {
      return this.$route.name;
    },
    // 計算（方法）：計算並回傳方案的總售價
    returnAmout() {
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
  watch: {
    // 監看（方法）：
    // invalid() {
    //   console.log(this.provide.invalid);
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/all.scss";

$desktop-nav-bar-height: 105px;

#cart-page {
  padding: $desktop-nav-bar-height + $main-container-pt 0 $main-container-pt;
  .btn-action-now {
    background-color: $action-now !important;
    color: $sail;
    cursor: pointer;
    &:hover {
      color: $sail;
    }
  }
  .invalid-btn {
    background-color: grey !important;
    cursor: not-allowed;
  }
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
      .order-amount-list {
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
    @include media-breakpoint-up(lg) {
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
}
</style>