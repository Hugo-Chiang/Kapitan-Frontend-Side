<template>
  <div
    id="member-orders-searching-sub-page"
    class="card-body position-relative"
    :class="currentPageContentArr.length > 0 ? 'for-pagination-padding' : ''"
  >
    <h4 class="mb-4">檢視訂單</h4>
    <!-- 會員訂單區開始 -->
    <div class="row mb-4">
      <div class="col-12">
        <div v-if="!viewingOrder.viewDetails">
          <!-- 訂單狀態篩選開始 -->
          <div class="d-inline-block mr-3">
            <label for="member-orders-status">訂單狀態</label>
            <select
              id="member-orders-status"
              class="form-control form-select-lg"
              v-model="orderStatus"
              @change="queryMemberOrders"
            >
              <option value="%%">全部</option>
              <option value="2">已完成</option>
              <option value="1">進行中</option>
              <option value="0">已取消</option>
            </select>
          </div>
          <!-- 訂單狀態篩選結束 -->
          <h6 class="d-inline-block">*系統將提供90天內的訂單</h6>
        </div>
        <div v-else>
          <a
            href=""
            class="d-flex align-items-center mb-3"
            @click.prevent="returnToOrdersList"
          >
            回到「查詢訂單」
            <i class="fas fa-external-link-alt d-inline-block"></i>
          </a>
          <h6 class="d-md-inline-block">
            正在檢視：<span>{{ viewingOrder.ID }}</span> 號訂單
          </h6>
          <h6 class="d-md-inline-block mx-md-3">
            訂單狀態：<span :class="statusClass[viewingOrder.status]">{{
              viewingOrder.status | orderStatus
            }}</span>
          </h6>
          <h6 class="d-md-inline-block">
            訂單日期：<span>{{ viewingOrder.date }}</span>
          </h6>
        </div>
      </div>
    </div>
    <hr />
    <div class="row mt-4">
      <div class="col-12">
        <!-- 訂單列表開始 -->
        <ul
          id="member-orders-list"
          class="p-0"
          v-if="currentPageContentArr.length > 0 && !viewingOrder.viewDetails"
        >
          <li
            v-for="(order, index) in currentPageContentArr"
            :key="order['ORDER_DETAIL_ID']"
            class="container py-md-0 px-3 py-3 d-flex justify-content-between align-items-center"
            @click.prevent="viewOrderDetails(index)"
          >
            <div class="row w-100">
              <div
                class="col-12 d-flex flex-md-row justify-content-md-between align-items-md-center flex-column justify-content-between align-items-start"
              >
                <h6 class="list-item-info text-center m-md-0 d-md-block mb-1">
                  <h6 class="mini-title d-md-block mb-md-1 d-inline mb-0">
                    序列<span class="colon d-md-none">：</span>
                  </h6>
                  {{ currentPageContentSerial[index] }}
                </h6>
                <h6
                  class="list-item-info identify-id-or-name m-md-0 d-md-block mb-1"
                >
                  <h6 class="mini-title d-md-block mb-md-1 d-inline mb-0">
                    訂單編號<span class="colon d-md-none">：</span>
                  </h6>
                  {{ order["ORDER_ID"] }}
                </h6>
                <h6 class="list-item-info m-md-0 mb-1">
                  <h6 class="mini-title d-md-block mb-md-1 d-inline mb-0">
                    訂單日期<span class="colon d-md-none">：</span>
                  </h6>
                  {{ order["ORDER_DATE"] }}
                </h6>
                <h6
                  class="list-item-info contact-name m-0 text-md-center d-md-block"
                >
                  <h6 class="mini-title d-md-block mb-md-1 d-inline mb-0">
                    訂購人姓名<span class="colon d-md-none">：</span>
                  </h6>
                  {{ order["ORDER_MC_NAME"] }}
                </h6>
                <h6 class="list-item-info price m-md-0 text-md-center mb-1">
                  <h6 class="mini-title d-md-block mb-md-1 d-inline mb-0">
                    訂單總額<span class="colon d-md-none">：</span>
                  </h6>
                  <span class="order-amount">
                    {{
                      (order["ORDER_TOTAL_CONSUMPTION"] -
                        order["ORDER_TOTAL_DISCOUNT"])
                        | currency
                        | dollarSign
                    }}
                  </span>
                </h6>
                <h6
                  class="list-item-info m-md-0 text-center d-xl-block d-none"
                  v-if="!viewingOrder.viewDetails"
                >
                  <h6 class="mini-title d-md-block mb-md-1 d-inline mb-0">
                    細項數量
                  </h6>
                  {{ order["ORDER_DETAILS_NUM"] }}個
                </h6>
                <h6 class="list-item-info m-md-0 text-md-center mb-1">
                  <h6 class="mini-title d-md-block mb-md-1 d-inline mb-0">
                    訂單狀態<span class="colon d-md-none">：</span>
                  </h6>
                  <span :class="statusClass[order['ORDER_STATUS']]">
                    {{ order["ORDER_STATUS"] | orderStatus }}
                  </span>
                </h6>
              </div>
            </div>
          </li>
        </ul>
        <!-- 訂單列表結束 -->
        <!-- 訂單細項開始 -->
        <ul
          id="member-order-details"
          v-else-if="viewingOrder.viewDetails"
          class="p-0"
        >
          <li
            v-for="orderDetail in currentPageContentArr"
            :key="orderDetail['ORDER_DETAIL_ID']"
            class="order-detail col-12 mb-4"
          >
            <div class="card">
              <div
                class="card-header d-flex flex-md-row justify-content-md-between align-items-center flex-column"
              >
                <div class="d-flex align-items-center">
                  <div class="project-avatar-block mr-2 my-md-0 mt-2 mb-4">
                    <img
                      :src="
                        GlobalVariables.cloudUrlprefix +
                        (orderDetail['PROJECT_AVATAR_URL'] ||
                          GlobalVariables.cloudNoImgUrl)
                      "
                      alt=""
                    />
                  </div>
                  <h6>
                    {{ orderDetail["PROJECT_NAME"] }}
                    <span class="d-block mt-1">
                      預約日期：{{ orderDetail["BOOKING_DATE"] }}
                    </span>
                  </h6>
                </div>
                <h6 class="order-detail-amount">
                  {{
                    orderDetail["ORDER_DETAIL_AMOUNT"] | currency | dollarSign
                  }}
                </h6>
              </div>
              <div class="card-body container py-4 pl-md-4">
                <div class="row">
                  <div class="col-12">
                    <div class="row mb-4">
                      <div
                        class="col-xl-4 col-md-5 mr-md-auto d-flex flex-md-row justify-content-md-between align-items-md-center mb-md-0 flex-column mb-3"
                      >
                        <h6 class="mb-md-0 mb-md-2 mb-1">
                          <h6
                            class="mini-title d-md-block mb-md-1 d-inline mb-0"
                          >
                            方案狀態<span class="colon d-md-none">：</span>
                          </h6>
                          <span
                            :class="
                              statusClass[orderDetail['ORDER_DETAIL_STATUS']]
                            "
                          >
                            {{
                              orderDetail["ORDER_DETAIL_STATUS"]
                                | orderDetailStatus
                            }}
                          </span>
                        </h6>
                        <h6 class="mb-md-0 mb-md-2 mb-1">
                          <h6
                            class="mini-title d-md-block mb-md-1 d-inline mb-0"
                          >
                            會合地點<span class="colon d-md-none">：</span>
                          </h6>
                          {{ allContentArr[0]["LOCATION_NAME"] }}
                        </h6>
                      </div>
                      <div class="col-md-5 col-12">
                        <h6 class="mini-title mb-1">購買憑證：</h6>
                        <div class="bar-code-block d-lg-inline-block d-block">
                          <img
                            :src="`http://bwipjs-api.metafloor.com/?bcid=code128&text=${orderDetail['ORDER_DETAIL_CERTIFICATE']}&alttext=${orderDetail['ORDER_DETAIL_CERTIFICATE']}`"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row mb-3">
                      <div
                        class="col-12 d-flex flex-md-row align-items-md-center flex-column"
                      >
                        <h6 class="list-item-info flex-md-grow-1">
                          <h6
                            class="mini-title d-md-block mb-md-1 d-inline mb-0"
                          >
                            主要聯絡人姓名<span class="colon d-md-none"
                              >：</span
                            >
                          </h6>
                          {{ orderDetail["ORDER_DETAIL_MC_NAME"] }}
                        </h6>
                        <h6 class="list-item-info flex-md-grow-1">
                          <h6
                            class="mini-title d-md-block mb-md-1 d-inline mb-0"
                          >
                            主要聯絡人手機<span class="colon d-md-none"
                              >：</span
                            >
                          </h6>
                          {{ orderDetail["ORDER_DETAIL_MC_PHONE"] }}
                        </h6>
                        <h6 class="list-item-info flex-md-grow-1">
                          <h6
                            class="mini-title d-md-block mb-md-1 d-inline mb-0"
                          >
                            主要聯絡人電郵<span class="colon d-md-none"
                              >：</span
                            >
                          </h6>
                          {{ orderDetail["ORDER_DETAIL_MC_EMAIL"] }}
                        </h6>
                      </div>
                    </div>
                    <div class="row">
                      <div
                        class="col-12 d-flex flex-md-row align-items-md-center flex-column"
                      >
                        <h6 class="list-item-info flex-md-grow-1">
                          <h6
                            class="mini-title d-md-block mb-md-1 d-inline mb-0"
                          >
                            緊急聯絡人姓名<span class="colon d-md-none"
                              >：</span
                            >
                          </h6>
                          {{ orderDetail["ORDER_DETAIL_EC_NAME"] }}
                        </h6>
                        <h6 class="list-item-info flex-md-grow-1 mb-2">
                          <h6
                            class="mini-title d-md-block mb-md-1 d-inline mb-0"
                          >
                            緊急聯絡人手機<span class="colon d-md-none"
                              >：</span
                            >
                          </h6>
                          {{ orderDetail["ORDER_DETAIL_EC_PHONE"] }}
                        </h6>
                        <h6 class="list-item-info flex-md-grow-1">
                          <h6
                            class="mini-title d-md-block mb-md-1 d-inline mb-0"
                          >
                            緊急聯絡人電郵<span class="colon d-md-none"
                              >：</span
                            >
                          </h6>
                          {{ orderDetail["ORDER_DETAIL_EC_EMAIL"] }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- 訂單細項結束 -->
        <!-- 查無資料開始 -->
        <div v-else>
          <div
            id="no-order-found-block"
            class="mx-auto py-5 d-flex flex-column justify-content-center align-items-center"
          >
            <h3 class="text-center">什麼都沒有呢...</h3>
            <img
              :src="
                this.GlobalVariables.cloudUrlprefix +
                'Side-Projects/Frontend-Side-Projects-0001-Kapitan/Web-Imgs/vatcqfigc74lghjbqfxv.png'
              "
              alt=""
              class="my-3"
            />
            <h5 class="text-center">看看其他狀態的訂單吧！</h5>
          </div>
        </div>
        <!-- 查無資料結束 -->
      </div>
    </div>
    <!-- 頁碼開始 -->
    <div id="pagination-container" class="position-absolute">
      <Pagination
        v-show="currentPageContentArr.length > 0"
        :allContentArr="allContentArr"
        :itemsNumPerPage="itemsNumPerPage"
        @emitCurrentContentAndSerial="getCurrentContentAndSerial"
      ></Pagination>
    </div>
    <!-- 頁碼結束 -->
    <!-- 會員訂單區結束 -->
  </div>
</template>

<script>
import Pagination from "@/components/pages/sub-components/Pagination";

export default {
  data() {
    return {
      orderStatus: "%%",
      viewingOrder: {
        ID: "",
        date: "",
        status: "",
        viewingIndex: null,
        viewDetails: false,
      },
      statusClass: ["canceled", "processing", "finished"],
      ordersArr: [],
      orderDetailsArr: [],
      itemsNumPerPage: 5,
      allContentArr: [],
      currentPageContentArr: [],
      currentPageContentSerial: [],
    };
  },
  props: ["memberID"],
  components: {
    Pagination,
  },
  created() {
    this.GlobalFunctions.checkDuplicateLogin("forestage", this.memberID);
    this.queryMemberOrders();
  },
  methods: {
    // 方法：向後端查詢該會員近三個月訂單紀錄，以進行頁面渲染
    queryMemberOrders() {
      const api = `${process.env.REMOTE_HOST_PATH}/API/Forestage/QueryMemberOrders.php`;
      const vm = this;

      let sendingObj = {
        memberID: vm.memberID,
        orderStatus: vm.orderStatus,
      };

      this.$http
        .post(api, JSON.stringify(sendingObj))
        .then((response) => {
          vm.ordersArr = [];
          vm.orderDetailsArr = [];

          vm.orderDetailsArr = response.data;

          for (let i = 0; i < vm.orderDetailsArr.length; i++) {
            let orderDuplicate = false;

            vm.orderDetailsArr[i]["ORDER_DATE"] = new Date(
              vm.orderDetailsArr[i]["ORDER_DATE"]
            ).Format("yyyy-MM-dd");

            searching: for (let j = 0; j < vm.ordersArr.length; j++) {
              if (
                vm.orderDetailsArr[i]["ORDER_ID"] == vm.ordersArr[j]["ORDER_ID"]
              ) {
                orderDuplicate = true;
                break searching;
              }
            }

            if (!orderDuplicate) {
              vm.orderDetailsArr[i]["ORDER_DETAILS_NUM"] = 0;
              vm.ordersArr.push(vm.orderDetailsArr[i]);
            }
          }

          for (let i = 0; i < vm.orderDetailsArr.length; i++) {
            for (let j = 0; j < vm.ordersArr.length; j++) {
              if (
                vm.orderDetailsArr[i]["ORDER_ID"] == vm.ordersArr[j]["ORDER_ID"]
              ) {
                vm.ordersArr[j]["ORDER_DETAILS_NUM"]++;
              }
            }
          }

          vm.ordersArr.sort((a, b) => {
            return a["SORT_INDEX"] - b["SORT_INDEX"];
          });

          vm.allContentArr = vm.ordersArr;
        })
        .catch((respponse) => {
          console.log(respponse);
        });
    },
    // 方法：根據選擇索引，打開訂單，以觀看更多訂單細項
    viewOrderDetails(selectedIndex) {
      this.viewingOrder.viewingIndex = selectedIndex;
      this.viewingOrder.viewDetails = true;
      this.viewingOrder.ID = this.ordersArr[selectedIndex]["ORDER_ID"];
      this.viewingOrder.date = this.ordersArr[selectedIndex]["ORDER_DATE"];
      this.viewingOrder.status = this.ordersArr[selectedIndex]["ORDER_STATUS"];

      let filterArr = [];
      for (const object of this.orderDetailsArr) {
        if (object["ORDER_ID"] == this.viewingOrder.ID) {
          filterArr.push(object);
        }
      }

      this.allContentArr = filterArr;
    },
    // 方法：回到查詢訂單處
    returnToOrdersList() {
      this.viewingOrder.viewingIndex = null;
      this.viewingOrder.viewDetails = false;
      this.queryMemberOrders();
    },
    // 方法：獲得頁碼元件傳回的當前頁面內容
    getCurrentContentAndSerial(arr, num) {
      this.currentPageContentArr = arr;
      this.currentPageContentSerial = num;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/all.scss";

a {
  color: black;
}

.finished {
  color: green;
}
.processing {
  color: blue;
}
.canceled {
  color: red;
}

.card-body {
  .mini-title {
    font-size: 12px;
    font-weight: 500;
    @include media-breakpoint-down(sm) {
      font-size: 15px;
    }
  }
  #member-orders-list {
    li {
      border: 0.5px solid $bootstrap-border-color;
      background-color: $sail;
      border-bottom: none;
      height: 80px;
      list-style: none;
      cursor: pointer;
      &:nth-last-child(2n + 1) {
        background-color: white;
      }
      &:last-child {
        border-bottom: 0.5px solid $bootstrap-border-color;
      }
      @include media-breakpoint-down(lg) {
        height: 120px;
      }
      @include media-breakpoint-down(sm) {
        height: 160px;
      }
      .list-item-info {
        font-size: 15px;
        font-weight: 400;
      }
      .order-amount {
        font-size: 13px;
        font-weight: 500;
        color: darkred;
      }
    }
    .identify-id-or-name {
      width: 200px;
      @include media-breakpoint-down(lg) {
        width: 150px;
      }
      @include media-breakpoint-down(sm) {
        width: 200px;
      }
    }
    .contact-name {
      width: 100px;
      @include media-breakpoint-down(sm) {
        width: 200px;
      }
    }
    .price {
      width: 60px;
      @include media-breakpoint-down(sm) {
        width: 200px;
      }
    }
    .more-details-block {
      height: 150px;
      @include media-breakpoint-down(sm) {
        height: 350px;
      }
    }
  }
  #member-order-details {
    li {
      list-style: none;
    }
    .project-avatar-block {
      width: 135px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .order-detail-amount {
      color: darkred;
      font-size: 18px;
    }
    .bar-code-block {
      width: 90%;
      @include media-breakpoint-down(xs) {
        margin: 0;
      }
      img {
        width: 100%;
        height: 46px;
      }
    }
    .list-item-info {
      width: 33.3%;
      font-size: 15px;
      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }
  }
  #pagination-container {
    transform: translate3d(-50%, -50%, 0);
    left: 50%;
    bottom: 1%;
  }
  #no-order-found-block {
    width: 80%;
    img {
      width: 60%;
    }
  }
}
.for-pagination-padding {
  padding-bottom: 120px;
}
</style>