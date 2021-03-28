<template>
  <div class="card-body position-relative">
    <h4>檢視訂單</h4>
    <!-- 會員訂單區開始 -->
    <div class="row">
      <div class="col-12 mt-3 mb-4">
        <div v-if="!viewingOrder.viewDetails">
          <div class="d-inline-block mr-3">
            <label for="member-orders-status">訂單狀態</label>
            <select
              id="member-orders-status"
              class="form-control form-select-lg"
            >
              <option value="3">全部</option>
              <option value="2">已完成</option>
              <option value="1">進行中</option>
              <option value="0">已取消</option>
            </select>
          </div>
          <h6 class="d-inline-block">*系統將提供90天內的訂單</h6>
        </div>
        <div v-else>
          <a href="" class="d-block" @click.prevent="returnToOrdersList"
            >回到訂單檢視</a
          >
          <h6 class="d-inline-block">
            正在檢視：<span>{{ viewingOrder.ID }}</span> 號訂單
          </h6>
          <h6 class="d-inline-block mx-3">
            訂單狀態：<span>{{ viewingOrder.status | orderStatus }}</span>
          </h6>
          <h6 class="d-inline-block">
            訂單日期：<span>{{ viewingOrder.date }}</span>
          </h6>
        </div>
      </div>
      <div class="col-12">
        <ul
          id="member-orders-list"
          class="p-0"
          v-if="currentPageContentArr.length > 0"
        >
          <li
            v-for="(order, index) in currentPageContentArr"
            :key="order['ORDER_DETAIL_ID']"
            class="py-md-0 py-3 d-flex justify-content-around align-items-center"
            @click.prevent="returnMethod(index)"
          >
            <h6 class="order-info m-0 text-center">
              <h6 class="mini-title mb-1">序列</h6>
              {{
                currentPageContentSerial[viewingOrderDetail.viewingMoreIndex] ||
                currentPageContentSerial[index]
              }}
            </h6>
            <h6 class="order-info m-0">
              <h6 class="mini-title mb-1">
                <span v-if="!viewingOrder.viewDetails">訂單編號</span>
                <span v-else>選擇方案</span>
              </h6>
              <span v-if="!viewingOrder.viewDetails">{{
                order["ORDER_ID"]
              }}</span>
              <span v-else>{{ order["PROJECT_NAME"] }}</span>
            </h6>
            <h6 class="order-info m-0">
              <h6 class="mini-title mb-1">
                <span v-if="!viewingOrder.viewDetails">訂單日期</span>
                <span v-else>預約日期</span>
              </h6>
              <span v-if="!viewingOrder.viewDetails">{{
                order["ORDER_DATE"]
              }}</span>
              <span v-else>{{ order["BOOKING_DATE"] }}</span>
            </h6>
            <h6 class="order-info m-0 text-center">
              <h6 class="mini-title mb-1">
                <span v-if="!viewingOrder.viewDetails">訂購人姓名</span>
                <span v-else>主要聯絡人姓名</span>
              </h6>
              <span v-if="!viewingOrder.viewDetails">{{
                order["ORDER_MC_NAME"]
              }}</span>
              <span v-else>{{ order["ORDER_DETAIL_MC_NAME"] }}</span>
            </h6>
            <h6 class="order-info m-0 text-center">
              <h6 class="mini-title mb-1">
                <span v-if="!viewingOrder.viewDetails">訂單總額</span>
                <span v-else>細項總額</span>
              </h6>
              <span v-if="!viewingOrder.viewDetails">
                {{
                  (order["ORDER_TOTAL_CONSUMPTION"] -
                    order["ORDER_TOTAL_DISCOUNT"])
                    | currency
                    | dollarSign
                }}
              </span>
              <span v-else>{{
                order["ORDER_DETAIL_AMOUNT"] | currency | dollarSign
              }}</span>
            </h6>
            <h6
              class="order-info m-0 text-center"
              v-if="!viewingOrder.viewDetails"
            >
              <h6 class="mini-title mb-1">細項數量</h6>
              {{ order["ORDER_DETAILS_NUM"] }}個
            </h6>
            <h6 class="order-info m-0 text-center">
              <h6 class="mini-title mb-1">
                <span v-if="!viewingOrder.viewDetails">訂單狀態</span>
                <span v-else>細項狀態</span>
              </h6>
              <span v-if="!viewingOrder.viewDetails">{{
                order["ORDER_STATUS"] | orderStatus
              }}</span>
              <span v-else>{{
                order["ORDER_DETAIL_STATUS"] | orderDetailStatus
              }}</span>
            </h6>
          </li>
          <li v-if="viewingOrderDetail.viewMore">
            <h1>show</h1>
          </li>
        </ul>
        <div v-else>
          <h1>空空如也～</h1>
        </div>
      </div>
    </div>
    <div id="pagination-container" class="position-absolute">
      <Pagination
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

      this.$http
        .post(api, vm.memberID)
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

.card-body {
  height: 750px;
  #member-orders-list {
    li {
      border: 1px solid black;
      height: 80px;
      list-style: none;
      cursor: pointer;
      @include media-breakpoint-down(md) {
        height: 160px;
      }
      .order-info {
        font-size: 15px;
        .mini-title {
          font-size: 12px;
        }
      }
    }
  }
  #pagination-container {
    transform: translate3d(-50%, -50%, 0);
    left: 50%;
    bottom: 3%;
  }
}
</style>