<template>
  <section id="order-details-page" class="position-relative">
    <Breadcrumb :breadCrumbData="breadCrumbData"></Breadcrumb>
    <h6 class="my-4 mr-4 d-inline-block">
      所選訂單編號：{{ managingOrder.managingOrderID }}
    </h6>
    <h6 class="d-inline-block">
      所選訂單日期：{{ managingOrder.managingOrderDate }}
    </h6>
    <table class="table table-striped query-resultsTable">
      <thead>
        <tr>
          <th class="text-center" scope="col">序號</th>
          <th class="text-center" scope="col">項目編號</th>
          <th class="text-center" scope="col">方案名稱</th>
          <th class="text-center" scope="col">主要聯絡人姓名</th>
          <th class="text-center" scope="col">主要聯絡人手機</th>
          <th class="text-center" scope="col">緊急聯絡人姓名</th>
          <th class="text-center" scope="col">緊急聯絡人手機</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="order-item"
          v-for="(order, index) in currentPageContentArr"
          :key="index"
          @click.prevent="
            inEditingIndex = index;
            currentPageContentArr = currentPageContentArr;
          "
          v-show="inEditingIndex == index || inEditingIndex == -1"
        >
          <th class="text-center" scope="row">{{ index + 1 }}</th>
          <td>{{ currentPageContentArr[index].ORDER_DETAIL_ID }}</td>
          <td class="text-center">
            {{ currentPageContentArr[index].PROJECT_NAME }}
          </td>
          <td class="text-center">
            {{ currentPageContentArr[index].ORDER_DETAIL_MC_NAME }}
          </td>
          <td class="text-center">
            {{ currentPageContentArr[index].ORDER_DETAIL_MC_PHONE }}
          </td>
          <td class="text-center">
            {{ currentPageContentArr[index].ORDER_DETAIL_EC_NAME }}
          </td>
          <td class="text-center">
            {{ currentPageContentArr[index].ORDER_DETAIL_EC_PHONE }}
          </td>
        </tr>
        <tr>
          <td colspan="7" class="order-details-editor">
            <OrderDetailsForm
              v-show="inEditingIndex != -1"
              :currentPageContentArr.sync="currentPageContentArr"
              :inEditingIndex.sync="inEditingIndex"
            ></OrderDetailsForm>
          </td>
        </tr>
      </tbody>
    </table>
    <div id="pagination-container" class="position-absolute">
      <Pagination
        v-show="currentPageContentArr.length > 0"
        :allContentArr="allOrderDetailsArr"
        :itemsNumPerPage="itemsNumPerPage"
        @emitCurrentPageContentArr="getCurrentPageContentArr"
      ></Pagination>
    </div>
  </section>
</template>

<script>
import Breadcrumb from "@/components/pages/sub-components/Breadcrumb";
import Pagination from "@/components/pages/sub-components/Pagination";
import OrderDetailsForm from "@/components/pages/admin/sub-components/OrderDetailsForm";

export default {
  data() {
    return {
      managingOrder: {},
      breadCrumbData: {
        pagesArr: ["管理系統：查詢訂單", "管理系統：編輯訂單"],
        currentPage: 2,
      },
      allOrderDetailsArr: [],
      itemsNumPerPage: 10,
      currentPageContentArr: [],
      editWhichOrderDetail: "",
      inEditingIndex: -1,
    };
  },
  created() {
    this.managingOrder = JSON.parse(localStorage.getItem("managingOrder"));
    this.queryOrderDetails();
  },
  beforeDestroy() {
    localStorage.removeItem("managingOrder");
  },
  components: { Breadcrumb, Pagination, OrderDetailsForm },
  methods: {
    queryOrderDetails() {
      const api = `${process.env.REMOTE_HOST_PATH}/API/Backstage/QueryOrderDetails.php`;
      const vm = this;

      this.$http
        .post(api, vm.managingOrder.managingOrderID)
        .then((response) => {
          vm.allOrderDetailsArr = response.data;
        })
        .catch((respponse) => {
          console.log(respponse);
        });
    },
    // 方法：獲得頁碼元件傳回的當前頁面內容
    getCurrentPageContentArr(arr) {
      this.currentPageContentArr = arr;
    },
    editOrderDetail() {},
  },
};
</script>

<style lang="scss" scoped>
#order-details-page {
  height: 600px;
  .breadcrumb {
    padding: 0;
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
    bottom: -15px;
  }
}
</style>