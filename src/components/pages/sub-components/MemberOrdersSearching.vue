<template>
  <div class="card-body">
    <h4>查詢訂單</h4>
    <!-- 會員訂單區開始 -->
    <div class="row">
      <div class="col-12">
        <ul>
          <li v-for="order in ordersArr" :key="order['ORDER_DETAIL_ID']">
            {{ order["ORDER_ID"] }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 會員訂單區結束 -->
  </div>
</template>

<script>
// 導入結帳項目元件

import Pagination from "@/components/pages/sub-components/Pagination";

export default {
  data() {
    return {
      ordersArr: [],
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
          console.log(response.data);
          vm.ordersArr = response.data;
          //   vm.allOrdersArr = [];
          //   let responseArr = response.data;

          //   for (let i = 0; i < responseArr.length; i++) {
          //     let projectDuplicate = false;

          //     searching: for (let j = 0; j < vm.allOrdersArr.length; j++) {
          //       if (
          //         responseArr[i]["ORDER_ID"] == vm.allOrdersArr[j]["ORDER_ID"]
          //       ) {
          //         projectDuplicate = true;
          //         break searching;
          //       }
          //     }

          //     if (!projectDuplicate) {
          //       responseArr[i]["ORDER_DATE"] = new Date(
          //         responseArr[i]["ORDER_DATE"]
          //       ).Format("yyyy-MM-dd");
          //       vm.allOrdersArr.push(responseArr[i]);
          //     }
          //   }

          //   vm.allOrdersArr.sort((a, b) => {
          //     return a["SORT_INDEX"] - b["SORT_INDEX"];
          //   });
        })
        .catch((respponse) => {
          console.log(respponse);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>