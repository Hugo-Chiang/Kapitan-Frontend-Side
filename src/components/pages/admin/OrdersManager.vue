<template>
  <div>
    <h5>查詢<span class="inline-block ml-2">*擇一填寫即可查詢</span></h5>
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
        <div class="form-group col-md-3">
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
      <div class="form-row">
        <div class="form-group col-md-2">
          <label for="ordererName">訂購人姓名</label>
          <input
            type="text"
            class="form-control"
            id="ordererName"
            placeholder="訂購人姓名"
            v-model="queryData.ordererName"
          />
        </div>
        <div class="form-group col-md-2">
          <label for="ordererPhone">訂購人手機</label>
          <input
            type="text"
            class="form-control"
            id="ordererPhone"
            placeholder="0933128872"
            v-model="queryData.ordererPhone"
          />
        </div>
        <div class="form-group col-md-3">
          <label for="ordererEmail">訂購人電子信箱</label>
          <input
            type="email"
            class="form-control"
            id="ordererEmail"
            placeholder="Hello-World@email.com"
            v-model="queryData.ordererEmail"
          />
        </div>
      </div>
      <button class="btn btn-primary" @click.prevent="submitOrdersQuuery">
        送出查詢
      </button>
    </form>
    <hr />
  </div>
</template>

<script>
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
    };
  },
  methods: {
    submitOrdersQuuery() {
      const api = `${process.env.LOCAL_HOST_PATH}/API/Backstage/QueryOrders.php`;
      const vm = this;

      this.$http
        .post(api, JSON.stringify(vm.queryData))
        .then((response) => {
          console.log(response);
        })
        .catch((respponse) => {
          console.log(respponse);
        });
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
</style>