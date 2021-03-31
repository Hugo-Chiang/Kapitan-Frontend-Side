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
            訂單狀態：<span>{{ viewingOrder.status | orderStatus }}</span>
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
            @click.prevent="returnMethod(index)"
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
                  <!-- <span v-else>{{ order["PROJECT_NAME"] }}</span> -->
                </h6>
                <h6 class="list-item-info m-md-0 mb-1">
                  <h6 class="mini-title d-md-block mb-md-1 d-inline mb-0">
                    訂單日期<span class="colon d-md-none">：</span>
                    <!-- <span v-else>預約日期</span> -->
                  </h6>
                  {{ order["ORDER_DATE"] }}
                  <!-- <span v-else>{{ order["BOOKING_DATE"] }}</span> -->
                </h6>
                <h6
                  class="list-item-info contact-name m-0 text-md-center d-md-block"
                >
                  <h6 class="mini-title d-md-block mb-md-1 d-inline mb-0">
                    訂購人姓名<span class="colon d-md-none">：</span>
                    <!-- <span v-else>主要聯絡人姓名</span> -->
                  </h6>
                  {{ order["ORDER_MC_NAME"] }}
                  <!-- <span v-else>{{ order["ORDER_DETAIL_MC_NAME"] }}</span> -->
                </h6>
                <h6 class="list-item-info price m-md-0 text-md-center mb-1">
                  <h6 class="mini-title d-md-block mb-md-1 d-inline mb-0">
                    訂單總額<span class="colon d-md-none">：</span>
                    <!-- <span v-else>細項總額</span> -->
                  </h6>
                  {{
                    (order["ORDER_TOTAL_CONSUMPTION"] -
                      order["ORDER_TOTAL_DISCOUNT"])
                      | currency
                      | dollarSign
                  }}
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
                    <!-- <span v-else>細項狀態</span> -->
                  </h6>
                  {{ order["ORDER_STATUS"] | orderStatus }}
                </h6>
              </div>
            </div>
          </li>
          <!-- <li class="more-details-block p-3" v-if="viewingOrderDetail.viewMore">
            <div class="row">
              <div
                class="col-md-5 pr-lg-4 h-lg-100 m-md-0 col-12 mb-3 d-flex justify-content-md-between flex-md-row flex-column align-items-center"
              >
                <h6 class="list-item-info d-md-block d-flex align-items-center">
                  <div
                    class="project-avatar-block d-lg-flex d-sm-inline-flex d-flexs m-lg-0 mr-2 justify-content-between align-items-center"
                  >
                    <img
                      :src="
                        GlobalVariables.cloudUrlprefix +
                        (allContentArr[0]['PROJECT_AVATAR_URL'] ||
                          GlobalVariables.cloudNoImgUrl)
                      "
                      alt=""
                    />
                  </div>
                  <h6 class="mini-title w-lg-75 d-sm-block mb-sm-1 mb-0">
                    {{ allContentArr[0]["PROJECT_NAME"] }}
                  </h6>
                </h6>
                <h6 class="list-item-info m-md-0 my-3">
                  <h6 class="mini-title d-md-block mb-sm-1 d-inline">
                    會合地點<span class="colon d-md-none">：</span>
                  </h6>
                  {{ allContentArr[0]["LOCATION_NAME"] }}
                </h6>
              </div>
              <div
                class="col-md-7 d-flex flex-wrap justify-content-between align-items-center"
              >
              </div>
            </div>
          </li> -->
        </ul>
        <!-- 訂單列表結束 -->
        <!-- 訂單細項開始 -->
        <div
          v-else-if="viewingOrder.viewDetails"
          v-for="(orderDetail, index) in currentPageContentArr"
          :key="orderDetail"
          class="order-detail card mb-4"
        >
          <div
            class="card-header d-flex justify-content-between align-items-center"
          >
            <div class="d-flex align-items-center">
              <div class="project-avatar-block mr-2">
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
            <h6>
              {{ orderDetail["ORDER_DETAIL_AMOUNT"] | currency | dollarSign }}
            </h6>
          </div>
          <div class="card-body container py-4">
            <div class="row">
              <div class="col-3">
                <h6 class="text-lg-center mb-3">
                  <h6 class="mini-title d-sm-block mb-sm-1 d-inline mb-0">
                    方案狀態<span class="colon d-md-none">：</span>
                  </h6>
                  {{ orderDetail["ORDER_DETAIL_STATUS"] | orderDetailStatus }}
                </h6>
                <h6 class="text-lg-center">
                  <h6 class="mini-title d-sm-block mb-sm-1 d-inline mb-0">
                    會合地點<span class="colon d-md-none">：</span>
                  </h6>
                  {{ allContentArr[0]["LOCATION_NAME"] }}
                </h6>
              </div>
              <div class="col-9">
                <div class="row mb-3">
                  <div
                    class="col-12 d-flex justify-content-around align-items-center"
                  >
                    <h6 class="list-item-info text-lg-center">
                      <h6 class="mini-title d-sm-block mb-sm-1 d-inline mb-0">
                        主要聯絡人姓名<span class="colon d-md-none">：</span>
                      </h6>
                      {{ orderDetail["ORDER_DETAIL_MC_NAME"] }}
                    </h6>
                    <h6 class="list-item-info text-lg-center">
                      <h6 class="mini-title d-sm-block mb-sm-1 d-inline mb-0">
                        主要聯絡人手機<span class="colon d-md-none">：</span>
                      </h6>
                      {{ orderDetail["ORDER_DETAIL_MC_PHONE"] }}
                    </h6>
                    <h6 class="list-item-info text-lg-center">
                      <h6 class="mini-title d-sm-block mb-sm-1 d-inline mb-0">
                        主要聯絡人電郵<span class="colon d-md-none">：</span>
                      </h6>
                      {{ orderDetail["ORDER_DETAIL_MC_EMAIL"] }}
                    </h6>
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-12 d-flex justify-content-around align-items-center"
                  >
                    <h6 class="list-item-info text-lg-center">
                      <h6 class="mini-title d-sm-block mb-sm-1 d-inline mb-0">
                        緊急聯絡人姓名<span class="colon d-md-none">：</span>
                      </h6>
                      {{ orderDetail["ORDER_DETAIL_EC_NAME"] }}
                    </h6>
                    <h6 class="list-item-info text-lg-center mb-2">
                      <h6 class="mini-title d-sm-block mb-sm-1 d-inline mb-0">
                        緊急聯絡人手機<span class="colon d-md-none">：</span>
                      </h6>
                      {{ orderDetail["ORDER_DETAIL_EC_PHONE"] }}
                    </h6>
                    <h6 class="list-item-info text-lg-center">
                      <h6 class="mini-title d-sm-block mb-sm-1 d-inline mb-0">
                        緊急聯絡人電郵<span class="colon d-md-none">：</span>
                      </h6>
                      {{ orderDetail["ORDER_DETAIL_EC_EMAIL"] }}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 訂單細項結束 -->
        <!-- 查無資料開始 -->
        <div v-else>
          <div
            id="no-order-found-block"
            class="mx-auto py-5 d-flex flex-column justify-content-center align-items-center"
          >
            <h3 class="text-center">什麼都沒有呢...</h3>
            <img
              src="../../../assets/img/forestage/member-centre/people-on-yacht.jpg"
              alt=""
              class="my-5"
            />
            <h5 class="text-center mt-2">看看其他狀態的訂單吧！</h5>
          </div>
        </div>
        <!-- 查無資料結束 -->
      </div>
    </div>
    <div id="pagination-container" class="position-absolute">
      <Pagination
        v-show="currentPageContentArr.length > 0"
        :allContentArr="allContentArr"
        :itemsNumPerPage="itemsNumPerPage"
        @emitCurrentContentAndSerial="getCurrentContentAndSerial"
      ></Pagination>
    </div>
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
      viewingOrderDetail: {
        ID: "",
        viewingMoreIndex: null,
        viewMore: false,
      },
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
    // 方法：
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
    // 方法：
    returnToOrdersList() {
      this.viewingOrderDetail.viewingMoreIndex = null;
      this.viewingOrder.viewingIndex = null;
      this.viewingOrderDetail.viewMore = false;
      this.viewingOrder.viewDetails = false;
      this.queryMemberOrders();
    },
    // 方法：
    viewMoreDetails(selectedIndex) {
      this.viewingOrderDetail.viewingMoreIndex = selectedIndex;
      this.viewingOrderDetail.viewMore = true;
      this.viewingOrderDetail.ID = this.allContentArr[selectedIndex][
        "ORDER_DETAIL_ID"
      ];

      let orderDetailsArr = [];
      for (const object of this.orderDetailsArr) {
        if (object["ORDER_ID"] == this.viewingOrder.ID) {
          orderDetailsArr.push(object);
        }
      }

      let filterArr = [];
      filterArr.push(orderDetailsArr[selectedIndex]);

      this.allContentArr = filterArr;
    },
    // 方法：
    returnToOrderDetailsList() {
      this.viewOrderDetails(this.viewingOrder.viewingIndex);
      this.viewingOrderDetail.viewMore = false;
      this.viewingOrderDetail.viewingMoreIndex = null;
    },
    // 方法：獲得頁碼元件傳回的當前頁面內容
    getCurrentContentAndSerial(arr, num) {
      this.currentPageContentArr = arr;
      this.currentPageContentSerial = num;
    },
  },
  computed: {
    returnMethod() {
      if (!this.viewingOrder.viewDetails && !this.viewingOrderDetail.viewMore) {
        return this.viewOrderDetails;
      } else if (
        this.viewingOrder.viewDetails &&
        !this.viewingOrderDetail.viewMore
      ) {
        return this.viewMoreDetails;
      } else {
        return this.returnToOrderDetailsList;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/all.scss";

a {
  color: black;
}

.card-body {
  .mini-title {
    font-size: 12px;
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

  .order-detail {
    h5 {
      span {
        font-size: 14px;
      }
    }
    .project-avatar-block {
      width: 135px;
      overflow: hidden;
      img {
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
      width: 330px;
    }
  }
}
.for-pagination-padding {
  padding-bottom: 120px;
}
</style>