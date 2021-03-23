<template>
  <section id="order-searching" class="position-relative">
    <!-- 查詢輸入表單區域開始 -->
    <div class="row">
      <div class="col-10">
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="order-id">訂單編號</label>
            <input
              type="text"
              class="form-control"
              id="order-id"
              placeholder="OD0000000001"
              v-model="queryData.orderID"
            />
          </div>
          <div class="form-group col-md-3">
            <label for="order-date">訂單日期</label>
            <input
              type="date"
              class="form-control"
              id="order-date"
              v-model="queryData.orderDate"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="member-account">會員帳號</label>
            <input
              type="eamil"
              class="form-control"
              id="member-account"
              placeholder="Hello-World@email.com"
              v-model="queryData.memberAccount"
            />
          </div>
        </div>
      </div>
      <div
        id="rechoose-mode-link"
        class="col-2 ml-auto d-flex justify-content-end"
      >
        <a href="" @click.prevent="$router.push('/Admin/Orders-Manager')"
          >重選模式
          <i class="fas fa-sign-out-alt"></i>
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-10">
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="orderer-name">訂購人姓名</label>
            <input
              type="text"
              class="form-control"
              id="orderer-name"
              placeholder="訂購人姓名"
              v-model="queryData.ordererName"
            />
          </div>
          <div class="form-group col-md-3">
            <label for="orderer-phone">訂購人手機</label>
            <input
              type="text"
              class="form-control"
              id="orderer-phone"
              placeholder="0933128872"
              v-model="queryData.ordererPhone"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="orderer-email">訂購人電子信箱</label>
            <input
              type="email"
              class="form-control"
              id="orderer-email"
              placeholder="Hello-World@email.com"
              v-model="queryData.ordererEmail"
            />
          </div>
          <div class="form-group col-md-1 ml-3">
            <label for="">&nbsp;</label>
            <input
              type="button"
              class="btn btn-primary"
              value="進行查詢"
              @click.prevent="submitOrdersQuery"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 查詢輸入表單區域結束 -->
    <!-- 查詢結果表格區開始 -->
    <div class="row">
      <div class="col-12">
        <h6 class="my-4">查詢結果：</h6>
        <table class="table table-striped query-resultsTable">
          <thead>
            <tr>
              <th class="text-center" scope="col">序號</th>
              <th class="text-center" scope="col">訂單編號</th>
              <th class="text-center" scope="col">訂購人姓名</th>
              <th class="text-center" scope="col">訂購人手機</th>
              <th class="text-center" scope="col">訂購人電子信箱</th>
              <th class="text-center" scope="col">訂購單日期</th>
              <th class="text-center" scope="col">會員編號</th>
              <th class="text-center" scope="col">訂單總額</th>
            </tr>
          </thead>
          <tbody v-for="(order, index) in currentPageContentArr" :key="index">
            <tr
              class="order-item"
              @click.prevent="
                checkOrderDetails(currentPageContentArr[index]['ORDER_ID'])
              "
            >
              <th class="text-center" scope="row">
                {{ currentPageContentArrSerial[index] }}
              </th>
              <td>{{ currentPageContentArr[index]["ORDER_ID"] }}</td>
              <td class="text-center">
                {{ currentPageContentArr[index]["ORDER_MC_NAME"] }}
              </td>
              <td class="text-center">
                {{ currentPageContentArr[index]["ORDER_MC_PHONE"] }}
              </td>
              <td class="text-center">
                {{ currentPageContentArr[index]["ORDER_MC_EMAIL"] }}
              </td>
              <td class="text-center">
                {{ currentPageContentArr[index]["ORDER_DATE"] }}
              </td>
              <td class="text-center">
                {{ currentPageContentArr[index]["FK_MEMBER_ID_for_OD"] }}
              </td>
              <td class="text-center">
                {{
                  currentPageContentArr[index]["ORDER_TOTAL_CONSUMPTION"] -
                  currentPageContentArr[index]["ORDER_TOTAL_DISCOUNT"]
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
      </div>
    </div>
    <!-- 查詢結果表格區結束 -->
    <!-- 頁碼區開始 -->
    <div
      id="pagination-container"
      class="d-flex justify-content-center mt-4 position-absolute"
    >
      <Pagination
        v-show="currentPageContentArr.length > 0"
        :allContentArr="allOrdersArr"
        :itemsNumPerPage="itemsNumPerPage"
        @emitCurrentContentAndSerial="getCurrentContentAndSerial"
      ></Pagination>
    </div>
    <!-- 頁碼區結束 -->
  </section>
</template>

<script>
import Pagination from "@/components/pages/sub-components/Pagination";

export default {
  data() {
    return {
      queryData: {
        orderID: "",
        orderDate: "",
        memberAccount: "",
        ordererName: "",
        ordererPhone: "",
        ordererEmail: "",
      },
      allOrdersArr: [],
      itemsNumPerPage: 5,
      currentPageContentArr: [],
      currentPageContentArrSerial: [],
    };
  },
  components: { Pagination },
  methods: {
    // 方法：向後端送出查詢表單，以拿回相關訂單進行頁面渲染
    submitOrdersQuery() {
      const api = `${process.env.REMOTE_HOST_PATH}/API/Backstage/QueryOrders.php`;
      const vm = this;

      this.$http
        .post(api, JSON.stringify(vm.queryData))
        .then((response) => {
          vm.allOrdersArr = [];
          let responseArr = response.data;
          let unSortArr = [];

          for (let i = 0; i < responseArr.length; i++) {
            let projectDuplicate = false;

            searching: for (let j = 0; j < unSortArr.length; j++) {
              if (responseArr[i]["ORDER_ID"] == unSortArr[j]["ORDER_ID"]) {
                projectDuplicate = true;
                break searching;
              }
            }

            if (!projectDuplicate) {
              responseArr[i]["ORDER_DATE"] = new Date(
                responseArr[i]["ORDER_DATE"]
              ).Format("yyyy-MM-dd");
              unSortArr.push(responseArr[i]);
            }
          }

          let sortedArr = [];
          sortedArr.length = unSortArr.length;

          for (let i = 0; i < unSortArr.length; i++) {
            for (let j = 0; j < unSortArr.length; j++) {
              if (unSortArr[i]["SORT_INDEX"] == j) {
                sortedArr[j] = unSortArr[i];
              }
            }
          }

          vm.allOrdersArr = sortedArr;
        })
        .catch((respponse) => {
          console.log(respponse);
        });
    },
    // 方法：獲得頁碼元件傳回的當前頁面內容
    getCurrentContentAndSerial(arr, num) {
      this.currentPageContentArr = arr;
      this.currentPageContentArrSerial = num;
    },
    // 方法：點擊訂單進行入詳情頁
    checkOrderDetails(managingOrderID) {
      localStorage.removeItem("managingOrder");
      localStorage.setItem("managingOrder", managingOrderID);
      this.$router.push({ name: "管理系統：編輯訂單" });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  height: 700px;
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
  .query-resultsTable {
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
  #pagination-container {
    transform: translate3d(-50%, -50%, 0);
    left: 50%;
    bottom: 8%;
  }
}
</style>