<template>
  <div>
    <ul>
      <li v-for="item in response">{{ item["0"] }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      response: [],
    };
  },
  created() {
    const api = "https://be-sp-0001-kapitan.herokuapp.com/api/store.php";
    const vm = this;

    console.log(this);

    this.$http.get(api).then((response) => {
      console.log(response.data);
      vm.response = response.data;
    });
  },
};
</script>

<style>
</style>