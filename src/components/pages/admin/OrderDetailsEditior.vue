<template>
  <section id="order-details-page" class="position-relative">
    <!-- 麵包屑元件開始 -->
    <Breadcrumb :breadCrumbData="breadCrumbData"></Breadcrumb>
    <!-- 麵包屑元件結束 -->
    <h6 class="mt-2 mb-4 mr-4 d-inline-block">
      正在編輯：{{ managingOrder.managingOrderID }} 號訂單的細項
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
          <td colspan="7" class="order-details-editor px-3 py-0">
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
        pagesArr: [
          "管理系統：查詢訂單",
          "管理系統：編輯訂單",
          "管理系統：訂單細項",
        ],
        currentPage: 3,
      },
      modalData: {
        callBy: null,
        situation: {
          event: "",
          message: "",
          buttonType: "checked",
          data: {},
        },
        emitValue: null,
        // 反應（方法）：根據不同情境做出應對
        correspond() {
          // 遭遇失敗情境將導回管理頁
          if (this.situation.event.indexOf("失敗") != -1) {
            setTimeout(
              () => this.callBy.$router.push({ name: "管理系統：方案管理" }),
              1000
            );
          }

          // 刪除方案詢問經確認後進行刪除，成敗與否都將倒回管理頁
          if (this.situation.event.indexOf("刪除訂單") != -1) {
            const deleteOrderAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/DeleteOrder.php`;
            const session = this.callBy.getKapitanSession();

            let sendingObj = {
              session: session,
              orderID: this.callBy.managingOrder.managingOrderID,
            };

            if (this.emitValue == 1) {
              this.situation.buttonType = "checked";

              this.callBy.$http
                .post(deleteOrderAPI, JSON.stringify(sendingObj))
                .then((response) => {
                  this.situation.event = "刪除訂單成功";
                  this.situation.message = response.data;
                })
                .catch((error) => {
                  this.situation.event = "刪除訂單失敗";
                  this.situation.message = error.data;
                });
            } else if (this.emitValue == "checked") {
              setTimeout(
                () =>
                  this.callBy.$router.push({
                    name: "管理系統：訂單管理",
                  }),
                1500
              );
            }
          }
        },
      },
      allOrderDetailsArr: [],
      itemsNumPerPage: 10,
      currentPageContentArr: [],
      editWhichOrderDetail: "",
      inEditingIndex: -1,
    };
  },
  components: { Breadcrumb, Pagination, OrderDetailsForm },
  created() {
    this.managingOrder = JSON.parse(localStorage.getItem("managingOrder"));
    this.queryOrderDetails();
  },
  methods: {
    // 方法：
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
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/all.scss";

#order-details-page {
  height: 600px;
  .breadcrumb {
    padding: 0;
  }
  h6 {
    font-weight: 600;
    .delete-project-btn {
      font-size: 13px;
      a {
        color: darkred;
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
    bottom: -15px;
  }
}
</style>