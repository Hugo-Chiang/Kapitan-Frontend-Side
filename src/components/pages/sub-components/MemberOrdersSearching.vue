<template>
  <div class="card-body">
    <h4>查詢訂單</h4>
    <!-- 會員編輯區開始 -->
    <div class="row">
      <div class="col-12"></div>
    </div>
    <!-- 會員編輯區結束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["memberID"],
  methods: {
    // 方法：向後端查詢該會員近三個月訂單紀錄，以進行頁面渲染
    queryMemberOrders() {
      const api = `${process.env.REMOTE_HOST_PATH}/API/Forestage/QueryMemberOrders.php`;
      const vm = this;

      this.$http
        .post(api, vm.memberID)
        .then((response) => {
          console.log(response);
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