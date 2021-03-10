<template>
  <div>
    <h1>hoho</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOrderID: "",
    };
  },
  created() {
    this.selectedOrderID = localStorage.getItem("selectedOrderID");
    this.queryOrderDetails();
  },
  beforeDestroy() {
    localStorage.removeItem("selectedOrderID");
  },
  methods: {
    queryOrderDetails() {
      const api = `${process.env.LOCAL_HOST_PATH}/API/Backstage/QueryOrderDetails.php`;
      const vm = this;

      this.$http
        .post(api, vm.selectedOrderID)
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