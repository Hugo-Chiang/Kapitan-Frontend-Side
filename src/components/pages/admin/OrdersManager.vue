<template>
  <div>
    <!-- 查詢輸入表單區域開始 -->
    <div class="row">
      <div class="col-10">
        <form>
          <div class="form-row">
            <div class="form-group col-md-3">
              <label for="orderID">訂單編號</label>
              <input
                type="text"
                class="form-control"
                id="orderID"
                placeholder="OD0000000001"
                v-model="queryData.orderID"
              />
            </div>
            <div class="form-group col-md-3">
              <label for="orderDate">訂單日期</label>
              <input
                type="date"
                class="form-control"
                id="orderDate"
                v-model="queryData.orderDate"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="memberAccount">會員帳號</label>
              <input
                type="eamil"
                class="form-control"
                id="memberAccount"
                placeholder="Hello-World@email.com"
                v-model="queryData.memberAccount"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-10">
        <form>
          <div class="form-row">
            <div class="form-group col-md-3">
              <label for="ordererName">訂購人姓名</label>
              <input
                type="text"
                class="form-control"
                id="ordererName"
                placeholder="訂購人姓名"
                v-model="queryData.ordererName"
              />
            </div>
            <div class="form-group col-md-3">
              <label for="ordererPhone">訂購人手機</label>
              <input
                type="text"
                class="form-control"
                id="ordererPhone"
                placeholder="0933128872"
                v-model="queryData.ordererPhone"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="ordererEmail">訂購人電子信箱</label>
              <input
                type="email"
                class="form-control"
                id="ordererEmail"
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
                @click.prevent="submitOrdersQuuery"
              />
            </div>
          </div>
        </form>
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
              checkOrderDetails(currentPageContentArr[index].ORDER_ID)
            "
          >
            <th class="text-center" scope="row">{{ index + 1 }}</th>
            <td>{{ currentPageContentArr[index].ORDER_ID }}</td>
            <td class="text-center">
              {{ currentPageContentArr[index].ORDER_MC_NAME }}
            </td>
            <td class="text-center">
              {{ currentPageContentArr[index].ORDER_MC_PHONE }}
            </td>
            <td class="text-center">
              {{ currentPageContentArr[index].ORDER_MC_EMAIL }}
            </td>
            <td class="text-center">
              {{ currentPageContentArr[index].ORDER_DATE }}
            </td>
            <td class="text-center">
              {{ currentPageContentArr[index].FK_MEMBER_ID_for_OD }}
            </td>
            <td class="text-center">
              {{
                currentPageContentArr[index].ORDER_TOTAL_CONSUMPTION -
                currentPageContentArr[index].ORDER_TOTAL_DISCOUNT
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
          :allContentArr="allOrdersArr"
          :itemsNumPerPage="itemsNumPerPage"
          @emitCurrentPageContentArr="getCurrentPageContentArr"
        ></Pagination>
      </div>
    </div>
    <!-- 查詢結果表格區結束 -->
  </div>
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
    };
  },
  components: { Pagination },
  methods: {
    // 方法：向後端送出查詢表單，以拿回相關訂單進行頁面渲染
    submitOrdersQuuery() {
      const api = `${process.env.LOCAL_HOST_PATH}/API/Backstage/QueryOrders.php`;
      const vm = this;

      this.$http
        .post(api, JSON.stringify(vm.queryData))
        .then((response) => {
          console.log(response.data);
          vm.allOrdersArr = response.data;
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
    checkOrderDetails(selectedOrderID) {
      localStorage.removeItem("selectedOrderID");
      localStorage.setItem("selectedOrderID", selectedOrderID);
      this.$router.push({ name: "管理系統：訂單細節清單" });
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