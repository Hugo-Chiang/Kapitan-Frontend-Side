<template>
  <div class="card-body position-relative">
    <h4>查詢訂單</h4>
    <!-- 會員訂單區開始 -->
    <div class="row">
      <div class="col-12 mt-3 mb-4">
        <div v-if="!inOrderDetailsView">
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
          <a href="" class="d-block" @click.prevent="bb">回到訂單查詢</a>
          <h6 class="d-inline-block">
            正在查詢：<span>{{ viewingOrder.ID }}</span> 號訂單
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
            @click.prevent="aa(index)"
          >
            <h6 class="order-info m-0 text-center">
              <h6 class="mini-title mb-1">查詢序列</h6>
              {{ currentPageContentSerial[index] }}
            </h6>
            <h6 class="order-info m-0">
              <h6 class="mini-title mb-1">
                <span v-if="!inOrderDetailsView">訂單編號</span>
                <span v-else>選擇方案</span>
              </h6>
              <span v-if="!inOrderDetailsView">{{ order["ORDER_ID"] }}</span>
              <span v-else>{{ order["PROJECT_NAME"] }}</span>
            </h6>
            <h6 class="order-info m-0">
              <h6 class="mini-title mb-1">
                <span v-if="!inOrderDetailsView">訂單日期</span>
                <span v-else>預約日期</span>
              </h6>
              <span v-if="!inOrderDetailsView">{{ order["ORDER_DATE"] }}</span>
              <span v-else>{{ order["BOOKING_DATE"] }}</span>
            </h6>
            <h6 class="order-info m-0 text-center">
              <h6 class="mini-title mb-1">
                <span v-if="!inOrderDetailsView">訂購人姓名</span>
                <span v-else>主要聯絡人姓名</span>
              </h6>
              <span v-if="!inOrderDetailsView">{{
                order["ORDER_MC_NAME"]
              }}</span>
              <span v-else>{{ order["ORDER_DETAIL_MC_NAME"] }}</span>
            </h6>
            <h6 class="order-info m-0 text-center">
              <h6 class="mini-title mb-1">
                <span v-if="!inOrderDetailsView">訂單總額</span>
                <span v-else>細項總額</span>
              </h6>
              <span v-if="!inOrderDetailsView">
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
            <h6 class="order-info m-0 text-center" v-if="!inOrderDetailsView">
              <h6 class="mini-title mb-1">細項數量</h6>
              3個
            </h6>
            <h6 class="order-info m-0 text-center">
              <h6 class="mini-title mb-1">
                <span v-if="!inOrderDetailsView">訂單狀態</span>
                <span v-else>細項狀態</span>
              </h6>
              <span v-if="!inOrderDetailsView">{{
                order["ORDER_STATUS"] | orderStatus
              }}</span>
              <span v-else>{{
                order["ORDER_DETAIL_STATUS"] | orderDetailStatus
              }}</span>
            </h6>
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
      inOrderDetailsView: false,
      viewingOrder: {
        ID: "",
        date: "",
        status: "",
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
              vm.ordersArr.push(vm.orderDetailsArr[i]);
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
    aa(selectedIndex) {
      if (!this.inOrderDetailsView) {
        this.inOrderDetailsView = true;
        this.viewingOrder.ID = this.ordersArr[selectedIndex]["ORDER_ID"];
        this.viewingOrder.date = this.ordersArr[selectedIndex]["ORDER_DATE"];
        this.viewingOrder.status = this.ordersArr[selectedIndex][
          "ORDER_STATUS"
        ];
        // console.log(selectedID);

        // let arrLen = this.allContentArr.length;
        // let loopLen = arrLen + Math.ceil(arrLen / this.itemsNumPerPage);
        // this.allContentArr = [];

        // for (let i = 0; i < loopLen; i++) {
        //   if (i % (this.itemsNumPerPage + 1) == 0) {
        //     this.allContentArr.push(this.ordersArr[selectedIndex]);
        //   } else {
        //     console.log(this.orderDetailsArr[i - 1]["ORDER_ID"]);
        //     if (this.orderDetailsArr[i - 1]["ORDER_ID"] == selectedID) {
        //       this.allContentArr.push(this.orderDetailsArr[i - 1]);
        //     }
        //   }
        // }

        // this.ordersArr = newArr;
      }
    },
    // 方法：
    bb() {
      this.inOrderDetailsView = false;
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